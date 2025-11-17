# QA Service User

## 快速启动指南

### ⚠️ 重要提示：优先使用应用管理脚本
为了获得最佳的开发体验和生产环境稳定性，**请务必使用提供的应用管理脚本**而不是直接使用Maven命令启动服务。

### 一键启动所有服务
```bash
# 1. 启动基础设施（MySQL + phpMyAdmin）
cd /home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j
docker compose up -d

# 2. 等待30秒让MySQL初始化，然后启动应用服务
cd server/qa-service-user
./start.sh

# 3. 验证服务状态
curl http://localhost:8080/actuator/health

# 4. 验证数据库连接和测试数据
curl http://localhost:8080/api/doctors
```

### 服务状态检查
```bash
# 检查所有服务
echo "MySQL: $(docker ps | grep mysql | wc -l) running"
echo "phpMyAdmin: $(docker ps | grep phpmyadmin | wc -l) running" 
echo "qa-service-user: $(ps aux | grep qa-service-user | grep -v grep | wc -l) running"
```

## 项目概述

QA Service User 是医疗问答系统中的用户管理服务，基于 Spring Boot 3.5.7 构建。该服务提供用户相关的 API 接口，支持跨域访问，并集成了 Spring Boot Actuator 进行应用监控和健康检查。

- **项目名称**: qa-service-user
- **版本**: 0.0.1-SNAPSHOT
- **描述**: QA Service User - Healthcare QA System User Management Service
- **开发团队**: QA Healthcare Team
- **开发环境**: development

## 项目文件结构

```
qa-service-user/
├── .gitattributes                          # Git 属性配置文件
├── .gitignore                              # Git 忽略文件配置
├── .gitkeep                                # Git 空目录占位文件
├── HELP.md                                 # Spring Boot 帮助文档
├── mvnw                                    # Maven Wrapper 脚本 (Unix/Linux)
├── mvnw.cmd                                # Maven Wrapper 脚本 (Windows)
├── pom.xml                                 # Maven 项目配置文件
├── .mvn/                                   # Maven Wrapper 配置目录
│   └── wrapper/
│       └── maven-wrapper.properties       # Maven Wrapper 属性配置
└── src/                                    # 源代码目录
    ├── main/                               # 主要源代码
    │   ├── java/                           # Java 源代码
    │   │   └── com/leansofx/qaserviceuser/
    │   │       ├── QaServiceUserApplication.java    # Spring Boot 主启动类
    │   │       ├── config/                          # 配置类目录
    │   │       │   └── CorsConfig.java              # CORS 跨域配置类
    │   │       └── controller/                      # 控制器目录
    │   │           └── TestController.java          # 测试控制器，提供 CORS 测试接口
    │   └── resources/                      # 资源文件目录
    │       └── application.properties      # Spring Boot 应用配置文件
    └── test/                               # 测试代码
        └── java/                           # Java 测试代码
            └── com/leansofx/qaserviceuser/
                └── QaServiceUserApplicationTests.java  # Spring Boot 应用测试类
```

## 项目文档

本项目提供了详细的技术文档，请参考以下链接：

- [API 接口文档](docs/api.md) - 详细的 API 接口说明和使用示例
- [项目结构文档](docs/project-structure.md) - 项目架构和代码结构说明

## 项目技术栈信息

### 核心框架
- **Spring Boot**: 3.5.7
- **Java**: 17
- **Maven**: 项目构建和依赖管理工具

### 主要依赖
- **spring-boot-starter-web**: Web 应用开发，提供 RESTful API 支持
- **spring-boot-starter-actuator**: 应用监控和管理端点
- **spring-boot-starter-test**: 测试框架支持 (JUnit 5)

### 构建工具
- **Maven**: 使用 Maven Wrapper 进行项目构建
- **spring-boot-maven-plugin**: Spring Boot Maven 插件

## 应用管理脚本

### 🎯 使用建议：管理脚本是首选方式
项目提供的应用管理脚本是**启动、停止和管理服务的最佳实践**，无论在开发环境还是生产环境都应该优先使用。

### 脚本优势
- **🔄 完整的生命周期管理**：启动、停止、重启、状态检查
- **📊 进程监控**：PID管理、后台运行、状态追踪
- **📝 日志管理**：自动创建日志目录、统一日志输出
- **🛡️ 错误处理**：端口检查、构建验证、自动清理
- **⚡ 便利性**：一键操作、快速重启、详细状态信息

项目提供了完整的应用生命周期管理脚本，位于项目根目录下：

### 脚本列表

| 脚本文件 | 功能描述 | 使用方法 |
|---------|---------|---------|
| `start.sh` | 启动应用服务 | `./start.sh` |
| `stop.sh` | 停止应用服务 | `./stop.sh` |
| `restart.sh` | 重启应用服务 | `./restart.sh` |
| `status.sh` | 查看应用状态 | `./status.sh` |

