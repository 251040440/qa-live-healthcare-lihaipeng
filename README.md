# QA Healthcare Project

医疗问答系统 - 基于微服务架构的前后端分离项目

## 项目概述

QA Healthcare 是一个现代化的医疗问答系统，采用微服务架构设计，提供用户管理、问题管理和统计分析等核心功能。项目基于 Spring Boot 微服务后端和 Vue.js 前端技术栈构建，支持高并发、高可用的医疗咨询服务。

### 核心特性
- 🏥 **医疗问答**: 专业的医疗问题咨询和解答平台
- 👥 **用户管理**: 完整的用户注册、认证和权限管理
- 📊 **数据统计**: 实时的业务数据分析和可视化
- 🔧 **微服务架构**: 模块化设计，易于扩展和维护
- 🌐 **前后端分离**: 现代化的开发架构，支持多端适配

## 项目组件结构

| 组件名称 | 目录路径 | 组件类型 | 技术栈 | 端口 | 描述 |
|---------|----------|----------|--------|------|------|
| **用户管理服务** | `server/qa-service-user/` | 后端微服务 | Spring Boot 3.5.7 + Java 17 + Maven | 8080 | 用户注册、登录、权限管理等功能 |
| **问题管理服务** | `server/qa-service-question/` | 后端微服务 | Spring Boot 3.5.7 + Java 17 + Maven | 8081 | 医疗问题发布、回答、管理功能 |
| **统计分析服务** | `server/qa-service-statistic/` | 后端微服务 | 待开发 | 待配置 | 数据统计、分析、报表功能 |
| **前端应用** | `web/qa-web/` | Web 前端 | Vue.js 3.5.10 + TypeScript 5.5.3 + Vite 5.4.8 | 5173 | 用户界面、交互逻辑、页面展示 |
| **根目录管理** | `/` | 项目管理 | Node.js + npm + concurrently | - | 统一的依赖管理和启动脚本 |

### 技术栈详情

#### 后端技术栈
- **框架**: Spring Boot 3.5.7
- **语言**: Java 17 (OpenJDK Temurin-17.0.14+7)
- **构建工具**: Maven 3.x
- **监控**: Spring Boot Actuator
- **Web 服务器**: Apache Tomcat 10.1.48

#### 前端技术栈
- **框架**: Vue.js 3.5.10
- **语言**: TypeScript 5.5.3
- **构建工具**: Vite 5.4.8
- **UI 组件库**: Ant Design Vue 4.2.6
- **路由**: Vue Router 4.6.3
- **日期处理**: Day.js 1.11.19

#### 开发工具
- **并发执行**: concurrently 8.2.2
- **版本控制**: Git
- **包管理**: npm 10.9.3

## 快速开始

### 1. 安装依赖

```bash
# 安装根目录依赖 (concurrently)
npm install

# 安装前端依赖
npm run install:all
```

### 2. 启动开发环境

```bash
# 同时启动前端和所有后端服务
npm run dev
```

这个命令会同时启动：
- 前端服务：`http://localhost:5173` (Vue.js + Vite)
- 用户管理服务：`http://localhost:8080` (Spring Boot)
- 问题管理服务：`http://localhost:8081` (Spring Boot)

### 3. 单独启动服务

```bash
# 只启动前端
npm run dev:web

# 启动所有后端服务
npm run dev:server

# 单独启动用户管理服务
npm run dev:user

# 单独启动问题管理服务  
npm run dev:question
```

### 4. 构建项目

```bash
# 构建前端项目
npm run build
```

### 5. 清理项目

```bash
# 清理所有构建文件和依赖
npm run clean

# 单独清理前端
npm run clean:web

# 清理所有后端服务
npm run clean:server

# 单独清理用户服务
npm run clean:server:user

# 单独清理问题服务
npm run clean:server:question
```

## 开发调试环境信息

### 环境要求
| 工具 | 最低版本 | 当前版本 | 说明 |
|------|----------|----------|------|
| **Node.js** | >= 16.0.0 | v22.18.0 | JavaScript 运行时环境 |
| **npm** | >= 8.0.0 | 10.9.3 | Node.js 包管理器 |
| **Java** | 17 | OpenJDK 17.0.14+7 | Java 开发环境 (Temurin) |
| **Maven** | >= 3.6.0 | 内置 (mvnw) | Java 项目构建工具 |
| **Git** | >= 2.0 | 系统版本 | 版本控制工具 |

