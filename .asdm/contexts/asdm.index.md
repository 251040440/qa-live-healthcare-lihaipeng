# Workspace Context Index

## Overview
This document serves as the index and guide for AI models to understand and work with this workspace. It provides a structured overview of the workspace content and guides AI models to find relevant context.

## Workspace Information

### Basic Information
- **Workspace Name**: QA Healthcare Project - 医疗问答系统
- **Description**: 现代化的医疗问答系统，采用微服务架构设计，提供用户管理、问题管理和统计分析等核心功能。项目基于 Spring Boot 微服务后端和 Vue.js 前端技术栈构建，支持高并发、高可用的医疗咨询服务。
- **Created Date**: 2025-12-06
- **Last Updated**: 2025-12-07

### Technology Stack
- **Primary Language**: Java 17 (后端), TypeScript 5.5.3 (前端)
- **Frameworks**: Spring Boot 3.5.7 (后端), Vue.js 3.5.10 (前端)
- **Build Tools**: Maven (后端), npm/Vite (前端)
- **Database**: 待配置 (当前为内存数据库)
- **Testing Framework**: JUnit (后端), 待配置 (前端)
- **Deployment Platform**: 支持 CloudStudio 部署

### Business Context
- **Business Domain**: 医疗健康 (Healthcare)
- **Key Business Processes**: 
  1. 用户注册、登录和权限管理
  2. 医疗问题发布和回答
  3. 数据统计和分析
  4. 系统管理和监控
- **Business Rules**:
  1. 用户需要验证邮箱才能使用完整功能
  2. 医疗问题需要专业审核
  3. 回答需要符合医疗规范
  4. 用户数据需要严格保密

## Workspace Structure

### File Tree with Guidance
```
qa-live-healthcare-bolt-vue-c1joxy7j/
├── .asdm/                          # ASDM 配置和工具集
│   ├── contexts/                   # 上下文文件 (本目录)
│   ├── docs/                       # ASDM 文档
│   ├── skills/                     # ASDM 技能
│   ├── spec/                       # 项目规范
│   └── toolsets/                   # 安装的工具集
├── .codebuddy/                     # Tencent CodeBuddy 配置
│   ├── commands/                   # 命令文件
│   └── skills/                     # 技能文件
├── _TRAINING_ASSETS/               # 训练资源
│   ├── qa-service-question.zip     # 问题服务训练数据
│   └── qa-service-user.zip         # 用户服务训练数据
├── server/                         # 后端微服务
│   ├── qa-service-user/            # 用户管理服务 (端口: 8080)
│   │   ├── docs/                   # 服务文档
│   │   ├── src/                    # 源代码
│   │   ├── pom.xml                 # Maven 配置
│   │   └── *.sh                    # 启动脚本
│   ├── qa-service-question/        # 问题管理服务 (端口: 8081)
│   │   ├── src/                    # 源代码
│   │   ├── pom.xml                 # Maven 配置
│   │   └── HELP.md                 # 帮助文档
│   └── qa-service-statistic/       # 统计分析服务 (待开发)
├── web/                            # 前端应用
│   └── qa-web/                     # Vue.js 前端应用 (端口: 5173)
│       ├── src/                    # 源代码
│       │   ├── api/                # API 接口
│       │   ├── assets/             # 静态资源
│       │   ├── components/         # Vue 组件
│       │   └── main.ts             # 应用入口
│       ├── docs/                   # 前端文档
│       ├── package.json            # npm 配置
│       └── vite.config.ts          # Vite 配置
├── test/                           # 测试目录
│   └── e2e/                        # 端到端测试
├── package.json                    # 根项目配置
├── README.md                       # 项目说明文档
└── .gitignore                      # Git 忽略规则
```

### Key Directories Explanation
- **`.asdm/contexts/`**: 包含所有 AI 模型参考的上下文文件 - AI 应首先参考此目录
- **`server/`**: 后端微服务代码 - AI 应在此实现业务逻辑和 API
- **`web/qa-web/`**: 前端 Vue.js 应用 - AI 应在此实现用户界面和交互
- **`docs/`**: 各服务的文档目录 - AI 应参考现有文档并保持更新
- **`.codebuddy/commands/`**: Tencent CodeBuddy 命令文件 - AI 可使用的快捷命令

## Development Guidelines

### Building and Compilation
```bash
# 安装所有依赖
npm install
npm run install:all

# 启动开发环境 (同时启动前后端)
npm run dev

# 单独启动前端
npm run dev:web

# 单独启动后端服务
npm run dev:server

# 构建前端项目
npm run build

# 清理项目
npm run clean
```