### 脚本详细说明

#### start.sh
- **功能**: 启动 Spring Boot 应用
- **主要特性**:
  - 检查应用是否已在运行
  - 验证 JAR 文件是否存在
  - 自动创建日志目录
  - 使用 nohup 后台启动应用
  - 保存进程 PID 到文件
- **日志文件**: `logs/application.log`
- **PID 文件**: `qa-service-user.pid`

#### stop.sh
- **功能**: 停止正在运行的应用
- **主要特性**:
  - 读取 PID 文件获取进程 ID
  - 优雅终止进程（先发送 SIGTERM）
  - 等待进程正常结束（最多 10 秒）
  - 如需要则强制终止（SIGKILL）
  - 清理 PID 文件
- **超时机制**: 10 秒后自动强制终止

#### restart.sh
- **功能**: 重启应用服务
- **执行流程**:
  1. 调用 `stop.sh` 停止当前服务
  2. 等待 1 秒确保进程完全结束
  3. 调用 `start.sh` 启动服务

#### status.sh
- **功能**: 检查应用运行状态
- **输出信息**:
  - 应用运行状态
  - 进程 PID
  - 详细的进程信息（PID、PPID、命令、运行时间、CPU/内存使用率）
- **自动清理**: 发现无效 PID 文件时自动删除

### 使用示例

```bash
# 启动应用
./start.sh

# 检查状态
./status.sh

# 停止应用
./stop.sh

# 重启应用
./restart.sh
```

### 注意事项
- 使用前确保已执行 `mvn clean package` 构建项目
- 脚本会自动处理 PID 文件和日志目录
- 所有脚本都包含错误处理和状态检查

## 故障排除

### 常见问题

#### MySQL 连接失败
```bash
# 检查 MySQL 容器状态
docker ps | grep healthcare_mysql

# 查看 MySQL 日志
docker logs healthcare_mysql

# 重新启动 MySQL
docker compose restart healthcare_mysql
```

#### 应用启动失败
```bash
# 检查端口占用
netstat -tlnp | grep 8080

# 查看应用日志
tail -f logs/application.log

# 重新构建并启动
./mvnw clean package && ./restart.sh
```

#### 数据库连接问题
```bash
# 验证数据库连接
docker exec healthcare_mysql mysql -uroot -proot -e "SHOW DATABASES;"

# 检查数据表
docker exec healthcare_mysql mysql -uroot -proot healthcare -e "SHOW TABLES;"

# 重新导入数据
docker exec healthcare_mysql mysql -uroot -proot healthcare -e "source /tmp/doctor_user_data.sql;"
```

### 服务依赖关系
```
qa-service-user (8080) 
    ↓ 依赖
healthcare_mysql (3306)
    ↓ 依赖  
docker network
```

**注意**: 必须按顺序启动服务，确保下游服务完全启动后再启动上游服务。

## 项目启动顺序

### 正确的启动流程

为了确保所有服务正常运行，请按照以下顺序启动项目：

#### 1. 启动基础设施服务
```bash
# 在项目根目录下启动 MySQL 和 phpMyAdmin 服务
cd /home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j
docker compose up -d healthcare_mysql
docker compose up -d healthcare_phpmyadmin

# 验证 MySQL 服务状态
docker ps | grep healthcare_mysql
```

#### 2. 初始化数据库
```bash
# 等待 MySQL 完全启动（约30秒），然后导入数据
docker exec healthcare_mysql mysql -uroot -proot -e "CREATE DATABASE IF NOT EXISTS healthcare;"

# 复制并执行数据初始化脚本
docker cp /home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j/server/qa-service-user/src/main/resources/db/data/doctor_user_data.sql healthcare_mysql:/tmp/
docker exec healthcare_mysql mysql -uroot -proot healthcare -e "source /tmp/doctor_user_data.sql;"

# 验证数据导入
docker exec healthcare_mysql mysql -uroot -proot healthcare -e "SELECT COUNT(*) as doctor_count FROM doctor_user;"
```

#### 3. 启动 qa-service-user 服务
```bash
# 进入服务目录
cd /home/azureuser/source/tkt01/qa-live-healthcare-bolt-vue-c1joxy7j/server/qa-service-user

# 构建项目（首次启动或代码变更后需要）
./mvnw clean package

# 启动服务
./start.sh

# 验证服务状态
./status.sh
```

