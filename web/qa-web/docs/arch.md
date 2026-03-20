# 架构设计文档

本文档描述 QA Web 前端应用的系统架构和技术设计。

## 目录

- [架构概述](#架构概述)
- [技术架构](#技术架构)
- [目录架构](#目录架构)
- [数据流](#数据流)
- [路由架构](#路由架构)
- [状态管理](#状态管理)
- [组件设计](#组件设计)
- [技术选型](#技术选型)

---

## 架构概述

QA Web 是一个基于 Vue 3 的现代化单页应用(SPA)，采用前后端分离架构，提供医疗在线问诊服务。

### 系统架构

```
┌─────────────────────────────────────────┐
│              Browser                    │
└──────────────┬────────────────────────┘
               │
      ┌────────▼────────┐
      │   Vue 3 App    │
      │   (SPA)        │
      └───────┬────────┘
              │
    ┌─────────┴─────────┐
    │                     │
┌───▼────┐         ┌────▼────┐
│ Views  │         │ Store   │
└───┬────┘         └────┬────┘
    │                   │
┌───▼────┐         ┌───▼────┐
│Router  │         │ Mock   │
└────────┘         │ Data   │
                   └────────┘
```

### 设计原则

1. **组件化**: 可复用的 UI 组件
2. **响应式**: Vue 3 响应式系统
3. **类型安全**: TypeScript 类型检查
4. **按需加载**: Vite 代码分割

---

## 技术栈

### 标准技术栈

| 层级 | 技术 | 版本 | 说明 |
|-------|------|------|
| **框架** | Vue.js | 3.5.10 | Composition API |
| **语言** | TypeScript | 5.5.3 | 类型安全 |
| **构建** | Vite | 5.4.8 | ESM 构建 |
| **路由** | Vue Router | 4.6.3 | SPA 路由 |
| **UI** | Ant Design Vue | 4.2.6 | 企业组件 |
| **日期** | Day.js | 1.11.19 | 轻量处理 |

### 技术架构图

```
┌────────────────────────────────────────┐
│           Application Layer             │
├────────────────────────────────────────┤
│  Views    │  Components  │  Router    │
├───────────┼──────────────┼────────────┤
│           State Management             │
│              (Store)                    │
├────────────────────────────────────────┤
│        UI Layer (Ant Design)           │
├────────────────────────────────────────┤
│     Vue 3 + TypeScript + Vite          │
└────────────────────────────────────────┘
```

---

## 目录架构

### 分层结构

```
src/
├── main.ts          # 应用入口
├── App.vue          # 根组件
│
├── components/      # 展示层
│   ├── AppHeader    # 布局
│   ├── AppFooter    # 布局
│   └── HelloWorld    # 示例
│
├── views/          # 页面
│   Home           # 首页
│   问诊
│   医生列表
│   医生详情
│   医生登录
│  医生诊室
│
│ 关于
│
│
├── router/         路由配置
│
├── store/          # 状态
    index          # 全局状态
      doctors   医生数据
      patients    患者
      questions  问题
      currentDoctor 当前医生
      currentPatient 当前患者
    methods:
      loginDoctor()      登录
      verifyPatient()     验证患者
      addQuestion()        添加问题
│
├── data            模拟数据
│   医生列表
│   患者
│   问题列表
└── assets         静态资源
```

---

## 数据流

### 单向数据流

```
┌──────────┐    ┌────────┐    ┌────────┐
│  State   │──▶│ View   │──▶│ Render   │
└──────────┘    └────────┘ ◀─────┘
    Actions      ──┤  ◀──── Template ────┤
                  └────────┘
        用户交互
                    │
                    ▼
              ┌────────┐
              │ Update │
              State
              └────────
```

### Store 数据管理

当前使用响应式对象 + 方法：

```typescript
// 状态定义
const state = reactive<State>({
  doctors: [] as Doctor[],
  patients: [] as Patient[],
  questions: Question[],
  currentDoctor: null,
  currentPatient: null
});

// 数据操作
export const store = {
  state,
  loginDoctor() {...},
  verifyPatient() {...},
  addQuestion()
};
```

---

## 路由架构

### 路由配置

```typescript
const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/consultation', component: Consultation },
  { path: '/consultation/:doctorUsername', component: Consultation },
  { path: '/doctors', component: Doctors },
  { path: '/about', component: About },
  { path: '/doctor/login', component: DoctorLogin },
  { path: '/doctor/room/:username', component: DoctorRoom }
];
```

### 路由结构

```
/                    → Home (首页)
├── consultation    → 问诊入口
│   └── :doctorUsername → 指定医生
├── doctors         → 医生列表
├── about         → 关于
└── doctor
    ├── login      → 医生登录
    └── room/:username → 诊室
```

---

## 状态管理

### 当前方案

使用 Vue 3 Composition API 的 reactive 实现：

```typescript
// 雀离: string, password: string): Doctor | null;
logoutDoctor(): void;
verifyPatient(name: string, birthday: Patient;
addQuestion(
  question: Omit<Question, 'id' | 'submitTime' | 'status' | 'answer' | 'answerTime'>
): Question;
answerQuestion(questionId: string, answer: string): void;
getActiveDoctors(): Doctor[];
getStatistics(): { totalDoctors, totalQuestions, activeSessions, totalSessions };
```

### 数据模型

```typescript
interface State {
  doctors: Doctor[];
  patients: Patient[];
  questions: Question[];
  currentDoctor: Doctor | null;
  currentPatient: Patient | null;
}
```

---

## 组件设计

### 组件层次

```
App (根组件)
├── AppHeader (导航)
│   └── logo + 菜单 + 登录按钮
├── RouterView
│   ├── Home (首页)
│   │   统计卡片 + 医生列表
│   ├── Consultation (问诊)
│   │   认证表单 + 问题列表
│   ├── Doctors (列表)
│   │   医生卡片
│   ┩ DoctorLogin
│   └── DoctorRoom
└── AppFooter
```

### 组件通信

| 方式 | 场景 |
|-----|------|
| props | 父→子 |
| emit | 子→父 |
| provide/inject | 跨层级 |
| store | 全局状态 |

---

## 技术选型理由

### Vue 3 + Composition API

**优势**:
- 更好的 TypeScript 支持
- 逻辑组合复用
- 性能优化

### TypeScript

**收益**:
- 编译时错误检测
- IDE 智能提示
- 代码可维护性

### Vite

**特点**:
- 极速冷启动
- 热模块替换
- 优化的生产构建
- ESM 原生支持

### Ant Design Vue

**选择原因**:
- 企业级组件
- 完善 TypeScript 支持
- 设计一致性
- 活跃社区

---

## 未来架构

### 状态管理升级

当复杂度增加时：

```typescript
// Pinia store
export const useDoctorStore = defineStore('doctor', {
  state: () => ({
    doctors: [] as Doctor[],
    current: null
  }),
  actions: {
    async fetchDoctors() { ... }
  }
});
```

### API 服务层

```typescript
// api/user.ts
export const userApi = {
  login(data: LoginParams) {
    return request.post('/api/users/login', data);
  }
};

// composables/useUser.ts
export function useUser() {
  const loading = ref(false);
  const user = ref<User | null>(null);
  
  async function login(params: LoginParams) {
    loading.value = true;
    user.value = await userApi.login(params);
    loading.value = false;
  }
  
  return { user, login };
}
```

---

## 参考

- [Vue 3 文档](https://vuejs.org/)
- [Vite 指南](https://vitejs.dev/)
- [Ant Design Vue](https://antdv.com/)
- [Vue Router](https://router.vuejs.org/)