### Testing
```bash
# 后端测试 (在各自服务目录中)
cd server/qa-service-user
./mvnw test

cd server/qa-service-question  
./mvnw test

# 前端测试 (待配置)
cd web/qa-web
# 测试命令待配置
```

### Code Quality
- **后端代码规范**: 遵循 Spring Boot 最佳实践
- **前端代码规范**: 遵循 Vue.js 3 + TypeScript 规范
- **API 设计**: RESTful API 设计原则
- **文档要求**: 代码注释和 API 文档同步更新

## Context Files Reference

This workspace has the following context files available in `.asdm/contexts/`:

1. **[asdm.standard-project-structure.md](./asdm.standard-project-structure.md)** - 标准项目结构和组织
2. **[asdm.standard-coding-style.md](./asdm.standard-coding-style.md)** - 编码标准和风格指南
3. **[asdm.data-models.md](./asdm.data-models.md)** - 数据模型、关系和图表
4. **[asdm.deployment.md](./asdm.deployment.md)** - 部署配置和流程
5. **[asdm.api.md](./asdm.api.md)** - API 定义、端点和文档
6. **[asdm.architecture.md](./asdm.architecture.md)** - 系统架构和设计决策

### 文件内容概览

| 文件 | 大小 | 最后更新 | 主要内容 |
|------|------|----------|----------|
| **asdm.api.md** | 14.19 KB | 2025-12-07 | API 文档、当前项目状态、可用 API、前端模拟数据、计划中的 API 架构 |
| **asdm.architecture.md** | 7.12 KB | 2025-12-07 | 系统架构、技术栈详情、项目结构、路由设计、开发环境配置 |
| **asdm.data-models.md** | 5.89 KB | 2025-12-07 | 实体定义（医生、患者、问题）、数据关系、数据存储、技术栈详情 |
| **asdm.deployment.md** | 23.73 KB | 2025-12-07 | 部署架构、环境配置、部署方法（本地、CloudStudio、Docker、Kubernetes）、医疗特定部署考虑 |
| **asdm.standard-coding-style.md** | 21.69 KB | 2025-12-07 | 编码标准、Java 和 TypeScript 指南、医疗特定代码、测试标准、代码审查指南 |
| **asdm.standard-project-structure.md** | 13.84 KB | 2025-12-07 | 项目结构、微服务结构、前端结构、目录约定、最佳实践 |

### 使用建议

1. **新开发者入门**: 从 `asdm.architecture.md` 开始了解系统架构
2. **API 开发**: 参考 `asdm.api.md` 了解现有 API 和计划
3. **数据建模**: 使用 `asdm.data-models.md` 了解实体和关系
4. **部署配置**: 查看 `asdm.deployment.md` 获取部署指南
5. **编码规范**: 遵循 `asdm.standard-coding-style.md` 的编码标准
6. **项目结构**: 参考 `asdm.standard-project-structure.md` 了解目录组织

## AI Model Guidance

### How to Use This Context
1. **从本索引开始** 了解工作区结构
2. **根据任务参考特定的上下文文件**
3. **遵循开发指南** 进行构建、测试和部署
4. **保持一致性** 与现有模式和约定

### Common Tasks
- **添加新功能**: 首先检查架构和数据模型
- **修改 API**: 参考 API 文档并相应更新
- **数据库变更**: 更新数据模型和迁移脚本
- **部署更新**: 遵循部署流程文档

### 特定于此工作区的指导
1. **微服务架构**: 项目采用微服务设计，每个服务独立开发部署
2. **前后端分离**: 前端使用 Vue.js，后端使用 Spring Boot
3. **医疗领域**: 注意医疗数据的敏感性和合规要求
4. **中文开发**: 代码注释和文档使用中文

### Troubleshooting
- 如果某些功能不按预期工作，请检查相关的上下文文件
- 对于构建问题，验证依赖项和配置
- 对于运行时问题，检查部署和环境配置
- 微服务间通信问题，检查端口配置和网络连接

## Version History
| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-12-07 | 初始上下文创建 | Context Builder |
| 1.1.0 | 2025-12-07 | 更新上下文文件引用，添加文件概览和使用建议 | AI Assistant |
| [Next] | [Date] | [变更描述] | [Author] |

---

*此上下文文件由 Context Builder 工具集维护。当工作区发生变化时，使用 `/context-update-instruction` 进行更新。*