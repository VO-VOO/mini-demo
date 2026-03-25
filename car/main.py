"""ESP32 MicroPython web control demo (no hardware required)."""

import json
import socket
import time

try:
    network = __import__("network")
except ImportError:
    network = None

car_control_module = __import__("car_control")
CarController = car_control_module.CarController
MockMotorDriver = car_control_module.MockMotorDriver

AP_SSID = "ESP32-CAR"
AP_PASSWORD = "12345678"
AP_CHANNEL = 6
HTTP_PORT = 80
STATE_POLL_MS = 300

INDEX_HTML_PATH = "web/index.html"
INLINE_INDEX_HTML = """<!doctype html><html><body><h1>ESP32 Car</h1><p>Upload web/index.html for full UI.</p></body></html>"""

controller = CarController(driver=MockMotorDriver(), debounce_ms=100)
_TIME_SLEEP_MS = getattr(time, "sleep_ms", None)


def sleep_ms(ms):
    if callable(_TIME_SLEEP_MS):
        _TIME_SLEEP_MS(ms)
    else:
        time.sleep(ms / 1000)


def now_ts():
    return int(time.time())


def setup_ap():
    if network is None:
        raise RuntimeError("network module unavailable; run on MicroPython/ESP32")

    ap = network.WLAN(network.AP_IF)
    ap.active(True)
    ap.config(essid=AP_SSID, password=AP_PASSWORD, channel=AP_CHANNEL)

    print("[WIFI] AP starting: ssid={}".format(AP_SSID))
    wait_count = 0
    while not ap.active() and wait_count < 50:
        sleep_ms(100)
        wait_count += 1

    ifcfg = ap.ifconfig()
    print("[WIFI] AP active={}, ip={}".format(ap.active(), ifcfg[0]))
    return ap


def _read_index_html():
    try:
        with open(INDEX_HTML_PATH, "r") as f:
            return f.read()
    except OSError as exc:
        print("[WARN] html file fallback: {}".format(exc))
        return INLINE_INDEX_HTML


def _parse_request_target(request_line):
    parts = request_line.split(" ")
    if len(parts) < 2:
        return None, {}
    target = parts[1]
    if "?" not in target:
        return target, {}

    path, query = target.split("?", 1)
    params = {}
    for item in query.split("&"):
        if not item:
            continue
        if "=" in item:
            key, value = item.split("=", 1)
        else:
            key, value = item, ""
        params[key] = value
    return path, params


def _json_response(status_code, payload):
    status_text = (
        "OK"
        if status_code == 200
        else "Bad Request"
        if status_code == 400
        else "Not Found"
    )
    body = json.dumps(payload)
    head = (
        "HTTP/1.1 {} {}\r\n"
        "Content-Type: application/json\r\n"
        "Connection: close\r\n"
        "Content-Length: {}\r\n\r\n"
    ).format(status_code, status_text, len(body))
    return head + body


def _html_response(html):
    head = (
        "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/html; charset=utf-8\r\n"
        "Connection: close\r\n"
        "Content-Length: {}\r\n\r\n"
    ).format(len(html))
    return head + html


def _not_found_response():
    body = "404 Not Found"
    return (
        "HTTP/1.1 404 Not Found\r\n"
        "Content-Type: text/plain\r\n"
        "Connection: close\r\n"
        "Content-Length: {}\r\n\r\n{}"
    ).format(len(body), body)


def handle_request(raw_request):
    lines = raw_request.split("\r\n")
    if not lines:
        return _json_response(400, {"ok": False, "error": "invalid_request"})

    request_line = lines[0]
    if not request_line.startswith("GET "):
        return _json_response(400, {"ok": False, "error": "only_get_supported"})

    path, params = _parse_request_target(request_line)
    if path is None:
        return _json_response(400, {"ok": False, "error": "invalid_request_line"})

    if path == "/":
        return _html_response(_read_index_html())

    if path == "/cmd":
        cmd = params.get("d", "")
        try:
            state = controller.set_command(cmd)
        except ValueError:
            return _json_response(400, {"ok": False, "error": "invalid_command"})
        return _json_response(
            200, {"ok": True, "state": state["state"], "ts": now_ts()}
        )

    if path == "/state":
        return _json_response(200, controller.get_state())

    return _not_found_response()


def serve_forever():
    setup_ap()

    addr = socket.getaddrinfo("0.0.0.0", HTTP_PORT)[0][-1]
    server = socket.socket()
    try:
        server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    except OSError as exc:
        print("[WARN] setsockopt skipped: {}".format(exc))

    server.bind(addr)
    server.listen(2)
    server.settimeout(1)

    print("[HTTP] Listening on 0.0.0.0:{}".format(HTTP_PORT))
    print("[HTTP] Open: http://192.168.4.1/")

    while True:
        client = None
        try:
            client, client_addr = server.accept()
            client.settimeout(2)
            data = client.recv(1024)
            if not data:
                continue

            request_text = data.decode("utf-8", "ignore")
            response_text = handle_request(request_text)
            client.send(response_text.encode("utf-8"))
            print("[HTTP] {} {}".format(client_addr, request_text.split("\r\n", 1)[0]))
        except OSError as exc:
            print("[SOCKET] {}".format(exc))
        except Exception as exc:
            print("[ERR]", exc)
        finally:
            if client:
                try:
                    client.close()
                except OSError as exc:
                    print("[SOCKET] close {}".format(exc))


if __name__ == "__main__":
    serve_forever()
