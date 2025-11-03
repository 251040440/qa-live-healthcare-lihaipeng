#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 定义变量
APP_NAME="qa-web"
PID_FILE="${APP_NAME}.pid"
LOG_DIR="logs"
PORT=5173

# 显示帮助信息
show_help() {
    echo "应用管理脚本 - $APP_NAME"
    echo "用法: $0 {start|stop|restart|status|logs}"
    echo ""
    echo "命令说明:"
    echo "  start   - 启动应用"
    echo "  stop    - 停止应用"
    echo "  restart - 重启应用"
    echo "  status  - 查看应用状态"
    echo "  logs    - 查看应用日志"
    echo ""
}

# 检查端口是否被占用
check_port() {
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo "端口 $PORT 已被占用，正在清理..."
        lsof -ti:$PORT | xargs kill -9 2>/dev/null
        sleep 1
        if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo "错误: 无法释放端口 $PORT"
            exit 1
        else
            echo "端口 $PORT 已释放"
        fi
    fi
}

# 启动应用
start_app() {
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

    # 检查package.json是否存在
    if [ ! -f "package.json" ]; then
        echo "错误: 找不到package.json文件"
        exit 1
    fi

    # 检查node_modules是否存在
    if [ ! -d "node_modules" ]; then
        echo "正在安装依赖..."
        npm install
    fi

    # 检查并清理端口
    check_port

    # 创建日志目录
    mkdir -p "$LOG_DIR"

    # 启动应用
    echo "正在启动应用..."
    nohup npm run dev > "$LOG_DIR/application.log" 2>&1 &
    PID=$!

    # 保存PID
    echo $PID > "$PID_FILE"

    echo "应用已启动，PID: $PID"
    echo "访问地址: http://localhost:$PORT"
    echo "日志文件: $LOG_DIR/application.log"
}

# 停止应用
stop_app() {
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
}

# 重启应用
restart_app() {
    echo "正在重启应用..."
    
    # 停止应用
    echo "1. 停止应用..."
    # 检查PID文件是否存在
    if [ -f "$PID_FILE" ]; then
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
                    break
                fi
                echo "等待进程结束... ($i/10)"
                sleep 1
            done
            
            # 如果进程仍然存在，强制终止
            if ps -p $PID > /dev/null 2>&1; then
                echo "进程未能正常结束，强制终止..."
                kill -9 $PID
                rm -f "$PID_FILE"
            fi
        else
            echo "应用未运行，清理无效的PID文件"
            rm -f "$PID_FILE"
        fi
    else
        echo "应用未运行 (PID文件不存在)"
    fi
    
    # 等待一秒确保进程完全结束
    sleep 1
    
    # 启动应用
    echo "2. 启动应用..."
    # 检查应用是否已经在运行
    if [ -f "$PID_FILE" ]; then
        PID=$(cat "$PID_FILE")
        if ps -p $PID > /dev/null 2>&1; then
            echo "应用已经在运行中，PID: $PID"
        else
            echo "发现旧的PID文件，但进程不存在，删除PID文件"
            rm -f "$PID_FILE"
        fi
    fi

    # 检查package.json是否存在
    if [ ! -f "package.json" ]; then
        echo "错误: 找不到package.json文件"
        exit 1
    fi

    # 检查node_modules是否存在
    if [ ! -d "node_modules" ]; then
        echo "正在安装依赖..."
        npm install
    fi

    # 检查并清理端口
    check_port

    # 创建日志目录
    mkdir -p "$LOG_DIR"

    # 启动应用
    echo "正在启动应用..."
    nohup npm run dev > "$LOG_DIR/application.log" 2>&1 &
    PID=$!

    # 保存PID
    echo $PID > "$PID_FILE"

    echo "应用已启动，PID: $PID"
    echo "访问地址: http://localhost:$PORT"
    echo "日志文件: $LOG_DIR/application.log"
    
    echo "应用重启完成"
}

# 查看应用状态
show_status() {
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
        echo "访问地址: http://localhost:$PORT"
        echo "进程信息:"
        ps -p $PID -o pid,ppid,cmd,etime,pcpu,pmem
        
        # 检查端口状态
        if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
            echo "端口 $PORT 正在监听"
        else
            echo "警告: 端口 $PORT 未在监听"
        fi
    else
        echo "应用未运行 (PID文件存在但进程不存在)"
        echo "清理无效的PID文件"
        rm -f "$PID_FILE"
        exit 1
    fi
}

# 查看应用日志
show_logs() {
    LOG_FILE="$LOG_DIR/application.log"
    
    if [ ! -f "$LOG_FILE" ]; then
        echo "日志文件不存在: $LOG_FILE"
        exit 1
    fi
    
    echo "显示应用日志 (按 Ctrl+C 退出):"
    tail -f "$LOG_FILE"
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
    *)
        show_help
        exit 1
        ;;
esac