### 开发环境配置
- **操作系统**: Linux (Ubuntu/CentOS 兼容)
- **Shell**: Bash
- **Java 管理**: SDKMAN (`~/.sdkman/`)
- **Node.js 管理**: NVM (`~/.nvm/`)
- **IDE 支持**: VS Code, IntelliJ IDEA, Eclipse

### 环境变量配置
```bash
# Java 环境 (通过 SDKMAN 管理)
export JAVA_HOME=~/.sdkman/candidates/java/current
export PATH=$JAVA_HOME/bin:$PATH

# Node.js 环境 (通过 NVM 管理)  
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

## 服务端口配置

| 服务 | 端口 | 访问地址 | 状态检查 | 说明 |
|------|------|----------|----------|------|
| **前端开发服务器** | 5173 | http://localhost:5173 | 页面访问 | Vite 开发服务器 |
| **用户管理服务** | 8080 | http://localhost:8080 | `/actuator/health` | Spring Boot 应用 |
| **问题管理服务** | 8081 | http://localhost:8081 | `/actuator/health` | Spring Boot 应用 |
| **统计分析服务** | 待配置 | 待配置 | 待配置 | 规划中 |

### 调试端点

#### 用户管理服务 (8080)
- **健康检查**: http://localhost:8080/actuator/health
- **应用信息**: http://localhost:8080/actuator/info  
- **指标监控**: http://localhost:8080/actuator/metrics
- **环境信息**: http://localhost:8080/actuator/env
- **Bean 信息**: http://localhost:8080/actuator/beans
- **日志配置**: http://localhost:8080/actuator/loggers

#### 问题管理服务 (8081)
- **健康检查**: http://localhost:8081/actuator/health
- **应用信息**: http://localhost:8081/actuator/info
- **指标监控**: http://localhost:8081/actuator/metrics
- **环境信息**: http://localhost:8081/actuator/env

## 开发调试工具

### 前端调试
- **开发服务器**: Vite 热重载开发服务器
- **浏览器工具**: Vue.js DevTools 扩展
- **TypeScript**: 实时类型检查和错误提示
- **构建分析**: `npm run build` 生成构建报告
- **预览模式**: `npm run preview` 预览生产构建

### 后端调试  
- **热重载**: Spring Boot DevTools (开发时自动重启)
- **健康监控**: Actuator 端点实时监控应用状态
- **日志输出**: 控制台和文件日志 (可配置级别)
- **API 测试**: 支持 Postman, curl, HTTPie 等工具
- **JVM 监控**: 通过 Actuator 查看内存、线程等信息

### 集成调试
- **并发启动**: concurrently 同时启动前后端服务
- **CORS 配置**: 开发环境已配置跨域支持
- **代理配置**: 前端可配置 API 代理到后端服务
- **环境隔离**: 支持开发、测试、生产环境配置

## 开发指南

1. **API 开发**: 后端 API 文档位于 `server/qa-service-user/docs/api.md`
2. **前端开发**: 前端组件位于 `web/qa-web/src/components/`
3. **CORS 配置**: 已配置开发环境跨域支持
4. **热重载**: 前后端都支持代码热重载

## 部署

### 本地部署
按照上述快速开始步骤即可

### CloudStudio 部署
遵循项目 CloudStudioRules 规范进行部署

## 故障排除

### 常见问题

1. **端口冲突**
   ```bash
   # 检查端口占用
   lsof -i :8080
   lsof -i :5173
   ```

2. **依赖安装失败**
   ```bash
   # 清理并重新安装
   npm run clean
   npm install
   npm run install:all
   ```

3. **后端启动失败**
   ```bash
   # 检查 Java 版本
   java -version
   
   # 手动启动后端
   cd server/qa-service-user
   ./mvnw spring-boot:run
   ```

4. **前端启动失败**
   ```bash
   # 检查 Node.js 版本
   node -v
   
   # 手动启动前端
   cd web/qa-web
   npm run dev
   ```

## 贡献指南

1. 遵循项目编码规范
2. 提交前运行测试
3. 使用中文 commit message
4. API 变更需同步更新文档

## 许可证

MIT License