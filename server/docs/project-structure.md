# 项目结构文档

本文档详细描述后端项目的目录结构和文件组织规范。

## 整体结构

```
server/
├── qa-service-user/                  # 用户管理服务
├── qa-service-question/              # 问题管理服务
├── qa-service-statistic/             # 统计分析服务（规划中）
└── docs/                             # 文档目录
```

---

## 用户服务结构 (qa-service-user)

```
qa-service-user/
├── .gitattributes                    # Git 属性配置
├── .gitignore                        # Git 忽略规则
├── mvnw                              # Maven Wrapper (Unix/Linux)
├── mvnw.cmd                          # Maven Wrapper (Windows)
├── pom.xml                           # Maven 项目配置
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/leansofx/qaserviceuser/
│   │   │       ├── QaServiceUserApplication.java    # Spring Boot 启动类
│   │   │       ├── config/                          # 配置类
│   │   │       │   └── CorsConfig.java              # CORS 配置
│   │   │       └── controller/                      # 控制器
│   │   │           └── TestController.java          # 测试控制器
│   │   └── resources/
│   │       └── application.properties               # 应用配置
│   │
│   └── test/
│       └── java/
│           └── com/leansofx/qaserviceuser/
│               └── QaServiceUserApplicationTests.java  # 测试类
│
├── docs/                             # 服务文档
│   ├── api.md                        # API 文档
│   └── project-structure.md          # 项目结构文档
│
├── start.sh                          # 启动脚本
├── stop.sh                           # 停止脚本
├── restart.sh                        # 重启脚本
├── status.sh                         # 状态查询脚本
└── README.md                         # 服务说明
```

### 核心目录说明

| 目录/文件 | 说明 |
|-----------|------|
| `src/main/java/` | Java 源代码 |
| `src/main/resources/` | 配置文件和资源 |
| `src/test/` | 测试代码 |
| `config/` | Spring 配置类 |
| `controller/` | REST 控制器 |
| `docs/` | 服务文档 |

---

## 问题服务结构 (qa-service-question)

```
qa-service-question/
├── mvnw                              # Maven Wrapper (Unix/Linux)
├── mvnw.cmd                          # Maven Wrapper (Windows)
├── pom.xml                           # Maven 项目配置
│
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/leansofx/qaservicequestion/
│   │   │       └── QaServiceQuestionApplication.java  # 启动类
│   │   └── resources/
│   │       └── application.properties                # 应用配置
│   │
│   └── test/
│       └── java/
│           └── com/leansofx/qaservicequestion/
│               ├── QaServiceQuestionApplicationTests.java
│               ├── TestcontainersConfiguration.java   # Testcontainers 配置
│               └── TestQaServiceQuestionApplication.java
└── README.md                         # （待添加）
```

---

## 标准微服务结构

建议的完整微服务目录结构：

```
qa-service-xxx/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/leansofx/qaservicexxx/
│   │   │       ├── QaServiceXxxApplication.java   # 启动类
│   │   │       │
│   │   │       ├── config/                        # 配置类
│   │   │       │   ├── CorsConfig.java            # CORS 配置
│   │   │       │   ├── SecurityConfig.java        # 安全配置
│   │   │       │   └── SwaggerConfig.java         # API 文档配置
│   │   │       │
│   │   │       ├── controller/                    # 控制器层
│   │   │       │   ├── XxxController.java
│   │   │       │   └── ...
│   │   │       │
│   │   │       ├── service/                       # 服务层
│   │   │       │   ├── XxxService.java
│   │   │       │   ├── impl/
│   │   │       │   │   └── XxxServiceImpl.java
│   │   │       │   └── ...
│   │   │       │
│   │   │       ├── repository/                    # 数据访问层
│   │   │       │   ├── XxxRepository.java
│   │   │       │   └── ...
│   │   │       │
│   │   │       ├── entity/                        # 实体类
│   │   │       │   ├── XxxEntity.java
│   │   │       │   └── ...
│   │   │       │
│   │   │       ├── dto/                           # 数据传输对象
│   │   │       │   ├── XxxRequest.java
│   │   │       │   ├── XxxResponse.java
│   │   │       │   └── ...
│   │   │       │
│   │   │       ├── exception/                     # 异常处理
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   ├── BusinessException.java
│   │   │       │   └── ...
│   │   │       │
│   │   │       └── util/                          # 工具类
│   │   │           └── XxxUtil.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties             # 主配置
│   │       ├── application-dev.properties         # 开发环境配置
│   │       ├── application-prod.properties        # 生产环境配置
│   │       ├── static/                            # 静态资源
│   │       └── templates/                         # 模板文件
│   │
│   └── test/
│       └── java/
│           └── com/leansofx/qaservicexxx/
│               ├── controller/
│               │   └── XxxControllerTest.java
│               ├── service/
│               │   └── XxxServiceTest.java
│               └── repository/
│                   └── XxxRepositoryTest.java
│
├── docs/                             # 文档目录
│   ├── api.md                        # API 文档
│   └── ...
│
├── mvnw
├── mvnw.cmd
├── pom.xml
├── start.sh
├── stop.sh
├── restart.sh
├── status.sh
└── README.md
```

---

## 分层架构

```
┌─────────────────────────────────────────┐
│            Controller Layer              │  HTTP 请求处理
├─────────────────────────────────────────┤
│             Service Layer                │  业务逻辑
├─────────────────────────────────────────┤
│           Repository Layer               │  数据访问
├─────────────────────────────────────────┤
│             Entity Layer                 │  数据模型
└─────────────────────────────────────────┘
```

### 各层职责

| 层级 | 包名 | 职责 |
|------|------|------|
| Controller | controller | 处理 HTTP 请求、参数校验、响应封装 |
| Service | service | 业务逻辑处理、事务管理 |
| Repository | repository | 数据库操作、数据持久化 |
| Entity | entity | 数据模型定义 |
| DTO | dto | 数据传输对象 |
| Config | config | 配置类 |
| Exception | exception | 异常定义和处理 |
| Util | util | 工具类 |

---

## 配置文件说明

### application.properties

```properties
# 应用配置
spring.application.name=qa-service-xxx
server.port=8080

# CORS 配置
spring.web.cors.allowed-origins=*
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS

# Actuator 配置
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
```

### 环境配置

| 文件 | 用途 |
|------|------|
| `application.properties` | 通用配置 |
| `application-dev.properties` | 开发环境 |
| `application-test.properties` | 测试环境 |
| `application-prod.properties` | 生产环境 |

---

## 命名规范

### 包命名

- 基础包: `com.leansofx.qaservicexxx`
- 子包使用小写: `controller`, `service`, `repository`

### 类命名

| 类型 | 命名规范 | 示例 |
|------|----------|------|
| Controller | XxxController | `UserController` |
| Service | XxxService | `UserService` |
| ServiceImpl | XxxServiceImpl | `UserServiceImpl` |
| Repository | XxxRepository | `UserRepository` |
| Entity | Xxx | `User` |
| DTO | XxxRequest/XxxResponse | `UserRequest`, `UserResponse` |
| Config | XxxConfig | `CorsConfig` |
| Exception | XxxException | `BusinessException` |

---

## 构建产物

### Maven 构建输出

```
target/
├── classes/                          # 编译后的类文件
├── generated-sources/                # 生成的源代码
├── maven-status/                     # Maven 状态信息
├── qa-service-xxx-0.0.1-SNAPSHOT.jar # 可执行 JAR
└── ...
```

### 运行 JAR

```bash
java -jar target/qa-service-user-0.0.1-SNAPSHOT.jar
```
