# QA Live Healthcare - 在线医疗问诊平台

## 项目概述

QA Live Healthcare 是一个专业的在线医疗问诊平台前端应用，基于 Vue 3 + TypeScript + Vite 构建。该平台连接专业医生与患者，提供便捷、高效的医疗咨询服务，支持实时在线问诊、医生管理、患者咨询等核心功能。

## 项目文件结构

```
qa-web/
├── public/                          # 静态资源目录
│   └── vite.svg                    # Vite 图标
├── src/                            # 源代码目录
│   ├── assets/                     # 静态资源
│   │   └── vue.svg                # Vue 图标
│   ├── components/                 # 公共组件
│   │   ├── AppFooter.vue          # 应用底部组件
│   │   ├── AppHeader.vue          # 应用头部导航组件
│   │   └── HelloWorld.vue         # 示例组件
│   ├── data/                      # 模拟数据
│   │   ├── doctor-user-list.json  # 医生用户数据
│   │   ├── patient-user.json      # 患者用户数据
│   │   └── question-list.json     # 问诊记录数据
│   ├── router/                    # 路由配置
│   │   └── index.ts              # 路由定义和配置
│   ├── store/                     # 状态管理
│   │   └── index.ts              # 全局状态管理（医生、患者、问诊数据）
│   ├── views/                     # 页面组件
│   │   ├── About.vue             # 关于页面
│   │   ├── Consultation.vue      # 患者问诊页面
│   │   ├── DoctorLogin.vue       # 医生登录页面
│   │   ├── DoctorRoom.vue        # 医生工作台页面
│   │   ├── Doctors.vue           # 医生列表页面
│   │   └── Home.vue              # 首页
│   ├── App.vue                   # 根组件
│   ├── main.ts                   # 应用入口文件
│   ├── style.css                 # 全局样式
│   └── vite-env.d.ts            # Vite 类型声明
├── .bolt/                        # Bolt 配置目录
│   └── config.json              # Bolt 配置文件
├── .env                         # 环境变量配置
├── .gitignore                   # Git 忽略文件配置
├── app-management.sh            # 应用管理脚本
├── index.html                   # HTML 入口文件
├── logs/                        # 应用日志目录
│   └── application.log          # 应用运行日志
├── package.json                 # 项目依赖和脚本配置
├── package-lock.json            # 依赖锁定文件
├── README.md                    # 项目说明文档
├── tsconfig.json                # TypeScript 配置
├── tsconfig.app.json            # 应用 TypeScript 配置
├── tsconfig.node.json           # Node.js TypeScript 配置
└── vite.config.ts              # Vite 构建配置
```

## 项目技术栈

### 核心框架
- **Vue 3** (v3.5.10) - 渐进式 JavaScript 框架
- **TypeScript** (v5.5.3) - JavaScript 的超集，提供静态类型检查
- **Vite** (v5.4.8) - 现代化的前端构建工具

### UI 组件库
- **Ant Design Vue** (v4.2.6) - 企业级 UI 设计语言和组件库

### 路由和状态管理
- **Vue Router** (v4.6.3) - Vue.js 官方路由管理器
- **Reactive Store** - 基于 Vue 3 reactive API 的轻量级状态管理

### 工具库
- **Day.js** (v1.11.19) - 轻量级日期处理库

### 开发工具
- **@vitejs/plugin-vue** (v5.1.4) - Vite 的 Vue 插件
- **vue-tsc** (v2.1.6) - Vue 的 TypeScript 编译器

### 应用管理
- **app-management.sh** - 自定义应用管理脚本，提供启动、停止、重启、状态查看和日志查看功能

## 核心功能模块

### 1. 用户角色管理
- **患者端**: 身份验证、问诊提交、医生选择
- **医生端**: 登录认证、问诊管理、患者回复

### 2. 问诊系统
- 实时问诊提交和管理
- 问诊状态跟踪（待回复/已回复）
- 医生-患者匹配机制

### 3. 医生管理
- 医生信息展示（姓名、职称、科室、专长）
- 医生在线状态管理
- 医生工作台界面

