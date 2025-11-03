# QA Live Healthcare 项目文件结构规范

## 📋 文档说明

**重要提醒：本文档定义了 QA Live Healthcare 前端项目的标准文件结构规范，所有开发者必须严格遵循此规范进行开发。**

### 规范目的
1. **统一性**: 确保团队成员使用一致的文件组织方式
2. **可维护性**: 便于代码维护和功能扩展
3. **可读性**: 新成员能够快速理解项目结构
4. **协作性**: 减少因文件放置位置不当导致的冲突

### 使用原则
- ✅ **必须遵循**: 标记为 `[必需]` 的目录和文件
- 🔄 **按需创建**: 标记为 `[可选]` 的目录，根据项目需要创建
- 📝 **命名规范**: 严格按照规范的命名方式
- 🚫 **禁止随意**: 不得在规范外的位置创建文件或目录

### 标记说明
- `[必需]` - 项目核心必须存在的目录或文件
- `[存在]` - 当前项目中已经存在的文件或目录
- `[可选]` - 根据业务需要可以创建的目录
- `[示例]` - 展示命名规范的示例文件，实际开发时按需创建

---

## 🏗️ 项目文件结构规范

```
qa-web/                                    # 项目根目录
├── .vscode/                              # [可选] VS Code 配置
│   └── settings.json                     # [示例] 工作区设置
├── docs/                                 # [必需] 项目文档目录
│   ├── project-structure.md             # [必需] 项目结构规范 (当前文件)
│   └── api.md                           # [示例] API 接口文档
├── public/                              # [必需] 静态资源目录
│   ├── vite.svg                        # [存在] Vite 图标
│   └── favicon.ico                     # [示例] 网站图标
├── src/                                # [必需] 源代码目录
│   ├── api/                           # [可选] API 接口管理
│   │   ├── modules/                   # [可选] 按模块分组的 API
│   │   │   └── auth.ts               # [示例] 认证相关 API
│   │   ├── request.ts                # [示例] Axios 请求封装
│   │   └── types.ts                  # [示例] API 响应类型定义
│   ├── assets/                       # [必需] 静态资源
│   │   ├── vue.svg                   # [存在] Vue 图标
│   │   ├── images/                   # [可选] 图片资源
│   │   ├── icons/                    # [可选] 图标资源
│   │   ├── fonts/                    # [可选] 字体文件
│   │   └── styles/                   # [可选] 样式文件
│   │       └── index.scss            # [示例] 主样式文件
│   ├── components/                   # [必需] 公共组件
│   │   ├── AppFooter.vue            # [存在] 应用底部组件
│   │   ├── AppHeader.vue            # [存在] 应用头部导航组件
│   │   ├── HelloWorld.vue           # [存在] 示例组件 (可删除)
│   │   ├── common/                  # [可选] 通用组件
│   │   │   └── BaseButton/          # [示例] 基础按钮组件目录
│   │   │       ├── index.vue        # [示例] 组件主文件
│   │   │       ├── types.ts         # [示例] 组件类型定义
│   │   │       └── index.ts         # [示例] 组件导出文件
│   │   ├── business/                # [可选] 业务组件
│   │   │   └── DoctorCard/          # [示例] 医生卡片组件目录
│   │   └── layout/                  # [可选] 布局组件 (如需要独立布局组件)
│   │       └── DefaultLayout/       # [示例] 默认布局目录
│   ├── composables/                 # [可选] 组合式函数 (Composition API)
│   │   └── useAuth.ts              # [示例] 认证相关逻辑
│   ├── constants/                   # [可选] 常量定义
│   │   ├── api.ts                  # [示例] API 相关常量
│   │   └── index.ts                # [示例] 常量导出
│   ├── data/                       # [必需] 模拟数据 (开发阶段)
│   │   ├── doctor-user-list.json  # [存在] 医生用户数据
│   │   ├── patient-user.json      # [存在] 患者用户数据
│   │   ├── question-list.json     # [存在] 问诊记录数据
│   │   └── mock-data.ts           # [示例] 模拟数据生成器
│   ├── directives/                 # [可选] 自定义指令
│   │   ├── permission.ts          # [示例] 权限指令
│   │   └── index.ts               # [示例] 指令注册
│   ├── enums/                      # [可选] 枚举定义
│   │   └── user.ts                # [示例] 用户相关枚举
│   ├── hooks/                      # [可选] 自定义 Hooks (与 composables 二选一)
│   │   └── useRequest.ts          # [示例] 请求 Hook
│   ├── layouts/                    # [可选] 页面布局 (如需要复杂布局系统)
│   │   └── DefaultLayout.vue      # [示例] 默认布局
│   ├── plugins/                    # [可选] 插件配置
│   │   └── antd.ts               # [示例] Ant Design Vue 配置
│   ├── router/                     # [必需] 路由配置
│   │   ├── index.ts              # [存在] 路由主配置
│   │   ├── modules/              # [可选] 路由模块
│   │   │   └── auth.ts          # [示例] 认证路由
│   │   ├── guards/               # [可选] 路由守卫
│   │   │   └── auth.ts          # [示例] 认证守卫
│   │   └── types.ts              # [示例] 路由类型定义
│   ├── services/                   # [可选] 业务服务层 (与 api 目录功能类似)
│   │   └── AuthService.ts         # [示例] 认证服务
│   ├── store/                      # [必需] 状态管理 (当前使用 reactive)
│   │   ├── index.ts              # [存在] 全局状态管理
│   │   ├── modules/              # [可选] 状态模块 (如迁移到 Pinia)
│   │   │   └── auth.ts          # [示例] 认证状态
│   │   └── types.ts              # [示例] Store 类型定义
│   ├── types/                      # [可选] 类型定义
│   │   ├── api.ts                # [示例] API 类型
│   │   ├── common.ts             # [示例] 通用类型
│   │   └── global.d.ts           # [示例] 全局类型声明
│   ├── utils/                      # [可选] 工具函数
│   │   ├── auth.ts               # [示例] 认证工具
│   │   └── index.ts              # [示例] 工具函数导出
│   ├── views/                      # [必需] 页面组件
│   │   ├── About.vue             # [存在] 关于页面
│   │   ├── Consultation.vue      # [存在] 患者问诊页面
│   │   ├── DoctorLogin.vue       # [存在] 医生登录页面
│   │   ├── DoctorRoom.vue        # [存在] 医生工作台页面
│   │   ├── Doctors.vue           # [存在] 医生列表页面
│   │   ├── Home.vue              # [存在] 首页
│   │   ├── auth/                 # [可选] 认证相关页面目录
│   │   │   └── Login.vue        # [示例] 统一登录页
│   │   ├── doctor/               # [可选] 医生相关页面目录
│   │   │   └── Dashboard.vue    # [示例] 医生仪表板
│   │   ├── patient/              # [可选] 患者相关页面目录
│   │   │   └── Profile.vue      # [示例] 患者资料
│   │   ├── consultation/         # [可选] 问诊相关页面目录
│   │   │   └── List.vue         # [示例] 问诊列表
│   │   └── error/                # [可选] 错误页面
│   │       └── 404.vue          # [示例] 404 页面
│   ├── App.vue                   # [必需] 根组件
│   ├── main.ts                   # [必需] 应用入口
│   ├── style.css                 # [存在] 全局样式
│   └── vite-env.d.ts            # [必需] Vite 环境类型声明
├── tests/                        # [可选] 测试文件
│   ├── unit/                    # [可选] 单元测试
│   │   └── components/          # [可选] 组件测试
│   ├── e2e/                     # [可选] 端到端测试
│   │   └── auth.spec.ts        # [示例] 认证流程测试
│   └── __mocks__/               # [可选] 测试模拟文件
├── .bolt/                        # [存在] Bolt 配置目录
│   └── config.json              # [存在] Bolt 配置文件
├── .env                         # [存在] 环境变量 (默认)
├── .env.development             # [示例] 开发环境变量
├── .eslintrc.js                 # [示例] ESLint 配置
├── .gitignore                   # [必需] Git 忽略文件
├── .prettierrc                  # [示例] Prettier 配置
├── index.html                   # [必需] HTML 入口文件
├── package.json                 # [必需] 项目依赖和脚本
├── package-lock.json            # [必需] 依赖锁定文件
├── README.md                    # [必需] 项目说明文档
├── tsconfig.json                # [必需] TypeScript 配置
├── tsconfig.app.json            # [必需] 应用 TypeScript 配置
├── tsconfig.node.json           # [必需] Node.js TypeScript 配置
├── vite.config.ts               # [必需] Vite 构建配置
└── vitest.config.ts             # [示例] Vitest 测试配置
```

