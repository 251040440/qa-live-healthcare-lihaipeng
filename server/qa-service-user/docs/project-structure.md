# QA Service User 项目文件结构规范

## 重要说明

**本文档是 QA Service User 项目的官方文件结构规范，所有开发者必须严格遵守以下规则：**

1. **强制性规范**: 所有新增文件必须按照本规范放置在对应目录中
2. **命名约定**: 遵循Java和Spring Boot的标准命名规范
3. **分层架构**: 严格按照Controller → Service → Repository → Entity的分层结构开发
4. **包结构**: 按功能模块和技术层次组织包结构
5. **文档更新**: 当添加新的目录结构时，必须同步更新本文档

**违反本规范的代码将不被接受合并到主分支！**

### 状态标记说明
- `[必需]` - 项目核心必须存在的文件/目录
- `[存在]` - 当前项目中已经存在的文件
- `[可选]` - 根据需要创建的扩展结构
- `[示例]` - 展示命名规范的示例文件，实际开发时按需创建

---

## 标准项目文件结构

```
qa-service-user/                                    # 项目根目录
├── .gitattributes                                  # [存在] Git属性配置文件
├── .gitignore                                      # [必需] Git忽略文件配置
├── .gitkeep                                        # [存在] Git空目录占位文件
├── README.md                                       # [必需] 项目说明文档
├── HELP.md                                         # [存在] Spring Boot帮助文档
├── mvnw                                            # [必需] Maven Wrapper脚本(Unix/Linux)
├── mvnw.cmd                                        # [必需] Maven Wrapper脚本(Windows)
├── pom.xml                                         # [必需] Maven项目配置文件
├── .mvn/                                           # [必需] Maven Wrapper配置目录
│   └── wrapper/                                    # [必需] Maven Wrapper配置
│       └── maven-wrapper.properties               # [存在] Maven Wrapper属性配置
├── docs/                                           # [必需] 项目文档目录
│   ├── project-structure.md                       # [存在] 项目结构规范文档(本文档)
│   ├── api.md                                      # [存在] API接口文档
│   ├── design/                                     # [可选] 设计文档目录
│   │   └── database-design.md                      # [示例] 设计文档示例文件
│   └── deployment/                                 # [可选] 部署文档目录
│       └── docker-deployment.md                    # [示例] 部署文档示例文件
├── docker/                                         # [可选] Docker相关文件目录
│   └── Dockerfile                                  # [示例] Docker文件示例文件
├── scripts/                                        # [可选] 脚本文件目录
│   └── build.sh                                   # [示例] 脚本文件示例文件
└── src/                                            # [必需] 源代码目录
    ├── main/                                       # [必需] 主要源代码
    │   ├── java/                                   # [必需] Java源代码
    │   │   └── com/leansofx/qaserviceuser/         # [必需] 根包目录
    │   │       ├── QaServiceUserApplication.java  # [存在] Spring Boot启动类
    │   │       ├── config/                         # [必需] 配置类目录
    │   │       │   ├── CorsConfig.java             # [存在] CORS跨域配置类
    │   │       │   └── DatabaseConfig.java         # [示例] 配置类示例文件
    │   │       ├── controller/                     # [必需] 控制器层目录
    │   │       │   ├── TestController.java         # [存在] 测试控制器
    │   │       │   ├── UserController.java         # [示例] 控制器示例文件
    │   │       │   └── advice/                     # [可选] 全局异常处理目录
    │   │       │       └── GlobalExceptionHandler.java # [示例] 异常处理示例文件
    │   │       ├── service/                        # [可选] 服务层目录
    │   │       │   ├── UserService.java            # [示例] 服务接口示例文件
    │   │       │   └── impl/                       # [可选] 服务实现类目录
    │   │       │       └── UserServiceImpl.java    # [示例] 服务实现示例文件
    │   │       ├── repository/                     # [可选] 数据访问层目录
    │   │       │   ├── UserRepository.java         # [示例] 数据仓库示例文件
    │   │       │   └── custom/                     # [可选] 自定义查询目录
    │   │       │       └── UserRepositoryCustom.java # [示例] 自定义查询示例文件
    │   │       ├── entity/                         # [可选] 实体类目录(JPA实体)
    │   │       │   ├── User.java                   # [示例] 实体类示例文件
    │   │       │   ├── BaseEntity.java             # [示例] 基础实体示例文件
    │   │       │   └── audit/                      # [可选] 审计相关目录
    │   │       │       └── AuditableEntity.java    # [示例] 审计实体示例文件
    │   │       ├── dto/                            # [可选] 数据传输对象目录
    │   │       │   ├── request/                    # [可选] 请求DTO目录
    │   │       │   │   └── UserCreateRequest.java  # [示例] 请求DTO示例文件
    │   │       │   ├── response/                   # [可选] 响应DTO目录
    │   │       │   │   └── UserResponse.java       # [示例] 响应DTO示例文件
    │   │       │   └── converter/                  # [可选] DTO转换器目录
    │   │       │       └── UserConverter.java      # [示例] 转换器示例文件
    │   │       ├── exception/                      # [可选] 自定义异常目录
    │   │       │   └── BusinessException.java      # [示例] 异常类示例文件
    │   │       ├── enums/                          # [可选] 枚举类目录
    │   │       │   └── UserStatus.java             # [示例] 枚举类示例文件
    │   │       ├── util/                           # [可选] 工具类目录
    │   │       │   └── DateUtil.java               # [示例] 工具类示例文件
    │   │       ├── constant/                       # [可选] 常量类目录
    │   │       │   └── ApiConstants.java           # [示例] 常量类示例文件
    │   │       ├── security/                       # [可选] 安全相关目录
    │   │       │   └── JwtTokenProvider.java       # [示例] 安全类示例文件
    │   │       ├── aspect/                         # [可选] 切面编程目录
    │   │       │   └── LoggingAspect.java          # [示例] 切面类示例文件
    │   │       └── validation/                     # [可选] 自定义验证目录
    │   │           ├── annotation/                 # [可选] 验证注解目录
    │   │           │   └── ValidEmail.java         # [示例] 验证注解示例文件
    │   │           └── validator/                  # [可选] 验证器目录
    │   │               └── EmailValidator.java     # [示例] 验证器示例文件
    │   └── resources/                              # [必需] 资源文件目录
    │       ├── application.properties              # [存在] Spring Boot应用配置文件
    │       ├── application-dev.yml                 # [示例] 环境配置示例文件
    │       ├── db/                                 # [可选] 数据库相关目录
    │       │   ├── migration/                      # [可选] 数据库迁移脚本目录
    │       │   │   └── V1__Create_user_table.sql   # [示例] 数据库迁移示例文件
    │       │   └── data/                           # [可选] 初始化数据目录
    │       │       └── data.sql                    # [示例] 初始化数据示例文件
    │       ├── static/                             # [可选] 静态资源目录
    │       ├── templates/                          # [可选] 模板文件目录(Thymeleaf)
    │       │   └── email/                          # [可选] 邮件模板目录
    │       │       └── welcome.html                # [示例] 模板文件示例文件
    │       ├── i18n/                               # [可选] 国际化资源目录
    │       │   └── messages.properties             # [示例] 国际化示例文件
    │       └── logback-spring.xml                  # [示例] 日志配置示例文件
    └── test/                                       # [必需] 测试代码目录
        ├── java/                                   # [必需] Java测试代码
        │   └── com/leansofx/qaserviceuser/         # [必需] 测试根包目录
        │       ├── QaServiceUserApplicationTests.java # [存在] 应用启动测试
        │       ├── controller/                     # [可选] 控制器测试目录
        │       │   ├── UserControllerTest.java     # [示例] 控制器测试示例文件
        │       │   └── integration/                # [可选] 集成测试目录
        │       │       └── UserControllerIntegrationTest.java # [示例] 集成测试示例文件
        │       ├── service/                        # [可选] 服务层测试目录
        │       │   └── UserServiceTest.java        # [示例] 服务测试示例文件
        │       ├── repository/                     # [可选] 数据访问层测试目录
        │       │   └── UserRepositoryTest.java     # [示例] 仓库测试示例文件
        │       ├── util/                           # [可选] 工具类测试目录
        │       │   └── TestUtil.java               # [示例] 测试工具示例文件
        │       └── config/                         # [可选] 测试配置目录
        │           └── TestConfig.java             # [示例] 测试配置示例文件
        └── resources/                              # [可选] 测试资源目录
            ├── application-test.yml                # [示例] 测试配置示例文件
            ├── test-data/                          # [可选] 测试数据目录
            │   └── users.json                      # [示例] 测试数据示例文件
            └── db/                                 # [可选] 测试数据库目录
                └── test-data.sql                   # [示例] 测试SQL示例文件
```

