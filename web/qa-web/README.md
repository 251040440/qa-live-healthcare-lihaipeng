# QA Web - 医疗问答前端应用

基于 Vue.js 3 + TypeScript 的现代化医疗问答系统前端应用。

## 项目概述

QA Web 是 QA Healthcare 项目的用户界面层，提供患者问诊、医生管理、在线咨询等功能。采用 Vue 3 Composition API 和 Ant Design Vue 组件库构建，支持响应式布局和现代化交互体验。

### 核心功能

- 🏠 **首页**: 展示平台统计信息、开放诊室列表
- 💬 **在线问诊**: 患者身份验证、问题提交、查看回复
- 👨‍⚕️ **医生管理**: 医生列表展示、医生诊室入口
- 🩺 **医生工作台**: 医生登录、问题解答、诊室管理
- ℹ️ **关于页面**: 平台介绍信息

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vue.js** | 3.5.10 | 渐进式 JavaScript 框架 |
| **TypeScript** | 5.5.3 | JavaScript 的类型超集 |
| **Vite** | 5.4.8 | 下一代前端构建工具 |
| **Ant Design Vue** | 4.2.6 | 企业级 UI 组件库 |
| **Vue Router** | 4.6.3 | Vue.js 官方路由 |
| **Day.js** | 1.11.19 | 轻量级日期处理库 |

## 项目结构

```
web/qa-web/
├── public/                 # 静态资源目录
├── src/                    # 源代码目录
│   ├── assets/            # 资源文件（图片、字体等）
│   ├── components/        # 通用组件
│   │   ├── AppFooter.vue  # 页脚组件
│   │   ├── AppHeader.vue  # 导航头组件
│   │   └── HelloWorld.vue # 示例组件
│   ├── data/              # 模拟数据
│   │   ├── doctor-user-list.json  # 医生数据
│   │   ├── patient-user.json      # 患者数据
│   │   └── question-list.json     # 问题数据
│   ├── router/            # 路由配置
│   │   └── index.ts       # 路由定义
│   ├── store/             # 状态管理
│   │   └── index.ts       # 全局状态
│   ├── views/             # 页面视图
│   │   ├── About.vue      # 关于页面
│   │   ├── Consultation.vue # 问诊页面
│   │   ├── DoctorLogin.vue  # 医生登录
│   │   ├── DoctorRoom.vue   # 医生诊室
│   │   ├── Doctors.vue      # 医生列表
│   │   └── Home.vue         # 首页
│   ├── App.vue            # 根组件
│   ├── main.ts            # 应用入口
│   ├── style.css          # 全局样式
│   └── vite-env.d.ts      # 类型声明
├── docs/                  # 文档目录
├── index.html             # HTML 入口
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── tsconfig.app.json      # 应用 TS 配置
├── tsconfig.node.json     # Node TS 配置
├── vite.config.ts         # Vite 配置
└── app-management.sh      # 应用管理脚本
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

启动后访问: http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 页面路由

| 路由路径 | 组件 | 说明 |
|---------|------|------|
| `/` | `Home.vue` | 首页 |
| `/consultation` | `Consultation.vue` | 问诊入口 |
| `/consultation/:doctorUsername` | `Consultation.vue` | 指定医生问诊 |
| `/doctors` | `Doctors.vue` | 医生列表 |
| `/about` | `About.vue` | 关于页面 |
| `/doctor/login` | `DoctorLogin.vue` | 医生登录 |
| `/doctor/room/:username` | `DoctorRoom.vue` | 医生诊室 |

## 应用管理脚本

项目提供应用管理脚本：

```bash
# 启动应用
npm run app:start

# 停止应用
npm run app:stop

# 重启应用
npm run app:restart

# 查看状态
npm run app:status

# 查看日志
npm run app:logs
```

## 开发指南

### 组件开发

- 使用 `<script setup>` 语法糖
- 组件命名采用 PascalCase
- 样式使用 scoped 避免污染

### 状态管理

使用 Vue 3 的 `reactive` API 实现轻量级状态管理，位于 `src/store/index.ts`。

### 路由配置

路由配置位于 `src/router/index.ts`，使用 Vue Router 的 `createWebHistory` 模式。

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 相关文档

- [API 文档](./docs/api.md)
- [项目结构](./docs/project-structure.md)
- [编码规范](./docs/coding-style.md)
- [部署指南](./docs/deployment.md)
- [架构设计](./docs/arch.md)

## 许可证

MIT License
