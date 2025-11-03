#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 定义变量
APP_NAME="qa-service-user"
PID_FILE="${APP_NAME}.pid"

# 检查PID文件是否存在
if [ ! -f "$PID_FILE" ]; then
    echo "应用未运行 (PID文件不存在)"
    exit 1
fi

# 读取PID
PID=$(cat "$PID_FILE")

# 检查进程是否在运行
if ps -p $PID > /dev/null 2>&1; then
    echo "应用正在运行，PID: $PID"
    echo "进程信息:"
    ps -p $PID -o pid,ppid,cmd,etime,pcpu,pmem
else
    echo "应用未运行 (PID文件存在但进程不存在)"
    echo "清理无效的PID文件"
    rm -f "$PID_FILE"
    exit 1
fi