---

## 📝 文件命名规范

### 组件命名
- **Vue 组件**: 使用 PascalCase，如 `DoctorCard.vue`
- **组件目录**: 使用 PascalCase，如 `DoctorCard/`
- **组件文件**: `index.vue` (主组件)、`types.ts` (类型)、`index.ts` (导出)

### 页面命名
- **页面组件**: 使用 PascalCase，如 `DoctorLogin.vue`
- **页面目录**: 使用 kebab-case，如 `doctor/`、`consultation/`

### 工具和服务命名
- **工具函数**: 使用 camelCase，如 `formatDate.ts`
- **服务类**: 使用 PascalCase，如 `AuthService.ts`
- **类型文件**: 使用 camelCase，如 `doctor.ts`

### 常量和枚举命名
- **常量文件**: 使用 camelCase，如 `apiConstants.ts`
- **枚举文件**: 使用 camelCase，如 `userStatus.ts`

---

## 🔄 迁移和扩展指南

### 当前项目状态
- ✅ 基础结构已建立
- ✅ 核心功能组件已实现
- 🔄 可根据业务需求逐步完善

### 推荐迁移顺序
1. **第一阶段**: 创建 `types/` 目录，提取类型定义
2. **第二阶段**: 创建 `composables/` 目录，提取可复用逻辑
3. **第三阶段**: 创建 `api/` 目录，替换模拟数据
4. **第四阶段**: 完善测试和文档

### 扩展原则
- 🎯 **按需创建**: 只在需要时创建新的目录结构
- 📦 **模块化**: 保持功能模块的独立性
- 🔗 **一致性**: 遵循已建立的命名和组织规范
- 📚 **文档化**: 及时更新相关文档

---

**注意**: 本规范将随着项目发展持续更新，请定期查看最新版本。如有疑问或建议，请及时与团队沟通。