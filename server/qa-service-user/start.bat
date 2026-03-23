@echo off
chcp 65001 >nul 2>&1
setlocal enabledelayedexpansion

REM 获取脚本所在目录
set "SCRIPT_DIR=%~dp0"
cd /d "%SCRIPT_DIR%"

REM 定义变量
set "APP_NAME=qa-service-user"
set "JAR_FILE=target\%APP_NAME%-0.0.1-SNAPSHOT.jar"
set "PID_FILE=%APP_NAME%.pid"
set "LOG_DIR=logs"

REM 检查应用是否已经在运行
if exist "%PID_FILE%" (
    set /p PID=<"%PID_FILE%"
    
    REM 检查进程是否存在
    tasklist /FI "PID eq !PID!" 2>nul | find /I "!PID!" >nul
    if !errorlevel! equ 0 (
        echo 应用已经在运行中，PID: !PID!
        exit /b 1
    ) else (
        echo 发现旧的PID文件，但进程不存在，删除PID文件
        del /f /q "%PID_FILE%" >nul 2>&1
    )
)

REM 检查jar文件是否存在
if not exist "%JAR_FILE%" (
    echo 错误: 找不到jar文件 %JAR_FILE%
    echo 请先执行 mvn clean package 构建项目
    exit /b 1
)

REM 创建日志目录
if not exist "%LOG_DIR%" mkdir "%LOG_DIR%"

REM 启动应用
echo 正在启动应用...

REM 使用 wmic 启动进程并获取 PID
for /f "tokens=2 delims=;" %%a in ('wmic process call create "java -jar %JAR_FILE%" ^| find "ProcessId"') do (
    for /f "tokens=*" %%b in (%%a) do set PID=%%b
)

REM 如果 wmic 失败，使用备用方法
if not defined PID (
    REM 使用 start /b 后台启动
    start /b "" java -jar "%JAR_FILE%" >> "%LOG_DIR%\application.log" 2>&1
    
    REM 获取最近启动的 java 进程 PID
    for /f "tokens=2" %%a in ('tasklist /FI "IMAGENAME eq java.exe" /FO LIST ^| find "PID:"') do (
        set PID=%%a
    )
)

REM 等待一下确保进程启动
timeout /t 2 /nobreak >nul

REM 验证进程是否在运行
tasklist /FI "PID eq %PID%" 2>nul | find /I "%PID%" >nul
if !errorlevel! equ 0 (
    echo %PID% > "%PID_FILE%"
    echo 应用已启动，PID: %PID%
    echo 日志文件: %LOG_DIR%\application.log
) else (
    echo 错误: 应用启动失败，请检查日志文件
    exit /b 1
)

endlocal
