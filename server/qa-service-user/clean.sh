#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 定义变量
APP_NAME="qa-service-user"
PID_FILE="${APP_NAME}.pid"
LOG_DIR="logs"

echo "清理应用运行时文件..."

# 停止应用（如果在运行）
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo "应用正在运行 (PID: $PID)，正在停止..."
        ./stop.sh
    else
        echo "清理无效的PID文件"
        rm -f "$PID_FILE"
    fi
fi

# 清理日志目录
if [ -d "$LOG_DIR" ]; then
    echo "清理日志目录: $LOG_DIR"
    rm -rf "$LOG_DIR"
    echo "日志目录已清理"
fi

# 清理 Maven 构建产物
echo "清理 Maven 构建产物..."
./mvnw clean 2>/dev/null || mvn clean 2>/dev/null || echo "Maven clean 未执行"

echo "清理完成"
