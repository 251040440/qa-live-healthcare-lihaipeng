@echo off
setlocal enabledelayedexpansion

REM QA Live Healthcare Web应用管理脚本 (Windows)
REM 后台启动 Vite 开发服务器

set APP_NAME=qa-web
set PID_FILE=.pid
set LOG_DIR=logs
set APP_PORT=5173

REM 确保日志目录存在
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

REM 检查应用是否正在运行
:check_running
set IS_RUNNING=false
if not exist "%PID_FILE%" goto :eof
set /p PID=<%PID_FILE%
tasklist /fi "pid eq %PID%" 2>nul | find "%PID%" >nul
if not errorlevel 1 set IS_RUNNING=true
goto :eof

REM 主程序
if "%1"=="" goto help
if "%1"=="start" goto start
if "%1"=="stop" goto stop
if "%1"=="restart" goto restart
if "%1"=="status" goto status
if "%1"=="logs" goto logs
if "%1"=="help" goto help
echo 未知命令: %1
goto help

:start
call :check_running
if "!IS_RUNNING!"=="true" (
    echo 应用已在运行中 (PID: !PID!)
    goto :eof
)

echo 正在启动 %APP_NAME% 应用...

REM 启动应用并将日志输出到文件
start /b cmd /c "npm run dev > %LOG_DIR%\application.log 2>&1"

REM 等待应用启动
timeout /t 3 /nobreak >nul

REM 查找 node 进程的 PID
for /f "tokens=2" %%i in ('tasklist /fi "imagename eq node.exe" /fo list ^| findstr "PID:"') do (
    set PID=%%i
    goto :found_pid
)
:found_pid

if defined PID (
    echo !PID! > %PID_FILE%
    echo 应用已启动，PID: !PID!
    echo 日志文件: %LOG_DIR%\application.log
    echo 访问地址: http://localhost:%APP_PORT%
) else (
    echo 启动失败，请检查日志
    type %LOG_DIR%\application.log
)
goto :eof

:stop
call :check_running
if "!IS_RUNNING!"=="false" (
    echo 应用未运行
    if exist "%PID_FILE%" del %PID_FILE%
    goto :eof
)

set /p PID=<%PID_FILE%
echo 正在停止 %APP_NAME% 应用 (PID: %PID%)...

REM 尝试优雅停止
taskkill /pid %PID% /t >nul 2>&1

REM 等待进程结束
set COUNTER=0
:wait_stop
timeout /t 1 /nobreak >nul
set /a COUNTER+=1
tasklist /fi "pid eq %PID%" 2>nul | find "%PID%" >nul
if errorlevel 1 goto stopped
if %COUNTER% geq 10 goto force_stop
goto wait_stop

:force_stop
echo 强制停止应用...
taskkill /f /pid %PID% /t >nul 2>&1

:stopped
if exist "%PID_FILE%" del %PID_FILE%
echo 应用已停止
goto :eof

:restart
echo 正在重启 %APP_NAME% 应用...
call :stop
timeout /t 2 /nobreak >nul
call :start
goto :eof

:status
if not exist "%PID_FILE%" (
    echo 应用状态: 未运行
    goto :eof
)

set /p PID=<%PID_FILE%
tasklist /fi "pid eq %PID%" 2>nul | find "%PID%" >nul
if errorlevel 1 (
    echo 应用状态: 未运行 ^(无效的PID文件^)
    if exist "%PID_FILE%" del %PID_FILE%
    goto :eof
)

echo 应用状态: 运行中
echo 进程ID: %PID%
echo 访问地址: http://localhost:%APP_PORT%
echo.
echo 进程详情:
tasklist /fi "pid eq %PID%" /v
goto :eof

:logs
if not exist "%LOG_DIR%\application.log" (
    echo 日志文件不存在: %LOG_DIR%\application.log
    goto :eof
)
echo 显示应用日志 (按 Ctrl+C 退出):
echo ========================================
type %LOG_DIR%\application.log
echo.
echo 按 Ctrl+C 退出日志查看
goto :eof

:help
echo QA Live Healthcare Web应用管理脚本 (Windows)
echo.
echo 用法: %~nx0 {start^|stop^|restart^|status^|logs^|help}
echo.
echo 命令:
echo   start   - 启动应用
echo   stop    - 停止应用
echo   restart - 重启应用
echo   status  - 显示应用状态
echo   logs    - 显示应用日志
echo   help    - 显示此帮助信息
echo.
echo 示例:
echo   %~nx0 start    # 启动应用
echo   %~nx0 status   # 查看状态
echo   %~nx0 logs     # 查看日志
goto :eof
