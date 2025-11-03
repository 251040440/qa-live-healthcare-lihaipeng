# QA Service User 项目文件结构规范

## 重要说明

**本文档是 QA Service User 项目的官方文件结构规范，所有开发者必须严格遵守以下规则：**

1. **强制性规范**: 所有新增文件必须按照本规范放置在对应目录中
2. **命名约定**: 遵循Java和Spring Boot的标准命名规范
3. **分层架构**: 严格按照Controller → Service → Repository → Entity的分层结构开发
4. **包结构**: 按功能模块和技术层次组织包结构
5. **文档更新**: 当添加新的目录结构时，必须同步更新本文档

**违反本规范的代码将不被接受合并到主分支！**

---

## 标准项目文件结构

```
qa-service-user/
├── .gitattributes                          # Git属性配置文件 ✅已存在
├── .gitignore                              # Git忽略文件配置 ✅已存在
├── .gitkeep                                # Git空目录占位文件 ✅已存在
├── README.md                               # 项目说明文档 ✅已存在
├── HELP.md                                 # Spring Boot帮助文档 ✅已存在
├── mvnw                                    # Maven Wrapper脚本(Unix/Linux) ✅已存在
├── mvnw.cmd                                # Maven Wrapper脚本(Windows) ✅已存在
├── pom.xml                                 # Maven项目配置文件 ✅已存在
├── .mvn/                                   # Maven Wrapper配置目录 ✅已存在
│   └── wrapper/
│       └── maven-wrapper.properties       # Maven Wrapper属性配置 ✅已存在
├── docs/                                   # 项目文档目录
│   ├── project-structure.md               # 项目结构规范文档(本文档) ✅已存在
│   ├── api/                                # API文档目录
│   │   └── user-api.md                     # API文档示例文件
│   ├── design/                             # 设计文档目录
│   │   └── database-design.md              # 设计文档示例文件
│   └── deployment/                         # 部署文档目录
│       └── docker-deployment.md            # 部署文档示例文件
├── docker/                                 # Docker相关文件目录
│   └── Dockerfile                          # Docker文件示例文件
├── scripts/                                # 脚本文件目录
│   └── build.sh                           # 脚本文件示例文件
└── src/                                    # 源代码目录 ✅已存在
    ├── main/                               # 主要源代码 ✅已存在
    │   ├── java/                           # Java源代码 ✅已存在
    │   │   └── com/leansofx/qaserviceuser/ # 根包目录 ✅已存在
    │   │       ├── QaServiceUserApplication.java  # Spring Boot启动类 ✅已存在
    │   │       ├── config/                         # 配置类目录 ✅已存在
    │   │       │   ├── CorsConfig.java             # CORS跨域配置类 ✅已存在
    │   │       │   └── DatabaseConfig.java         # 配置类示例文件
    │   │       ├── controller/                     # 控制器层目录 ✅已存在
    │   │       │   ├── TestController.java         # 测试控制器 ✅已存在
    │   │       │   ├── UserController.java         # 控制器示例文件
    │   │       │   └── advice/                     # 全局异常处理目录
    │   │       │       └── GlobalExceptionHandler.java # 异常处理示例文件
    │   │       ├── service/                        # 服务层目录
    │   │       │   ├── UserService.java            # 服务接口示例文件
    │   │       │   └── impl/                       # 服务实现类目录
    │   │       │       └── UserServiceImpl.java    # 服务实现示例文件
    │   │       ├── repository/                     # 数据访问层目录
    │   │       │   ├── UserRepository.java         # 数据仓库示例文件
    │   │       │   └── custom/                     # 自定义查询目录
    │   │       │       └── UserRepositoryCustom.java    # 自定义查询示例文件
    │   │       ├── entity/                         # 实体类目录(JPA实体)
    │   │       │   ├── User.java                   # 实体类示例文件
    │   │       │   ├── BaseEntity.java             # 基础实体示例文件
    │   │       │   └── audit/                      # 审计相关目录
    │   │       │       └── AuditableEntity.java    # 审计实体示例文件
    │   │       ├── dto/                            # 数据传输对象目录
    │   │       │   ├── request/                    # 请求DTO目录
    │   │       │   │   └── UserCreateRequest.java  # 请求DTO示例文件
    │   │       │   ├── response/                   # 响应DTO目录
    │   │       │   │   └── UserResponse.java       # 响应DTO示例文件
    │   │       │   └── converter/                  # DTO转换器目录
    │   │       │       └── UserConverter.java      # 转换器示例文件
    │   │       ├── exception/                      # 自定义异常目录
    │   │       │   └── BusinessException.java      # 异常类示例文件
    │   │       ├── enums/                          # 枚举类目录
    │   │       │   └── UserStatus.java             # 枚举类示例文件
    │   │       ├── util/                           # 工具类目录
    │   │       │   └── DateUtil.java               # 工具类示例文件
    │   │       ├── constant/                       # 常量类目录
    │   │       │   └── ApiConstants.java           # 常量类示例文件
    │   │       ├── security/                       # 安全相关目录
    │   │       │   └── JwtTokenProvider.java       # 安全类示例文件
    │   │       ├── aspect/                         # 切面编程目录
    │   │       │   └── LoggingAspect.java          # 切面类示例文件
    │   │       └── validation/                     # 自定义验证目录
    │   │           ├── annotation/                 # 验证注解目录
    │   │           │   └── ValidEmail.java         # 验证注解示例文件
    │   │           └── validator/                  # 验证器目录
    │   │               └── EmailValidator.java     # 验证器示例文件
    │   └── resources/                              # 资源文件目录 ✅已存在
    │       ├── application.properties              # Spring Boot应用配置文件 ✅已存在
    │       ├── application-dev.yml                 # 环境配置示例文件
    │       ├── db/                                 # 数据库相关目录
    │       │   ├── migration/                      # 数据库迁移脚本目录
    │       │   │   └── V1__Create_user_table.sql   # 数据库迁移示例文件
    │       │   └── data/                           # 初始化数据目录
    │       │       └── data.sql                    # 初始化数据示例文件
    │       ├── static/                             # 静态资源目录
    │       ├── templates/                          # 模板文件目录(Thymeleaf)
    │       │   └── email/                          # 邮件模板目录
    │       │       └── welcome.html                # 模板文件示例文件
    │       ├── i18n/                               # 国际化资源目录
    │       │   └── messages.properties             # 国际化示例文件
    │       └── logback-spring.xml                  # 日志配置示例文件
    └── test/                                       # 测试代码目录 ✅已存在
        ├── java/                                   # Java测试代码 ✅已存在
        │   └── com/leansofx/qaserviceuser/         # 测试根包目录 ✅已存在
        │       ├── QaServiceUserApplicationTests.java # 应用启动测试 ✅已存在
        │       ├── controller/                     # 控制器测试目录
        │       │   ├── UserControllerTest.java     # 控制器测试示例文件
        │       │   └── integration/                # 集成测试目录
        │       │       └── UserControllerIntegrationTest.java # 集成测试示例文件
        │       ├── service/                        # 服务层测试目录
        │       │   └── UserServiceTest.java        # 服务测试示例文件
        │       ├── repository/                     # 数据访问层测试目录
        │       │   └── UserRepositoryTest.java     # 仓库测试示例文件
        │       ├── util/                           # 工具类测试目录
        │       │   └── TestUtil.java               # 测试工具示例文件
        │       └── config/                         # 测试配置目录
        │           └── TestConfig.java             # 测试配置示例文件
        └── resources/                              # 测试资源目录
            ├── application-test.yml                # 测试配置示例文件
            ├── test-data/                          # 测试数据目录
            │   └── users.json                      # 测试数据示例文件
            └── db/                                 # 测试数据库目录
                └── test-data.sql                   # 测试SQL示例文件
```

## 目录说明

### 已存在的目录结构
- ✅ 标记的文件和目录表示当前项目中已经存在
- 这些结构已经按照标准规范组织，无需调整

### 推荐添加的目录结构
- 未标记的目录保留节点，表示推荐的目录结构
- 带有"示例文件"注释的文件仅用于展示标准的文件命名规范，实际开发时可根据业务需要创建具体的文件
- 按照项目发展需要逐步添加相应的目录和文件

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