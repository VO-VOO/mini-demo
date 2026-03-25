#!/bin/bash
# 测试 CLIProxyAPI 连接

BASE_URL="http://127.0.0.1:8317"
API_KEY="sk-dummy"

echo "测试连接: $BASE_URL"
echo "----------------------------------------"

response=$(curl -s -w "\n%{http_code}" "$BASE_URL/v1/models" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json")

http_code=$(printf '%s' "$response" | python3 -c "import sys; lines=sys.stdin.read().splitlines(); print(lines[-1] if lines else '')")
body=$(printf '%s' "$response" | python3 -c "import sys; lines=sys.stdin.read().splitlines(); print('\\n'.join(lines[:-1]))")

echo "状态码: $http_code"
echo ""

if [ "$http_code" = "200" ]; then
    echo "支持的模型:"
    echo "----------------------------------------"
    echo "$body" | python3 -c "
import sys, json
data = json.load(sys.stdin)
for m in data.get('data', []):
    print(f\"  - {m.get('id', 'unknown')}\")
print(f\"----------------------------------------\")
print(f\"共 {len(data.get('data', []))} 个模型\")
" 2>/dev/null || echo "$body"
else
    echo "错误响应:"
    echo "$body"
fi
