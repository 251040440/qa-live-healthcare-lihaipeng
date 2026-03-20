# 编码规范文档

本文档定义前端项目的编码规范和最佳实践。

## 目录

- [TypeScript 规范](#typescript-规范)
- [Vue 组件规范](#vue-组件规范)
- [样式规范](#样式规范)
- [命名规范](#命名规范)
- [项目配置规范](#项目配置规范)
- [最佳实践](#最佳实践)

---

## TypeScript 规范

### 基本配置

项目使用 TypeScript 5.5.3，配置严格模式：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 类型定义

**优先使用 interface 定义对象类型**：

```typescript
// ✅ 推荐
interface Doctor {
  id: string;
  name: string;
  department: string;
}

// ✅ 需要联合类型或交叉类型时使用 type
type Status = 'pending' | 'answered';
type QuestionBase = Omit<Question, 'id' | 'submitTime'>;
```

**避免使用 any**：

```typescript
// ❌ 不推荐
function processData(data: any) {
  return data;
}

// ✅ 推荐
function processData<T>(data: T): T {
  return data;
}

// 或使用 unknown
function processData(data: unknown) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
}
```

**导出类型**：

```typescript
// ✅ 导出接口供其他模块使用
export interface Question {
  id: string;
  question: string;
  status: 'pending' | 'answered';
}

// ✅ 使用 type 定义联合类型
export type QuestionStatus = 'pending' | 'answered';
```

### 类型断言

谨慎使用类型断言，优先使用类型守卫：

```typescript
// ❌ 不推荐
const doctor = data as Doctor;

// ✅ 推荐 - 使用类型守卫
function isDoctor(obj: unknown): obj is Doctor {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}

if (isDoctor(data)) {
  // 此时 data 被推断为 Doctor 类型
}
```

---

## Vue 组件规范

### 组件结构

使用 `<script setup>` 语法糖，推荐顺序：script → template → style

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Props 定义
const props = defineProps<{
  title: string;
  count?: number;
}>();

// Emits 定义
const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'close'): void;
}>();

// 响应式状态
const loading = ref(false);
const data = ref<Question[]>([]);

// 计算属性
const filteredData = computed(() => 
  data.value.filter(item => item.status === 'pending')
);

// 方法
const handleSubmit = () => {
  emit('update', props.count ?? 0 + 1);
};

// 生命周期
onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="component-name">
    <!-- 模板内容 -->
  </div>
</template>

<style scoped>
.component-name {
  /* 样式 */
}
</style>
```

### Props 定义

使用 TypeScript 定义 props：

```typescript
// ✅ 推荐 - 使用泛型
const props = defineProps<{
  title: string;
  count?: number;
}>();

// ✅ 带默认值
const props = withDefaults(defineProps<{
  title: string;
  count?: number;
}>(), {
  count: 0
});
```

### Emits 定义

使用类型化的 emits：

```typescript
// ✅ 推荐
const emit = defineEmits<{
  (e: 'update', value: number): void;
  (e: 'close'): void;
}>();
```

### 响应式数据

```typescript
// ✅ 基本类型使用 ref
const count = ref(0);
const name = ref<string>('');

// ✅ 对象类型使用 reactive
const state = reactive({
  doctors: [] as Doctor[],
  loading: false,
});

// ✅ 计算属性
const activeDoctors = computed(() => 
  state.doctors.filter(d => d.isActive)
);
```

### 组合式函数

抽取可复用逻辑：

```typescript
// useAsync.ts
import { ref, Ref } from 'vue';

export function useAsync<T>(
  asyncFn: () => Promise<T>
): {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  execute: () => Promise<void>;
} {
  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const execute = async () => {
    loading.value = true;
    error.value = null;
    try {
      data.value = await asyncFn();
    } catch (e) {
      error.value = e as Error;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
```

---

## 样式规范

### Scoped 样式

组件样式使用 `scoped` 避免污染：

```vue
<style scoped>
.container {
  padding: 24px;
}

.title {
  font-size: 24px;
  color: #333;
}
</style>
```

### CSS 类命名

使用 kebab-case 命名：

```css
/* ✅ 推荐 */
.page-header { }
.question-list { }
.doctor-card { }

/* ❌ 不推荐 */
.pageHeader { }
.questionList { }
```

### 全局样式

全局样式定义在 `src/style.css`：

```css
:root {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

### Ant Design Vue 样式覆盖

使用 `:deep()` 选择器覆盖组件库样式：

```vue
<style scoped>
:deep(.ant-btn-primary) {
  background: #52c41a;
  border-color: #52c41a;
}
</style>
```

---

## 命名规范

### 文件命名

| 类型 | 命名方式 | 示例 |
|------|----------|------|
| Vue 组件 | PascalCase | `AppHeader.vue` |
| TypeScript | camelCase | `main.ts` |
| JSON | kebab-case | `doctor-user-list.json` |
| 配置文件 | 小写.扩展名 | `vite.config.ts` |

### 变量命名

```typescript
// ✅ 布尔值使用 is/has 前缀
const isActive = ref(true);
const hasPermission = ref(false);

// ✅ 数组使用复数或 List 后缀
const doctors = ref<Doctor[]>([]);
const questionList = ref<Question[]>([]);

// ✅ 函数使用动词开头
const fetchData = () => {};
const handleSubmit = () => {};
const validateForm = () => {};

// ✅ 常量使用大写蛇形
const API_BASE_URL = 'http://localhost:8080';
const MAX_RETRY_COUNT = 3;
```

### 组件命名

```typescript
// ✅ 单文件组件使用 PascalCase
import AppHeader from './components/AppHeader.vue';

// ✅ 注册时使用 kebab-case
app.component('app-header', AppHeader);
```

---

## 项目配置规范

### 导入顺序

```typescript
// 1. Vue 核心
import { ref, computed, onMounted } from 'vue';

// 2. 第三方库
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import dayjs from 'dayjs';

// 3. 本地模块（使用别名或相对路径）
import { store } from '../store';
import type { Doctor } from '../types';
```

### 环境变量

创建 `.env` 文件：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:8080

# .env.production
VITE_API_BASE_URL=https://api.example.com
```

使用环境变量：

```typescript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## 最佳实践

### 错误处理

```typescript
// ✅ 异步错误处理
const fetchData = async () => {
  try {
    loading.value = true;
    const response = await api.getData();
    data.value = response.data;
  } catch (error) {
    console.error('获取数据失败:', error);
    message.error('获取数据失败，请稍后重试');
  } finally {
    loading.value = false;
  }
};
```

### 避免内存泄漏

```typescript
import { onUnmounted } from 'vue';

// ✅ 清理定时器
let timer: number | null = null;

onMounted(() => {
  timer = setInterval(() => {
    // do something
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
```

### 性能优化

```typescript
import { computed, shallowRef } from 'vue';

// ✅ 大对象使用 shallowRef
const bigData = shallowRef<LargeObject>({});

// ✅ 复杂计算使用 computed 缓存
const filteredList = computed(() => {
  return list.value.filter(item => item.active);
});
```

### 代码注释

```typescript
/**
 * 验证患者身份
 * @param name - 患者姓名
 * @param birthday - 患者生日 (YYYY-MM-DD)
 * @returns 患者信息对象
 */
const verifyPatient = (name: string, birthday: string): Patient => {
  // 实现逻辑
};
```

---

## 代码检查

项目建议配置 ESLint 和 Prettier：

```json
// .eslintrc.json (推荐配置)
{
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-typescript"
  ],
  "rules": {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

---

## 参考资源

- [Vue.js 风格指南](https://cn.vuejs.org/style-guide/)
- [TypeScript 最佳实践](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Ant Design Vue 文档](https://antdv.com/docs/vue/introduction-to-vue)

