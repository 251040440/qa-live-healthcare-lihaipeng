# QA Server - 医疗问答后端服务

基于 Spring Boot 微服务架构的医疗问答系统后端。

## 项目概述

QA Server 是 QA Healthcare 项目的后端服务层，采用微服务架构设计，提供用户管理、问题管理等核心功能。基于 Spring Boot 3.5.7 构建，支持独立部署和水平扩展。

### 微服务组件

| 服务名称 | 端口 | 描述 | 状态 |
|---------|------|------|------|
| **qa-service-user** | 8080 | 用户管理服务 | 开发中 |
| **qa-service-question** | 8081 | 问题管理服务 | 开发中 |
| **qa-service-statistic** | 待定 | 统计分析服务 | 规划中 |

### 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Spring Boot** | 3.5.7 | 核心框架 |
| **Java** | 17 | 开发语言 |
| **Maven** | 3.x | 构建工具 |
| **Tomcat** | 10.1.48 | Web 服务器 |

## 项目结构

```
server/
├── qa-service-user/              # 用户管理服务
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/leansofx/qaserviceuser/
│   │   │   │       ├── config/          # 配置类
│   │   │   │       ├── controller/      # 控制器
│   │   │   │       └── QaServiceUserApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                        # 测试代码
│   ├── docs/                            # 服务文档
│   ├── mvnw                             # Maven Wrapper (Unix)
│   ├── mvnw.cmd                         # Maven Wrapper (Windows)
│   ├── pom.xml                          # Maven 配置
│   ├── start.sh                         # 启动脚本
│   ├── stop.sh                          # 停止脚本
│   ├── restart.sh                       # 重启脚本
│   ├── status.sh                        # 状态查询脚本
│   └── README.md
│
├── qa-service-question/          # 问题管理服务
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/leansofx/qaservicequestion/
│   │   │   │       └── QaServiceQuestionApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
│
├── qa-service-statistic/         # 统计分析服务（规划中）
│
└── docs/                         # 整体后端文档
```

## 快速开始

### 环境要求

- Java 17+
- Maven 3.6+（或使用内置 Maven Wrapper）

### 启动服务

**方式一：使用 Maven**

```bash
# 启动用户服务
cd qa-service-user
./mvnw spring-boot:run

# 启动问题服务
cd qa-service-question
./mvnw spring-boot:run
```

**方式二：使用启动脚本**

```bash
cd qa-service-user
./start.sh
```

**方式三：运行 JAR**

```bash
# 先构建
./mvnw clean package

# 运行
java -jar target/qa-service-user-0.0.1-SNAPSHOT.jar
```

### 健康检查

```bash
# 用户服务
curl http://localhost:8080/actuator/health

# 问题服务
curl http://localhost:8081/actuator/health
```

## 服务端口

| 服务 | 端口 | 健康检查端点 |
|------|------|--------------|
| qa-service-user | 8080 | /actuator/health |
| qa-service-question | 8081 | /actuator/health |

## 核心依赖

### 用户服务 (qa-service-user)

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-actuator</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

### 问题服务 (qa-service-question)

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <!-- Testcontainers 支持 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-testcontainers</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
```

## 构建与部署

### 构建

```bash
# 编译
./mvnw compile

# 打包
./mvnw package

# 清理构建
./mvnw clean package
```

### 应用管理脚本

qa-service-user 提供了完整的应用生命周期管理脚本：

| 脚本 | 功能 | 使用方法 |
|------|------|----------|
| `start.sh` | 启动应用 | `./start.sh` |
| `stop.sh` | 停止应用 | `./stop.sh` |
| `restart.sh` | 重启应用 | `./restart.sh` |
| `status.sh` | 查看状态 | `./status.sh` |

## 监控端点

用户服务配置了完整的 Actuator 监控端点：

| 端点 | 说明 |
|------|------|
| `/actuator/health` | 健康检查 |
| `/actuator/info` | 应用信息 |
| `/actuator/metrics` | 性能指标 |
| `/actuator/env` | 环境变量 |
| `/actuator/beans` | Bean 信息 |
| `/actuator/loggers` | 日志配置 |

## CORS 配置

用户服务已配置跨域支持：

- 允许所有来源 (`*`)
- 允许方法：GET, POST, PUT, DELETE, OPTIONS
- 允许所有请求头
- 允许凭证
- 最大缓存时间：3600秒

## 开发指南

### 添加新的微服务

1. 在 `server/` 目录下创建新服务目录
2. 配置 `pom.xml` 继承 Spring Boot
3. 设置独立端口
4. 创建启动类和必要的组件

### 代码规范

- 遵循 Java 命名规范
- 使用 Spring 注解进行依赖注入
- Controller 负责 HTTP 请求处理
- Service 负责业务逻辑
- Repository 负责数据访问

## 相关文档

- [API 文档](./docs/api.md)
- [项目结构](./docs/project-structure.md)
- [编码规范](./docs/coding-style.md)
- [数据模型](./docs/data-models.md)
- [部署文档](./docs/deployment.md)
- [架构设计](./docs/arch.md)

## 许可证

MIT License
