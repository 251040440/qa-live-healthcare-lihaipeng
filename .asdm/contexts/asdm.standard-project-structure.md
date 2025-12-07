# Standard Project Structure

## Overview
This document defines the standard project structure for the QA Healthcare workspace. It provides guidelines for organizing files and directories to maintain consistency and facilitate collaboration in this microservices-based healthcare QA system.

## Project Structure

### Overall Architecture
```
qa-live-healthcare-bolt-vue-c1joxy7j/          # 项目根目录
├── .asdm/                                     # ASDM 配置和工具集
│   ├── contexts/                              # 上下文文件
│   ├── docs/                                  # ASDM 文档
│   ├── skills/                                # ASDM 技能
│   ├── spec/                                  # 项目规范
│   └── toolsets/                              # 安装的工具集
├── .codebuddy/                                # Tencent CodeBuddy 配置
│   ├── commands/                              # 命令文件
│   └── skills/                                # 技能文件
├── _TRAINING_ASSETS/                          # 训练资源
│   ├── qa-service-question.zip                # 问题服务训练数据
│   └── qa-service-user.zip                    # 用户服务训练数据
├── server/                                    # 后端微服务
│   ├── qa-service-user/                       # 用户管理服务
│   ├── qa-service-question/                   # 问题管理服务
│   └── qa-service-statistic/                  # 统计分析服务 (待开发)
├── web/                                       # 前端应用
│   └── qa-web/                                # Vue.js 前端应用
├── test/                                      # 测试目录
│   └── e2e/                                   # 端到端测试
├── package.json                               # 根项目配置
├── README.md                                  # 项目说明文档
└── .gitignore                                 # Git 忽略规则
```

## Microservice Structure (Spring Boot)

### User Management Service (`server/qa-service-user/`)
```
qa-service-user/
├── docs/                                      # 服务文档
│   ├── api.md                                 # API 文档
│   └── project-structure.md                   # 项目结构文档
├── src/                                       # 源代码
│   ├── main/                                  # 主代码
│   │   ├── java/com/leansofx/qaserviceuser/   # Java 源代码
│   │   │   ├── QaServiceUserApplication.java  # 应用启动类
│   │   │   ├── controller/                    # REST 控制器
│   │   │   ├── service/                       # 业务服务层
│   │   │   ├── repository/                    # 数据访问层
│   │   │   ├── model/                         # 数据模型
│   │   │   ├── dto/                           # 数据传输对象
│   │   │   ├── config/                        # 配置类
│   │   │   └── exception/                     # 异常处理
│   │   └── resources/                         # 资源文件
│   │       ├── application.yml                # 应用配置
│   │       ├── application-dev.yml            # 开发环境配置
│   │       ├── application-prod.yml           # 生产环境配置
│   │       └── static/                        # 静态资源
│   └── test/                                  # 测试代码
│       ├── java/com/leansofx/qaserviceuser/   # 单元测试
│       └── resources/                         # 测试资源
├── pom.xml                                    # Maven 配置
├── mvnw                                       # Maven 包装器 (Linux)
├── mvnw.cmd                                   # Maven 包装器 (Windows)
├── HELP.md                                    # 帮助文档
├── README.md                                  # 服务说明
└── *.sh                                       # 启动和管理脚本
```

### Question Management Service (`server/qa-service-question/`)
```
qa-service-question/
├── src/                                       # 源代码
│   ├── main/                                  # 主代码
│   │   ├── java/com/leansofx/qaservicequestion/ # Java 源代码
│   │   │   ├── QaServiceQuestionApplication.java # 应用启动类
│   │   │   ├── controller/                    # REST 控制器
│   │   │   ├── service/                       # 业务服务层
│   │   │   ├── repository/                    # 数据访问层
│   │   │   ├── model/                         # 数据模型
│   │   │   ├── dto/                           # 数据传输对象
│   │   │   └── config/                        # 配置类
│   │   └── resources/                         # 资源文件
│   │       ├── application.yml                # 应用配置
│   │       └── static/                        # 静态资源
│   └── test/                                  # 测试代码
│       └── java/com/leansofx/qaservicequestion/ # 单元测试
├── pom.xml                                    # Maven 配置
├── mvnw                                       # Maven 包装器
├── mvnw.cmd                                   # Maven 包装器 (Windows)
└── HELP.md                                    # 帮助文档
```

