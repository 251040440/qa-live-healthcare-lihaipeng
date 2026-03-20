# 部署文档

本文档描述后端服务的部署流程和配置。

## 目录

- [环境要求](#环境要求)
- [本地部署](#本地部署)
- [构建项目](#构建项目)
- [服务器部署](#服务器部署)
- [Docker 部署](#docker-部署)
- [应用管理脚本](#应用管理脚本)
- [监控配置](#监控配置)

---

## 环境要求

### 运行环境

| 工具 | 最低版本 | 说明 |
|------|----------|------|
| **Java** | 17 | OpenJDK 或 Oracle JDK |
| **Maven** | 3.6+ | 构建工具（或使用内置 Wrapper） |
| **Git** | 2.0+ | 版本控制 |

### 环境检查

```bash
# 检查 Java 版本
java -version

# 检查 Maven 版本
mvn -version

# 或使用 Maven Wrapper
./mvnw -version
```

---

## 本地部署

### 开发模式启动

```bash
# 进入服务目录
cd server/qa-service-user

# 使用 Maven Wrapper 启动
./mvnw spring-boot:run

# 或使用 Maven
mvn spring-boot:run
```

### 指定配置启动

```bash
# 指定环境
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# 指定端口
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

### 调试模式

```bash
# 启用远程调试
./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005"
```

---

## 构建项目

### Maven 构建

```bash
# 编译
./mvnw compile

# 打包（跳过测试）
./mvnw package -DskipTests

# 完整构建
./mvnw clean package

# 安装到本地仓库
./mvnw clean install
```

### 构建产物

```
target/
├── classes/                           # 编译后的类文件
├── generated-sources/                 # 生成的源代码
├── qa-service-user-0.0.1-SNAPSHOT.jar # 可执行 JAR
└── ...
```

### 运行 JAR

```bash
# 基本运行
java -jar target/qa-service-user-0.0.1-SNAPSHOT.jar

# 指定环境
java -jar -Dspring.profiles.active=prod target/qa-service-user-0.0.1-SNAPSHOT.jar

# 后台运行
nohup java -jar target/qa-service-user-0.0.1-SNAPSHOT.jar > logs/app.log 2>&1 &
```

---

## 服务器部署

### 方式一：使用应用脚本

qa-service-user 提供了完整的管理脚本：

```bash
# 启动
./start.sh

# 停止
./stop.sh

# 重启
./restart.sh

# 查看状态
./status.sh
```

**脚本说明**:

| 脚本 | 功能 |
|------|------|
| `start.sh` | 后台启动应用，记录 PID |
| `stop.sh` | 优雅停止应用 |
| `restart.sh` | 重启应用 |
| `status.sh` | 查看应用运行状态 |

### 方式二：Systemd 服务

创建服务文件 `/etc/systemd/system/qa-service-user.service`:

```ini
[Unit]
Description=QA Service User
After=network.target

[Service]
Type=simple
User=app
WorkingDirectory=/opt/qa-service-user
ExecStart=/usr/bin/java -jar /opt/qa-service-user/qa-service-user-0.0.1-SNAPSHOT.jar
ExecStop=/bin/kill -15 $MAINPID
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

管理命令：

```bash
# 重载配置
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start qa-service-user

# 停止服务
sudo systemctl stop qa-service-user

# 开机自启
sudo systemctl enable qa-service-user

# 查看状态
sudo systemctl status qa-service-user

# 查看日志
sudo journalctl -u qa-service-user -f
```

---

## Docker 部署

### Dockerfile

```dockerfile
# 构建阶段
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# 运行阶段
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# 非 root 用户
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 构建镜像

```bash
# 构建镜像
docker build -t qa-service-user:latest .

# 构建并指定标签
docker build -t qa-service-user:1.0.0 .
```

### 运行容器

```bash
# 基本运行
docker run -d -p 8080:8080 --name qa-user qa-service-user:latest

# 挂载配置
docker run -d -p 8080:8080 \
  -v /opt/config:/app/config \
  --name qa-user \
  qa-service-user:latest

# 环境变量
docker run -d -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e TZ=Asia/Shanghai \
  --name qa-user \
  qa-service-user:latest
```

### Docker Compose

```yaml
version: '3.8'

services:
  qa-service-user:
    build: ./qa-service-user
    container_name: qa-service-user
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - TZ=Asia/Shanghai
    volumes:
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  qa-service-question:
    build: ./qa-service-question
    container_name: qa-service-question
    ports:
      - "8081:8081"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - TZ=Asia/Shanghai
    depends_on:
      - qa-service-user
```

启动：

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

---

## 应用管理脚本

### start.sh

```bash
#!/bin/bash

APP_NAME="qa-service-user"
JAR_FILE="target/qa-service-user-0.0.1-SNAPSHOT.jar"
PID_FILE="${APP_NAME}.pid"
LOG_DIR="logs"

# 检查是否已运行
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo "$APP_NAME is already running with PID $PID"
        exit 1
    fi
fi

# 检查 JAR 文件
if [ ! -f "$JAR_FILE" ]; then
    echo "JAR file not found: $JAR_FILE"
    echo "Please run 'mvn clean package' first"
    exit 1
fi

# 创建日志目录
mkdir -p "$LOG_DIR"

# 启动应用
nohup java -jar "$JAR_FILE" > "$LOG_DIR/application.log" 2>&1 &
echo $! > "$PID_FILE"

echo "$APP_NAME started with PID $(cat $PID_FILE)"
```

### stop.sh

```bash
#!/bin/bash

APP_NAME="qa-service-user"
PID_FILE="${APP_NAME}.pid"
TIMEOUT=10

if [ ! -f "$PID_FILE" ]; then
    echo "$APP_NAME is not running (no PID file)"
    exit 0
fi

PID=$(cat "$PID_FILE")

# 发送 SIGTERM
kill -15 $PID 2>/dev/null

# 等待进程结束
for i in $(seq 1 $TIMEOUT); do
    if ! ps -p $PID > /dev/null 2>&1; then
        break
    fi
    sleep 1
done

# 如果进程仍在运行，强制终止
if ps -p $PID > /dev/null 2>&1; then
    echo "Force killing $APP_NAME"
    kill -9 $PID 2>/dev/null
fi

rm -f "$PID_FILE"
echo "$APP_NAME stopped"
```

### restart.sh

```bash
#!/bin/bash

./stop.sh
sleep 1
./start.sh
```

### status.sh

```bash
#!/bin/bash

APP_NAME="qa-service-user"
PID_FILE="${APP_NAME}.pid"

if [ ! -f "$PID_FILE" ]; then
    echo "$APP_NAME is not running"
    exit 0
fi

PID=$(cat "$PID_FILE")

if ps -p $PID > /dev/null 2>&1; then
    echo "$APP_NAME is running with PID $PID"
    ps -o pid,ppid,cmd,time,%cpu,%mem -p $PID
else
    echo "$APP_NAME is not running (stale PID file)"
    rm -f "$PID_FILE"
fi
```

---

## 监控配置

### Actuator 端点

已配置的监控端点：

| 端点 | 说明 | 访问示例 |
|------|------|----------|
| `/actuator/health` | 健康检查 | `curl http://localhost:8080/actuator/health` |
| `/actuator/info` | 应用信息 | `curl http://localhost:8080/actuator/info` |
| `/actuator/metrics` | 性能指标 | `curl http://localhost:8080/actuator/metrics` |
| `/actuator/env` | 环境变量 | `curl http://localhost:8080/actuator/env` |

### Prometheus 集成（推荐）

添加依赖：

```xml
<dependency>
    <groupId>io.micrometer</groupId>
    <artifactId>micrometer-registry-prometheus</artifactId>
</dependency>
```

配置：

```properties
management.endpoints.web.exposure.include=health,info,metrics,prometheus
management.metrics.export.prometheus.enabled=true
```

---

## 日志管理

### 日志配置

```properties
# 日志级别
logging.level.root=INFO
logging.level.com.leansofx=DEBUG

# 日志文件
logging.file.name=logs/application.log
logging.file.max-size=10MB
logging.file.max-history=30
```

### Logback 配置 (logback-spring.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/application.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/application.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="CONSOLE"/>
        <appender-ref ref="FILE"/>
    </root>
</configuration>
```

---

## 环境配置

### 开发环境 (application-dev.properties)

```properties
spring.application.name=qa-service-user
server.port=8080

logging.level.root=INFO
logging.level.com.leansofx=DEBUG
```

### 生产环境 (application-prod.properties)

```properties
spring.application.name=qa-service-user
server.port=8080

logging.level.root=WARN
logging.level.com.leansofx=INFO

# 安全配置
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=never
```

---

## 故障排除

### 常见问题

**1. 端口被占用**

```bash
# 查找占用端口的进程
lsof -i :8080

# 或
netstat -tlnp | grep 8080

# 终止进程
kill -9 <PID>
```

**2. 内存不足**

```bash
# 限制 JVM 内存
java -Xms256m -Xmx512m -jar app.jar
```

**3. 无法访问 Actuator**

检查配置：

```properties
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
```

---

## 参考资料

- [Spring Boot 部署文档](https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html)
- [Docker 官方文档](https://docs.docker.com/)
