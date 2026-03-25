"""Car control domain layer for MicroPython web demo."""

import time

_TIME_TICKS_MS = getattr(time, "ticks_ms", None)
_TIME_TICKS_DIFF = getattr(time, "ticks_diff", None)


def _ticks_ms():
    if callable(_TIME_TICKS_MS):
        value = _TIME_TICKS_MS()
        if isinstance(value, int):
            return value
        if isinstance(value, float):
            return int(value)
    return int(time.time() * 1000)


def _ticks_diff(new_ms, old_ms):
    if callable(_TIME_TICKS_DIFF):
        value = _TIME_TICKS_DIFF(new_ms, old_ms)
        if isinstance(value, int):
            return value
        if isinstance(value, float):
            return int(value)
    return new_ms - old_ms


class MotorDriverBase:
    def forward(self):
        raise NotImplementedError

    def back(self):
        raise NotImplementedError

    def left(self):
        raise NotImplementedError

    def right(self):
        raise NotImplementedError

    def stop(self):
        raise NotImplementedError


class MockMotorDriver(MotorDriverBase):
    def __init__(self):
        self.last_action = "stop"

    def _act(self, action):
        self.last_action = action
        print("[MOTOR] action={}".format(action))

    def forward(self):
        self._act("forward")

    def back(self):
        self._act("back")

    def left(self):
        self._act("left")

    def right(self):
        self._act("right")

    def stop(self):
        self._act("stop")


class CarController:
    VALID_COMMANDS = ("forward", "back", "left", "right", "stop")

    def __init__(self, driver, debounce_ms=100):
        self.driver = driver
        self.debounce_ms = debounce_ms
        self.current_state = "stop"
        self.last_cmd = "stop"
        self.last_cmd_ts_ms = 0
        self.started_ms = _ticks_ms()
        self.stop()

    def _set_state(self, cmd, now_ms):
        if cmd == "forward":
            self.driver.forward()
        elif cmd == "back":
            self.driver.back()
        elif cmd == "left":
            self.driver.left()
        elif cmd == "right":
            self.driver.right()
        else:
            self.driver.stop()
        self.current_state = cmd
        self.last_cmd = cmd
        self.last_cmd_ts_ms = now_ms

    def set_command(self, cmd):
        if cmd not in self.VALID_COMMANDS:
            raise ValueError("invalid_command")

        now_ms = _ticks_ms()
        if (
            cmd == self.current_state
            and _ticks_diff(now_ms, self.last_cmd_ts_ms) < self.debounce_ms
        ):
            return self.get_state()

        self._set_state(cmd, now_ms)
        return self.get_state()

    def forward(self):
        return self.set_command("forward")

    def back(self):
        return self.set_command("back")

    def left(self):
        return self.set_command("left")

    def right(self):
        return self.set_command("right")

    def stop(self):
        return self.set_command("stop")

    def get_state(self):
        now_ms = _ticks_ms()
        return {
            "state": self.current_state,
            "last_cmd": self.last_cmd,
            "last_cmd_ms": self.last_cmd_ts_ms,
            "uptime_ms": _ticks_diff(now_ms, self.started_ms),
        }