## Frontend Structure (Vue.js + TypeScript)

### Web Application (`web/qa-web/`)
```
qa-web/
├── src/                                       # 源代码
│   ├── api/                                   # API 接口定义
│   │   ├── user.ts                            # 用户相关 API
│   │   ├── question.ts                        # 问题相关 API
│   │   └── index.ts                           # API 导出
│   ├── assets/                                # 静态资源
│   │   ├── css/                               # 样式文件
│   │   ├── images/                            # 图片资源
│   │   └── fonts/                             # 字体文件
│   ├── components/                            # Vue 组件
│   │   ├── common/                            # 通用组件
│   │   │   ├── Header.vue                     # 头部组件
│   │   │   ├── Footer.vue                     # 底部组件
│   │   │   ├── Sidebar.vue                    # 侧边栏组件
│   │   │   └── Loading.vue                    # 加载组件
│   │   ├── user/                              # 用户相关组件
│   │   │   ├── Login.vue                      # 登录组件
│   │   │   ├── Register.vue                   # 注册组件
│   │   │   └── Profile.vue                    # 个人资料组件
│   │   ├── question/                          # 问题相关组件
│   │   │   ├── QuestionList.vue               # 问题列表
│   │   │   ├── QuestionDetail.vue             # 问题详情
│   │   │   └── AskQuestion.vue                # 提问组件
│   │   └── layout/                            # 布局组件
│   │       └── MainLayout.vue                 # 主布局
│   ├── router/                                # 路由配置
│   │   ├── index.ts                           # 路由主文件
│   │   ├── routes/                            # 路由定义
│   │   │   ├── user.ts                        # 用户路由
│   │   │   ├── question.ts                    # 问题路由
│   │   │   └── home.ts                        # 首页路由
│   │   └── guards/                            # 路由守卫
│   ├── stores/                                # 状态管理 (Pinia)
│   │   ├── user.ts                            # 用户状态
│   │   ├── question.ts                        # 问题状态
│   │   └── index.ts                           # 状态导出
│   ├── utils/                                 # 工具函数
│   │   ├── request.ts                         # HTTP 请求封装
│   │   ├── validation.ts                      # 表单验证
│   │   ├── date.ts                            # 日期处理
│   │   └── constants.ts                       # 常量定义
│   ├── views/                                 # 页面视图
│   │   ├── Home.vue                           # 首页
│   │   ├── Login.vue                          # 登录页
│   │   ├── Register.vue                       # 注册页
│   │   ├── Dashboard.vue                      # 仪表板
│   │   └── NotFound.vue                       # 404 页面
│   ├── App.vue                                # 根组件
│   ├── main.ts                                # 应用入口
│   ├── style.css                              # 全局样式
│   └── vite-env.d.ts                          # Vite 环境类型
├── docs/                                      # 前端文档
│   └── project-structure.md                   # 项目结构文档
├── public/                                    # 公共资源
│   └── vite.svg                               # Vite 图标
├── dist/                                      # 构建输出目录
├── package.json                               # npm 配置
├── package-lock.json                          # 依赖锁文件
├── tsconfig.json                              # TypeScript 配置
├── tsconfig.app.json                          # 应用 TypeScript 配置
├── tsconfig.node.json                         # Node TypeScript 配置
├── vite.config.ts                             # Vite 配置
├── index.html                                 # HTML 入口
├── .env                                       # 环境变量
├── README.md                                  # 前端说明
└── app-management.sh                          # 应用管理脚本
```

