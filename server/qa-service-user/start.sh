#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 定义变量
APP_NAME="qa-service-user"
JAR_FILE="target/${APP_NAME}-0.0.1-SNAPSHOT.jar"
PID_FILE="${APP_NAME}.pid"
LOG_DIR="logs"

# 检查应用是否已经在运行
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo "应用已经在运行中，PID: $PID"
        exit 1
    else
        echo "发现旧的PID文件，但进程不存在，删除PID文件"
        rm -f "$PID_FILE"
    fi
fi

# 检查jar文件是否存在
if [ ! -f "$JAR_FILE" ]; then
    echo "错误: 找不到jar文件 $JAR_FILE"
    echo "请先执行 mvn clean package 构建项目"
    exit 1
fi

# 创建日志目录
mkdir -p "$LOG_DIR"

# 启动应用
echo "正在启动应用..."
nohup java -jar "$JAR_FILE" > "$LOG_DIR/application.log" 2>&1 &
PID=$!

# 保存PID
echo $PID > "$PID_FILE"

echo "应用已启动，PID: $PID"
echo "日志文件: $LOG_DIR/application.log"