#### 4. 验证所有服务
```bash
# 检查 MySQL 状态
curl -s http://localhost:6080 > /dev/null && echo "phpMyAdmin: ✅" || echo "phpMyAdmin: ❌"

# 检查 qa-service-user 健康状态
curl -s http://localhost:8080/actuator/health | grep -q '"status":"UP"' && echo "qa-service-user: ✅" || echo "qa-service-user: ❌"

# 检查 CORS 配置
curl -s http://localhost:8080/api/test/cors | grep -q "CORS configuration is working" && echo "CORS: ✅" || echo "CORS: ❌"

# 验证数据库连接和测试数据
curl -s http://localhost:8080/api/doctors | grep -q "doc001" && echo "数据库连接和测试数据: ✅" || echo "数据库连接和测试数据: ❌"
```

### 服务访问信息

| 服务 | URL | 用户名/密码 | 说明 |
|------|-----|------------|------|
| MySQL | localhost:3306 | root/root | 数据库服务 |
| phpMyAdmin | http://localhost:6080 | root/root | Web数据库管理界面 |
| qa-service-user | http://localhost:8080 | - | 用户管理API服务 |

## 开发调试

### 🚨 开发环境启动建议
即使在开发环境中，我们仍然**强烈推荐使用管理脚本**而非直接使用Maven命令，原因如下：
- ✅ **后台运行**：关闭终端后服务继续运行
- ✅ **日志管理**：所有输出统一保存到日志文件
- ✅ **进程监控**：方便查看服务状态和重启
- ✅ **错误处理**：自动处理常见启动问题

### 推荐的开发启动方式
```bash
# 使用应用管理脚本启动（推荐）
./start.sh

# 查看服务状态
./status.sh

# 实时查看日志
tail -f logs/application.log
```

### 传统Maven启动方式（不推荐）
```bash
# ⚠️ 仅用于快速测试，不建议常规使用
# 使用 Maven Wrapper 启动（确保数据库已运行）
./mvnw spring-boot:run

# 或者使用 Maven 启动
mvn spring-boot:run
```

### 应用配置
- **服务端口**: 8080
- **应用名称**: qa-service-user
- **基础包路径**: com.leansofx.qaserviceuser

### CORS 配置
项目已配置跨域访问支持：
- **允许的源**: 所有源 (*)
- **允许的方法**: GET, POST, PUT, DELETE, OPTIONS
- **允许的头部**: 所有头部 (*)
- **允许凭证**: true
- **最大缓存时间**: 3600 秒

### API 接口
当前提供的测试接口：
- `GET /api/test/cors` - CORS 配置测试接口
- `POST /api/test/cors` - CORS POST 请求测试接口
- `OPTIONS /api/test/cors` - CORS 预检请求处理

## 测试和监控信息

### 单元测试
- **测试框架**: JUnit 5 (通过 spring-boot-starter-test)
- **测试类**: `QaServiceUserApplicationTests.java`
- **测试内容**: Spring Boot 应用上下文加载测试

### 运行测试
```bash
# 运行所有测试
./mvnw test

# 或者使用 Maven
mvn test
```

### 应用监控 (Actuator)

#### 监控端点配置
- **基础路径**: `/actuator`
- **启用的端点**: health, info, metrics, env, beans, loggers
- **健康检查**: 显示详细信息和组件状态

#### 可用的监控端点
- `GET /actuator/health` - 应用健康状态检查
- `GET /actuator/info` - 应用信息展示
- `GET /actuator/metrics` - 应用指标数据
- `GET /actuator/env` - 环境变量信息
- `GET /actuator/beans` - Spring Bean 信息
- `GET /actuator/loggers` - 日志配置信息

#### 应用信息配置
- **应用名称**: qa-service-user
- **应用描述**: QA Service User - Healthcare QA System User Management Service
- **版本**: 0.0.1-SNAPSHOT
- **编码**: UTF-8
- **Java 版本**: 17
- **开发团队**: QA Healthcare Team
- **环境**: development
- **构建时间**: 2025-11-03
- **功能特性**: CORS, Actuator, Health Checks, User Management

### 健康检查
应用启动后，可通过以下方式检查服务状态：
```bash
# 检查应用健康状态
curl http://localhost:8080/actuator/health

# 查看应用信息
curl http://localhost:8080/actuator/info

# 测试 CORS 配置
curl http://localhost:8080/api/test/cors

# 验证数据库连接和测试数据（重要）
curl http://localhost:8080/api/doctors
```

## 构建和部署

### 构建项目
```bash
# 编译项目
./mvnw compile

# 打包项目
./mvnw package

# 清理并重新构建
./mvnw clean package
```

### 生成的构建产物
- **JAR 文件**: `target/qa-service-user-0.0.1-SNAPSHOT.jar`
- **可执行 JAR**: 包含所有依赖的独立可执行文件

### 运行打包后的应用
```bash
java -jar target/qa-service-user-0.0.1-SNAPSHOT.jar
```