## Directory Purposes and Conventions

### Source Code Directories
- **`src/main/`**: 包含所有生产环境源代码
- **`src/test/`**: 包含所有测试代码 (镜像主代码结构)
- **按功能组织**: 按业务能力而非技术层组织代码
- **清晰分离**: 保持领域逻辑与基础设施关注点分离

### Configuration Directories
- **环境特定配置**: 为开发、测试、生产环境分别配置
- **外部化配置**: 配置保持在源代码外部
- **密钥管理**: 永远不要将密钥提交到版本控制

### Documentation
- **活文档**: 文档随代码变更保持更新
- **API 优先**: 在实现前先编写 API 文档
- **架构决策**: 记录重要的设计决策

### Build and Deployment
- **可重现构建**: 脚本应产生一致的结果
- **容器化**: 使用 Docker 保持环境一致
- **CI/CD 集成**: 配置自动化流水线

## Naming Conventions

### Files and Directories
- 目录名使用 **kebab-case**: `user-management`, `api-gateway`
- Java 文件使用 **camelCase**: `UserController.java`
- TypeScript 文件使用 **camelCase**: `userService.ts`
- Vue 组件使用 **PascalCase**: `UserProfile.vue`

### Test Files
- 测试文件后缀 `.spec.ts` (TypeScript) 或 `Test.java` (Java)
- 测试放在与源代码平行的目录结构中
- 使用描述性测试名称: `UserService.createUser.spec.ts`

## Best Practices

### 1. 微服务设计原则
- 每个服务单一职责
- 服务间通过 API 通信
- 独立部署和扩展
- 数据自治

### 2. 前后端分离
- 前端负责展示和用户交互
- 后端提供 API 接口
- 通过 HTTP/HTTPS 通信
- 跨域资源共享 (CORS) 配置

### 3. 医疗数据安全
- 敏感数据加密存储
- 访问控制严格
- 操作日志完整
- 符合医疗数据保护法规

### 4. 可扩展性
- 支持水平扩展
- 避免单点故障
- 监控和告警机制
- 容错设计

## Customization Guidelines

### 项目特定约定
1. **中文注释**: 代码注释和文档使用中文
2. **医疗领域术语**: 使用准确的医疗术语
3. **响应式设计**: 前端支持多种设备
4. **无障碍访问**: 考虑残障用户需求

### 技术栈特定配置
1. **Spring Boot**: 遵循 Spring Boot 最佳实践
2. **Vue.js**: 使用 Composition API 和 TypeScript
3. **Ant Design Vue**: 使用组件库规范
4. **Vite**: 利用现代构建工具特性

### 开发流程
1. **API 先行**: 先定义 API 接口再实现
2. **测试驱动**: 重要功能编写测试
3. **代码审查**: 所有代码需要审查
4. **文档更新**: 代码变更同步更新文档

## 新增服务指南

当需要添加新的微服务时：

1. **在 `server/` 目录下创建新服务目录**
2. **复制现有服务结构作为模板**
3. **更新根目录的 `package.json` 脚本**
4. **配置服务端口避免冲突**
5. **更新部署配置**
6. **编写服务文档**

## 工具集成

### 开发工具
- **IDE**: VS Code (前端), IntelliJ IDEA (后端)
- **版本控制**: Git
- **包管理**: npm (前端), Maven (后端)
- **容器**: Docker (可选)

### 质量工具
- **代码格式化**: Prettier (前端), Spotless (后端)
- **代码检查**: ESLint (前端), Checkstyle (后端)
- **测试覆盖**: Jest (前端), JaCoCo (后端)

### 部署工具
- **构建工具**: Vite (前端), Maven (后端)
- **容器编排**: Docker Compose
- **云部署**: CloudStudio

---

*此模板已根据 QA Healthcare 项目的实际技术栈和需求进行定制。任何偏离此标准结构的变更应在项目 README 中记录。*