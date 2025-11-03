#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 定义变量
APP_NAME="qa-service-user"

echo "正在重启应用..."

# 停止应用
echo "1. 停止应用..."
./stop.sh

# 等待一秒确保进程完全结束
sleep 1

# 启动应用
echo "2. 启动应用..."
./start.sh

echo "应用重启完成"