### 4. 数据管理
- 本地 JSON 数据模拟
- 响应式状态管理
- 数据持久化（内存级别）

## 开发调试

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 开发服务器
```bash
npm run dev
```
启动开发服务器，默认运行在 `http://localhost:5173`

### 应用管理脚本
项目提供了便捷的应用管理脚本 `app-management.sh`，支持以下操作：

```bash
# 启动应用
npm run start
# 或
./app-management.sh start

# 停止应用
npm run stop
# 或
./app-management.sh stop

# 重启应用
npm run restart
# 或
./app-management.sh restart

# 查看应用状态
npm run status
# 或
./app-management.sh status

# 查看应用日志
npm run logs
# 或
./app-management.sh logs
```

#### 应用管理脚本功能说明
- **自动端口管理**: 启动前自动检查并清理占用的端口
- **进程管理**: 通过 PID 文件管理应用进程，支持优雅停止和强制终止
- **日志管理**: 应用日志统一输出到 `logs/application.log` 文件
- **依赖检查**: 启动前自动检查并安装缺失的依赖
- **状态监控**: 显示详细的进程信息和端口监听状态

### 构建生产版本
```bash
npm run build
```
构建优化后的生产版本到 `dist/` 目录

### 预览生产构建
```bash
npm run preview
```
本地预览生产构建版本

## 路由结构

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | Home | 首页 - 平台介绍和快速入口 |
| `/consultation` | Consultation | 患者问诊页面 |
| `/consultation/:doctorUsername` | Consultation | 指定医生问诊页面 |
| `/doctors` | Doctors | 医生列表页面 |
| `/about` | About | 关于平台页面 |
| `/doctor/login` | DoctorLogin | 医生登录页面 |
| `/doctor/room/:username` | DoctorRoom | 医生工作台页面 |

## 数据结构

### 医生数据结构
```typescript
interface Doctor {
  id: string;           // 医生ID
  username: string;     // 用户名
  password: string;     // 密码
  name: string;         // 姓名
  title: string;        // 职称
  department: string;   // 科室
  avatar: string;       // 头像URL
  experience: string;   // 经验描述
  specialties: string[]; // 专长领域
  isActive: boolean;    // 在线状态
}
```

### 患者数据结构
```typescript
interface Patient {
  id: string;       // 患者ID
  name: string;     // 姓名
  birthday: string; // 生日
  phone: string;    // 电话
  gender: string;   // 性别
}
```

### 问诊数据结构
```typescript
interface Question {
  id: string;                    // 问诊ID
  patientId: string;            // 患者ID
  patientName: string;          // 患者姓名
  doctorId: string;             // 医生ID
  doctorName: string;           // 医生姓名
  question: string;             // 问诊内容
  submitTime: string;           // 提交时间
  status: 'pending' | 'answered'; // 状态
  answer: string | null;        // 回复内容
  answerTime: string | null;    // 回复时间
}
```

## 项目特性

### 响应式设计
- 支持桌面端和移动端适配
- 使用 Ant Design Vue 组件库确保 UI 一致性

### 类型安全
- 全面的 TypeScript 类型定义
- 编译时类型检查和错误提示

### 模块化架构
- 组件化开发模式
- 清晰的目录结构和职责分离

#### 开发体验
- Vite 提供快速的热重载
- 现代化的开发工具链

## 📚 项目文档

本项目提供了完整的技术文档，帮助开发者快速了解项目结构和开发规范：

### 核心文档
- **[项目结构规范](./docs/project-structure.md)** - 详细的文件组织规范和命名约定，所有开发者必须遵循的标准结构

### 文档说明
- 📋 **项目结构规范**: 定义了标准的文件和目录组织方式，包含详细的命名规范和扩展指南
- 🔧 **开发规范**: 确保团队协作的一致性和代码的可维护性
- 📖 **使用指南**: 为新成员提供快速上手的参考资料

> **重要提醒**: 请在开发前仔细阅读项目结构规范，严格按照规范进行文件组织和命名。
