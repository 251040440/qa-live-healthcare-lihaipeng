# 项目结构文档

本文档详细描述前端项目的目录结构和文件组织规范。

## 目录结构概览

```
web/qa-web/
├── public/                     # 静态资源目录（不经过构建处理）
│   └── vite.svg               # 网站图标
│
├── src/                        # 源代码目录
│   ├── assets/                # 静态资源（经过构建处理）
│   │
│   ├── components/            # 通用组件目录
│   │   ├── AppFooter.vue     # 页脚组件
│   │   ├── AppHeader.vue     # 导航头组件
│   │   └── HelloWorld.vue    # 示例组件
│   │
│   ├── data/                  # 模拟数据目录
│   │   ├── doctor-user-list.json  # 医生列表数据
│   │   ├── patient-user.json      # 患者数据
│   │   └── question-list.json     # 问题列表数据
│   │
│   ├── router/                # 路由配置目录
│   │   └── index.ts          # 路由定义文件
│   │
│   ├── store/                 # 状态管理目录
│   │   └── index.ts          # 全局状态管理
│   │
│   ├── views/                 # 页面视图目录
│   │   ├── About.vue         # 关于页面
│   │   ├── Consultation.vue  # 问诊页面
│   │   ├── DoctorLogin.vue   # 医生登录页面
│   │   ├── DoctorRoom.vue    # 医生诊室页面
│   │   ├── Doctors.vue       # 医生列表页面
│   │   └── Home.vue          # 首页
│   │
│   ├── App.vue               # 根组件
│   ├── main.ts               # 应用入口文件
│   ├── style.css             # 全局样式
│   └── vite-env.d.ts         # Vite 类型声明
│
├── docs/                       # 文档目录
│   ├── api.md                # API 接口文档
│   ├── project-structure.md  # 项目结构文档（本文档）
│   ├── coding-style.md       # 编码规范文档
│   ├── deployment.md         # 部署文档
│   └── arch.md               # 架构设计文档
│
├── index.html                  # HTML 入口文件
├── package.json               # 项目配置和依赖
├── tsconfig.json              # TypeScript 主配置
├── tsconfig.app.json          # 应用代码 TypeScript 配置
├── tsconfig.node.json         # Node 环境 TypeScript 配置
├── vite.config.ts             # Vite 构建配置
├── app-management.sh          # 应用管理脚本
└── README.md                  # 项目说明文档
```

## 目录职责说明

### `/public` - 静态资源目录

存放不经过构建工具处理的静态文件，这些文件会直接复制到构建输出目录。

- 适合存放：favicon、robots.txt、不需要处理的图片等
- 引用方式：直接使用绝对路径，如 `/vite.svg`

### `/src` - 源代码目录

#### `/src/assets` - 构建时处理的资源

存放需要经过 Vite 构建处理的静态资源，如需要压缩、hash 命名的图片、字体等。

#### `/src/components` - 组件目录

存放可复用的 Vue 组件。

**命名规范**：
- 组件文件使用 PascalCase 命名，如 `AppHeader.vue`
- 组件名应具有描述性，避免缩写

**组件分类**：
| 组件 | 类型 | 说明 |
|------|------|------|
| `AppHeader.vue` | 布局组件 | 页面顶部导航栏 |
| `AppFooter.vue` | 布局组件 | 页面底部信息 |
| `HelloWorld.vue` | 示例组件 | 开发模板示例 |

#### `/src/data` - 模拟数据目录

存放开发阶段使用的模拟 JSON 数据。

| 文件 | 说明 |
|------|------|
| `doctor-user-list.json` | 医生用户数据，包含医生信息和状态 |
| `patient-user.json` | 患者用户数据 |
| `question-list.json` | 问诊问题数据，包含问题和回答 |

#### `/src/router` - 路由目录

存放 Vue Router 路由配置。

**当前路由结构**：
```typescript
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/consultation', name: 'Consultation', component: Consultation },
  { path: '/consultation/:doctorUsername', name: 'ConsultationRoom', component: Consultation },
  { path: '/doctors', name: 'Doctors', component: Doctors },
  { path: '/about', name: 'About', component: About },
  { path: '/doctor/login', name: 'DoctorLogin', component: DoctorLogin },
  { path: '/doctor/room/:username', name: 'DoctorRoom', component: DoctorRoom },
]
```

#### `/src/store` - 状态管理目录

使用 Vue 3 Composition API 实现的轻量级状态管理。

**提供的状态和方法**：
- 状态：`doctors`、`patients`、`questions`、`currentDoctor`、`currentPatient`
- 方法：登录/登出、问题管理、数据查询等

#### `/src/views` - 页面视图目录

存放页面级 Vue 组件，每个组件对应一个路由。

| 视图 | 路由 | 功能描述 |
|------|------|----------|
| `Home.vue` | `/` | 首页，展示统计信息和开放诊室 |
| `Consultation.vue` | `/consultation` | 患者问诊入口，身份验证和问题提交 |
| `Doctors.vue` | `/doctors` | 医生列表展示 |
| `About.vue` | `/about` | 关于页面 |
| `DoctorLogin.vue` | `/doctor/login` | 医生登录页面 |
| `DoctorRoom.vue` | `/doctor/room/:username` | 医生诊室工作台 |

### `/docs` - 文档目录

存放项目相关文档。

## 配置文件说明

### `package.json`

项目配置文件，定义项目信息和脚本命令。

**主要脚本**：
```json
{
  "scripts": {
    "dev": "vite",                          // 启动开发服务器
    "build": "vue-tsc -b && vite build",    // 构建生产版本
    "preview": "vite preview",              // 预览生产构建
    "app:start": "./app-management.sh start", // 启动应用
    "app:stop": "./app-management.sh stop",   // 停止应用
    "app:restart": "./app-management.sh restart", // 重启应用
    "app:status": "./app-management.sh status",   // 查看状态
    "app:logs": "./app-management.sh logs"        // 查看日志
  }
}
```

### `tsconfig.json`

TypeScript 主配置文件，引用了两个子配置。

### `tsconfig.app.json`

应用代码的 TypeScript 配置：
- 目标：ES2020
- 模块：ESNext
- 严格模式：开启
- JSX：preserve

### `tsconfig.node.json`

Node 环境配置，用于 Vite 配置文件。

### `vite.config.ts`

Vite 构建工具配置文件。

### `index.html`

应用入口 HTML 文件，Vite 使用此文件作为入口。

## 文件命名规范

| 类型 | 命名规范 | 示例 |
|------|----------|------|
| Vue 组件 | PascalCase | `AppHeader.vue` |
| TypeScript 文件 | camelCase | `main.ts` |
| JSON 文件 | kebab-case | `doctor-user-list.json` |
| 配置文件 | 小写 + 点分隔 | `tsconfig.json` |
| Shell 脚本 | kebab-case | `app-management.sh` |

## 扩展建议

### 新增页面

1. 在 `src/views/` 创建 Vue 组件
2. 在 `src/router/index.ts` 添加路由配置

### 新增通用组件

1. 在 `src/components/` 创建组件
2. 确保组件具有独立性和可复用性

### 新增 API 服务

未来对接后端时，建议：
1. 创建 `src/services/` 目录
2. 创建 `src/api/` 目录存放 API 请求封装
3. 创建 `src/types/` 目录存放类型定义

### 新增状态模块

如果状态管理变复杂，建议：
1. 创建 `src/store/modules/` 目录
2. 按功能模块拆分状态管理