## 目录说明

### 状态标记详解
- **[必需]**: 项目核心必须存在的文件/目录，是Spring Boot项目的基础结构
- **[存在]**: 当前项目中已经存在的文件，这些结构已经按照标准规范组织
- **[可选]**: 根据业务需要可以创建的扩展结构，按项目发展逐步添加
- **[示例]**: 展示命名规范的示例文件，实际开发时按需创建具体的业务文件

### 扩展原则
- 保持现有结构不变，在此基础上按需扩展
- 严格遵循分层架构和包命名规范
- 优先创建业务必需的目录和文件
- 示例文件仅作为命名规范参考，不必全部创建

## 开发规范

### 1. 包命名规范
- **根包**: `com.leansofx.qaserviceuser`
- **功能包**: 按技术层次划分 (controller, service, repository, entity等)
- **业务包**: 在技术层次下按业务模块划分 (如user, auth, role等)

### 2. 类命名规范
- **Controller**: 以`Controller`结尾，如`UserController`
- **Service**: 接口不加后缀，实现类以`Impl`结尾，如`UserService`, `UserServiceImpl`
- **Repository**: 以`Repository`结尾，如`UserRepository`
- **Entity**: 使用业务名词，如`User`, `Role`
- **DTO**: 按用途添加后缀，如`UserRequest`, `UserResponse`

### 3. 文件组织原则
- **单一职责**: 每个类只负责一个功能
- **分层清晰**: 严格按照MVC分层架构组织
- **模块化**: 相关功能放在同一包下
- **可测试**: 每个类都应该有对应的测试类

### 4. 配置文件规范
- **环境配置**: 使用profile区分不同环境
- **敏感信息**: 使用环境变量或外部配置文件
- **文档化**: 重要配置项必须添加注释说明

## 未来扩展指导

当项目需要添加新功能时，请按照以下步骤：

1. **确定功能模块**: 明确新功能属于哪个业务模块
2. **选择技术层次**: 确定需要在哪些层次添加代码
3. **创建对应目录**: 如果目录不存在，按照本规范创建
4. **编写代码**: 遵循命名规范和编码标准
5. **添加测试**: 为新功能编写对应的测试用例
6. **更新文档**: 如有必要，更新相关文档

---

**注意**: 本文档会随着项目发展持续更新，请定期查看最新版本。如有疑问或建议，请联系项目负责人。