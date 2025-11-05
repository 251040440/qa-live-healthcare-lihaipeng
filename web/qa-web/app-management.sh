#!/bin/bash

# QA Live Healthcare Web应用管理脚本
# 使用 nohup 在后台启动应用

APP_NAME="qa-web"
PID_FILE=".pid"
LOG_DIR="logs"
APP_PORT=5173

# 确保日志目录存在
mkdir -p $LOG_DIR

# 获取应用状态
get_status() {
    if [ -f "$PID_FILE" ]; then
        PID=$(cat $PID_FILE)
        if ps -p $PID > /dev/null 2>&1; then
            echo "running"
        else
            echo "stopped"
            rm -f $PID_FILE
        fi
    else
        echo "stopped"
    fi
}

# 启动应用
start_app() {
    STATUS=$(get_status)
    if [ "$STATUS" = "running" ]; then
        echo "应用已在运行中 (PID: $(cat $PID_FILE))"
        return 1
    fi
    
    echo "正在启动 $APP_NAME 应用..."
    nohup npm run dev > $LOG_DIR/application.log 2>&1 &
    PID=$!
    echo $PID > $PID_FILE
    echo "应用已启动，PID: $PID"
    echo "日志文件: $LOG_DIR/application.log"
    echo "访问地址: http://localhost:$APP_PORT"
}

# 停止应用
stop_app() {
    STATUS=$(get_status)
    if [ "$STATUS" = "stopped" ]; then
        echo "应用未运行"
        return 1
    fi
    
    PID=$(cat $PID_FILE)
    echo "正在停止 $APP_NAME 应用 (PID: $PID)..."
    kill $PID
    
    # 等待进程结束
    for i in {1..10}; do
        if ! ps -p $PID > /dev/null 2>&1; then
            break
        fi
        sleep 1
    done
    
    # 如果进程仍在运行，强制杀死
    if ps -p $PID > /dev/null 2>&1; then
        echo "强制停止应用..."
        kill -9 $PID
    fi
    
    rm -f $PID_FILE
    echo "应用已停止"
}

# 重启应用
restart_app() {
    echo "正在重启 $APP_NAME 应用..."
    stop_app
    sleep 2
    start_app
}

# 显示应用状态
show_status() {
    STATUS=$(get_status)
    if [ "$STATUS" = "running" ]; then
        PID=$(cat $PID_FILE)
        echo "应用状态: 运行中"
        echo "进程ID: $PID"
        echo "访问地址: http://localhost:$APP_PORT"
        echo "启动时间: $(ps -p $PID -o lstart=)"
    else
        echo "应用状态: 未运行"
    fi
}

# 显示日志
show_logs() {
    if [ -f "$LOG_DIR/application.log" ]; then
        echo "显示应用日志 (按 Ctrl+C 退出):"
        tail -f $LOG_DIR/application.log
    else
        echo "日志文件不存在: $LOG_DIR/application.log"
    fi
}

# 显示帮助信息
show_help() {
    echo "QA Live Healthcare Web应用管理脚本"
    echo ""
    echo "用法: $0 {start|stop|restart|status|logs|help}"
    echo ""
    echo "命令:"
    echo "  start   - 启动应用"
    echo "  stop    - 停止应用"
    echo "  restart - 重启应用"
    echo "  status  - 显示应用状态"
    echo "  logs    - 显示应用日志"
    echo "  help    - 显示此帮助信息"
}

# 主程序
case "$1" in
    start)
        start_app
        ;;
    stop)
        stop_app
        ;;
    restart)
        restart_app
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo "错误: 未知命令 '$1'"
        echo "使用 '$0 help' 查看可用命令"
        exit 1
        ;;
esac

exit 0