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
    echo "正在停止应用，PID: $PID"
    kill $PID
    
    # 等待进程结束
    for i in {1..10}; do
        if ! ps -p $PID > /dev/null 2>&1; then
            echo "应用已成功停止"
            rm -f "$PID_FILE"
            exit 0
        fi
        echo "等待进程结束... ($i/10)"
        sleep 1
    done
    
    # 如果进程仍然存在，强制终止
    echo "进程未能正常结束，强制终止..."
    kill -9 $PID
    
    # 再次检查
    if ! ps -p $PID > /dev/null 2>&1; then
        echo "应用已强制停止"
        rm -f "$PID_FILE"
        exit 0
    else
        echo "错误: 无法停止进程 $PID"
        exit 1
    fi
else
    echo "应用未运行 (PID文件存在但进程不存在)"
    echo "清理无效的PID文件"
    rm -f "$PID_FILE"
    exit 1
fi