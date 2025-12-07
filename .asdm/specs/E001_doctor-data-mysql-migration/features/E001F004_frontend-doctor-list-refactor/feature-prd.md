# Feature PRD: 前端医生列表页面改造

**Date**: 2025-12-07  
**Author**: QA Healthcare Team  
**Status**: Draft  
**Parent Epic**: [医生数据MySQL存储迁移](./../epic-prd.md)

## 1. Feature Overview

### 1.1 Feature Description
改造前端医生列表页面，从直接读取本地JSON文件改为通过RESTful API获取医生数据，实现前后端分离架构，同时增加筛选、分页、搜索等增强功能。

### 1.2 Business Value
本功能实现前端架构现代化，提升用户体验和系统性能：
- **架构现代化**: 实现真正的前后端分离架构
- **性能提升**: 通过API获取数据，支持更复杂的数据操作
- **用户体验**: 增加筛选、分页等功能，提升用户查找效率
- **可维护性**: 代码结构更清晰，便于维护和扩展
- **一致性**: 与其他页面保持统一的数据访问方式

### 1.3 User Value
- **患者用户**: 更快找到合适的医生，提升咨询效率
- **医生用户**: 更准确展示医生信息和状态
- **前端开发人员**: 获得更清晰、更易维护的代码结构
- **系统管理员**: 获得更好的系统监控和管理能力

## 2. Relationship to Parent Epic

### 2.1 Epic Objectives Supported
*本功能支持以下史诗目标：*
- **向后兼容**: 保持现有页面功能的完全兼容性
- **性能优化**: 提升医生列表页面加载性能
- **用户体验**: 提供更好的医生查找和筛选体验
- **技术升级**: 实现前端架构现代化

### 2.2 Dependencies on Other Features
*本功能的依赖关系：*
- **E001F002 医生数据RESTful API开发**: 依赖API提供数据
- **E001F003 数据迁移工具开发**: 迁移完成后切换数据源
- **E001F001 数据库设计**: 间接依赖数据库提供数据存储

## 3. User Stories

### 3.1 Target User Personas
- **患者用户**: 查看和筛选医生信息
- **前端开发人员**: 开发和维护医生列表页面
- **UI/UX设计师**: 设计页面交互和视觉效果
- **测试人员**: 测试页面功能和性能

### 3.2 Detailed User Stories
| ID | User Story | Priority | Acceptance Criteria |
|----|------------|----------|-------------------|
| F-US-001 | **作为患者用户**，我希望医生列表页面加载更快，以便快速查看医生信息 | 高 | 1. 页面加载时间< 2秒<br>2. 医生信息显示完整<br>3. 图片加载优化<br>4. 支持懒加载 |
| F-US-002 | **作为患者用户**，我希望能够按科室、职称、在线状态筛选医生，以便找到合适的医生 | 高 | 1. 支持多条件筛选<br>2. 筛选结果实时更新<br>3. 筛选条件可组合<br>4. 筛选响应时间< 1秒 |
| F-US-003 | **作为患者用户**，我希望医生列表支持分页，以便浏览大量医生信息 | 中 | 1. 支持自定义每页数量<br>2. 分页导航清晰易用<br>3. 保持筛选状态<br>4. 快速跳转页面 |
| F-US-004 | **作为前端开发人员**，我希望代码结构清晰，便于维护和扩展 | 高 | 1. 组件化设计<br>2. 状态管理清晰<br>3. API调用封装<br>4. 错误处理完善 |

## 4. Functional Requirements

### 4.1 Core Functionality
*页面核心功能：*
- **数据获取**: 通过API获取医生列表数据
- **数据展示**: 以卡片形式展示医生信息
- **筛选功能**: 支持多条件医生筛选
- **分页功能**: 支持数据分页展示
- **搜索功能**: 支持医生姓名搜索
- **排序功能**: 支持按不同字段排序

### 4.2 User Interactions
*用户交互流程：*
- **页面加载**: 自动加载医生列表数据
- **筛选操作**: 用户选择筛选条件，实时更新列表
- **分页操作**: 用户切换页面，加载对应数据
- **医生选择**: 点击医生卡片进入咨询页面
- **错误处理**: 网络错误或数据异常时的用户提示

### 4.3 Data Requirements
*数据管理要求：*
- **数据缓存**: 合理的数据缓存策略
- **数据更新**: 医生状态实时更新机制
- **错误处理**: 数据加载失败的处理机制
- **性能优化**: 数据加载的性能优化策略

## 5. Non-Functional Requirements

### 5.1 Performance Requirements
| Requirement | Target | Measurement |
|-------------|--------|-------------|
| **页面加载时间** | < 2秒 | Lighthouse测试 |
| **筛选响应时间** | < 1秒 | 用户操作测试 |
| **API调用时间** | < 500ms | 网络监控 |
| **内存使用** | < 100MB | 浏览器性能监控 |

### 5.2 UX Requirements
*用户体验要求：*
- **响应式设计**: 支持桌面、平板、手机多种设备
- **加载状态**: 数据加载时的加载状态提示
- **错误提示**: 友好的错误提示和恢复建议
- **交互反馈**: 用户操作的即时视觉反馈
- **无障碍访问**: 支持屏幕阅读器和键盘导航

### 5.3 Compatibility Requirements
*兼容性要求：*
- **浏览器兼容**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **设备兼容**: 支持主流移动设备和桌面设备
- **网络兼容**: 支持不同网络环境下的优雅降级
- **API兼容**: 与后端API版本兼容

## 6. UI/UX Specifications

### 6.1 Page Layout Design
*页面布局设计：*

**桌面端布局：**
```
┌─────────────────────────────────────────────────────┐
│                   页面头部 (Header)                   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┐  ┌─────────────────────────────┐  │
│  │             │  │                             │  │
│  │   筛选面板   │  │       医生卡片网格           │  │
│  │             │  │                             │  │
│  │  • 科室筛选  │  │  ┌─────┐ ┌─────┐ ┌─────┐   │  │
│  │  • 职称筛选  │  │  │医生 │ │医生 │ │医生 │   │  │
│  │  • 状态筛选  │  │  │卡片 │ │卡片 │ │卡片 │   │  │
│  │  • 专长筛选  │  │  └─────┘ └─────┘ └─────┘   │  │
│  │  • 搜索框    │  │  ┌─────┐ ┌─────┐ ┌─────┐   │  │
│  │             │  │  │医生 │ │医生 │ │医生 │   │  │
│  └─────────────┘  │  │卡片 │ │卡片 │ │卡片 │   │  │
│                   │  └─────┘ └─────┘ └─────┘   │  │
│                   │                             │  │
│                   └─────────────────────────────┘  │
│                                                     │
│                   ┌─────────────────┐               │
│                   │    分页控件      │               │
│                   └─────────────────┘               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**移动端布局：**
```
┌─────────────────────────────────────┐
│           页面头部 (Header)           │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐   │
│  │        筛选条件展开按钮        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │       医生卡片列表            │   │
│  │                             │   │
│  │  ┌─────────────────────┐   │   │
│  │  │      医生卡片        │   │   │
│  │  └─────────────────────┘   │   │
│  │  ┌─────────────────────┐   │   │
│  │  │      医生卡片        │   │   │
│  │  └─────────────────────┘   │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │        分页控件              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

### 6.2 Component Design
*组件设计规范：*

**医生卡片组件 (DoctorCard.vue)：**
```vue
<template>
  <a-card class="doctor-card" :class="{ 'active': doctor.isActive }">
    <div class="card-header">
      <img :src="doctor.avatar" :alt="doctor.name" class="doctor-avatar" />
      <a-badge
        :status="doctor.isActive ? 'processing' : 'default'"
        :text="doctor.isActive ? '在线' : '离线'"
      />
    </div>
    <div class="card-body">
      <h3>{{ doctor.name }}</h3>
      <p class="doctor-title">{{ doctor.title }}</p>
      <p class="doctor-department">{{ doctor.department }}</p>
      <p class="doctor-experience">{{ doctor.experience }}</p>
      <div class="doctor-specialties">
        <a-tag v-for="specialty in doctor.specialties" :key="specialty" color="blue">
          {{ specialty }}
        </a-tag>
      </div>
    </div>
    <div class="card-footer">
      <a-button
        type="primary"
        block
        :disabled="!doctor.isActive"
        @click="handleConsultationClick"
      >
        {{ doctor.isActive ? '进入诊室' : '暂未开放' }}
      </a-button>
    </div>
  </a-card>
</template>
```

**筛选面板组件 (FilterPanel.vue)：**
```vue
<template>
  <div class="filter-panel">
    <div class="filter-section">
      <h4>科室</h4>
      <a-select
        v-model:value="selectedDepartment"
        placeholder="选择科室"
        :options="departmentOptions"
        allow-clear
        @change="handleFilterChange"
      />
    </div>
    
    <div class="filter-section">
      <h4>职称</h4>
      <a-select
        v-model:value="selectedTitle"
        placeholder="选择职称"
        :options="titleOptions"
        allow-clear
        @change="handleFilterChange"
      />
    </div>
    
    <div class="filter-section">
      <h4>在线状态</h4>
      <a-radio-group v-model:value="selectedStatus" @change="handleFilterChange">
        <a-radio value="all">全部</a-radio>
        <a-radio value="online">在线</a-radio>
        <a-radio value="offline">离线</a-radio>
      </a-radio-group>
    </div>
    
    <div class="filter-section">
      <h4>搜索医生</h4>
      <a-input-search
        v-model:value="searchKeyword"
        placeholder="输入医生姓名"
        @search="handleSearch"
      />
    </div>
    
    <a-button type="link" @click="handleResetFilters">重置筛选</a-button>
  </div>
</template>
```

## 7. Technical Specifications

### 7.1 Architecture Impact
*前端架构调整：*

**当前架构：**
```typescript
// 当前直接从store读取JSON数据
const allDoctors = computed(() => store.state.doctors);
```

**改造后架构：**
```typescript
// 通过API服务获取数据
const { doctors, loading, error, pagination } = useDoctorApi();
```

**API服务层：**
```typescript
// src/services/doctorService.ts
import axios from 'axios';

export interface Doctor {
  id: string;
  username: string;
  name: string;
  title: string;
  department: string;
  avatar: string;
  experience: string;
  specialties: string[];
  isActive: boolean;
}

export interface Pagination {
  page: number;
  size: number;
  total: number;
  totalPages: number;
}

export interface FilterParams {
  department?: string;
  title?: string;
  isActive?: boolean;
  specialty?: string;
  search?: string;
  page?: number;
  size?: number;
  sort?: string;
}

class DoctorService {
  private baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
  
  async getDoctors(params: FilterParams = {}): Promise<{
    content: Doctor[];
    pagination: Pagination;
  }> {
    const response = await axios.get(`${this.baseURL}/api/v1/doctors`, {
      params: {
        page: params.page || 0,
        size: params.size || 12,
        department: params.department,
        title: params.title,
        isActive: params.isActive,
        specialty: params.specialty,
        search: params.search,
        sort: params.sort || 'name,asc'
      }
    });
    
    return {
      content: response.data.content,
      pagination: {
        page: response.data.page.number,
        size: response.data.page.size,
        total: response.data.page.totalElements,
        totalPages: response.data.page.totalPages
      }
    };
  }
  
  async getDoctorById(id: string): Promise<Doctor> {
    const response = await axios.get(`${this.baseURL}/api/v1/doctors/${id}`);
    return response.data;
  }
  
  async getDoctorByUsername(username: string): Promise<Doctor> {
    const response = await axios.get(`${this.baseURL}/api/v1/doctors/by-username/${username}`);
    return response.data;
  }
}

export const doctorService = new DoctorService();
```

**Composition API Hook：**
```typescript
// src/composables/useDoctors.ts
import { ref, computed, watch } from 'vue';
import { doctorService, type Doctor, type FilterParams, type Pagination } from '@/services/doctorService';

export function useDoctors(initialParams: FilterParams = {}) {
  const doctors = ref<Doctor[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const pagination = ref<Pagination>({
    page: 0,
    size: 12,
    total: 0,
    totalPages: 0
  });
  
  const filterParams = ref<FilterParams>({
    page: 0,
    size: 12,
    ...initialParams
  });
  
  const fetchDoctors = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await doctorService.getDoctors(filterParams.value);
      doctors.value = result.content;
      pagination.value = result.pagination;
    } catch (err) {
      error.value = err instanceof Error ? err.message : '获取医生数据失败';
      console.error('Failed to fetch doctors:', err);
    } finally {
      loading.value = false;
    }
  };
  
  const updateFilters = (newParams: Partial<FilterParams>) => {
    filterParams.value = {
      ...filterParams.value,
      ...newParams,
      page: 0 // 重置到第一页
    };
  };
  
  const resetFilters = () => {
    filterParams.value = {
      page: 0,
      size: 12
    };
  };
  
  const changePage = (page: number) => {
    filterParams.value.page = page;
  };
  
  // 监听筛选参数变化，自动重新获取数据
  watch(filterParams, fetchDoctors, { deep: true });
  
  // 初始化时获取数据
  fetchDoctors();
  
  return {
    doctors,
    loading,
    error,
    pagination,
    filterParams,
    fetchDoctors,
    updateFilters,
    resetFilters,
    changePage
  };
}
```

### 7.2 Store Integration
*Store集成改造：*

**当前Store改造：**
```typescript
// src/store/index.ts (改造后)
import { reactive } from 'vue';
import { doctorService, type Doctor } from '@/services/doctorService';

export interface State {
  doctors: Doctor[];
  // ... 其他状态保持不变
}

const state = reactive<State>({
  doctors: [], // 不再从JSON文件加载
  // ... 其他状态
});

export const store = {
  state,
  
  // 新增方法：从API加载医生数据
  async loadDoctors() {
    try {
      const result = await doctorService.getDoctors();
      state.doctors = result.content;
    } catch (error) {
      console.error('Failed to load doctors from API:', error);
      // 可以在这里添加降级逻辑，比如加载本地JSON
    }
  },
  
  // 其他方法保持不变或相应调整
  // ...
};
```

## 8. Testing Requirements

### 8.1 Test Scenarios
*前端测试场景：*
- **功能测试**: 验证页面基本功能正常
- **API集成测试**: 验证API调用和数据展示
- **筛选功能测试**: 验证筛选条件组合和结果
- **分页功能测试**: 验证分页导航和数据加载
- **错误处理测试**: 验证网络错误和异常处理
- **性能测试**: 验证页面加载和交互性能

### 8.2 Acceptance Test Criteria
*验收测试标准：*
- **功能完整性**: 所有页面功能完整实现
- **API集成**: 成功集成后端API
- **性能达标**: 页面加载时间< 2秒
- **用户体验**: 筛选、分页等功能流畅易用
- **兼容性**: 主流浏览器和设备兼容

### 8.3 Quality Gates
*质量门禁：*
- **代码规范**: 代码符合团队编码规范
- **测试覆盖**: 关键功能测试覆盖率>80%
- **性能测试**: 性能测试结果达标
- **代码审查**: 通过团队代码审查

## 9. Deployment Requirements

### 9.1 Deployment Strategy
*前端部署策略：*
- **独立部署**: 前端独立部署，通过API与后端通信
- **环境配置**: 支持多环境API端点配置
- **版本管理**: 前端版本与API版本兼容管理
- **监控集成**: 集成前端性能监控

### 9.2 Rollback Plan
*回滚计划：*
- **功能回滚**: 新功能有问题时回滚到旧版本
- **数据源回滚**: API不可用时回退到JSON数据源
- **配置回滚**: 环境配置错误时回滚配置

## 10. Success Metrics

### 10.1 Feature-specific Metrics
| Metric | Target | Measurement Frequency |
|--------|--------|---------------------|
| **页面加载时间** | < 2秒 | 实时监控 |
| **筛选响应时间** | < 1秒 | 用户操作测试 |
| **API调用成功率** | 99.9% | 实时监控 |
| **用户满意度** | > 90% | 用户反馈收集 |

### 10.2 Business Metrics
*业务指标：*
- **页面跳出率**: 降低>10%
- **用户停留时间**: 增加>15%
- **咨询转化率**: 提升>5%
- **错误报告**: 减少>20%

## 11. Risks and Mitigations

### 11.1 Technical Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **API不可用** | 中 | 高 | 1. 降级方案（回退JSON）<br>2. 错误重试机制<br>3. 缓存策略<br>4. 用户友好提示 |
| **性能下降** | 低 | 中 | 1. 性能测试和优化<br>2. 懒加载和分页<br>3. 图片优化<br>4. 代码分割 |
| **浏览器兼容性问题** | 低 | 低 | 1. 多浏览器测试<br>2. 渐进增强策略<br>3. Polyfill支持 |

### 11.2 Integration Risks
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **API接口变更** | 中 | 高 | 1. 接口版本管理<br>2. 充分的沟通协调<br>3. 兼容性测试<br>4. 文档同步 |
| **数据格式不一致** | 低 | 中 | 1. 数据验证和转换<br>2. 错误处理机制<br>3. 数据映射文档 |

## 12. Timeline

### 12.1 Development Timeline
| Phase | Duration | Start Date | End Date | Deliverables |
|-------|----------|------------|----------|--------------|
| **API服务层开发** | 2天 | 2026-01-08 | 2026-01-09 | API服务封装、类型定义 |
| **页面组件改造** | 3天 | 2026-01-10 | 2026-01-12 | 医生列表页面改造 |
| **筛选分页功能** | 3天 | 2026-01-13 | 2026-01-15 | 筛选面板、分页组件 |
| **测试和优化** | 2天 | 2026-01-16 | 2026-01-17 | 测试报告、性能优化 |

### 12.2 Dependencies Timeline
*依赖时间线：*
- **E001F002 API开发**: 需要在2026-01-07前完成并提供测试环境
- **设计资源**: 需要在2026-01-09前提供设计稿
- **测试数据**: 需要在2026-01-10前准备测试数据

## 13. Appendix

### 13.1 References
- **Parent Epic PRD**: [医生数据MySQL存储迁移](./../epic-prd.md)
- **API开发PRD**: [E001F002医生数据RESTful API开发](../E001F002_doctor-restful-api/feature-prd.md)
- **当前医生列表页面**: [Doctors.vue](../../../../web/qa-web/src/views/Doctors.vue)
- **Vue 3文档**: [官方文档](https://vuejs.org/)
- **Ant Design Vue文档**: [官方文档](https://www.antdv.com/)

### 13.2 Glossary
| Term | Definition |
|------|------------|
| **Composition API** | Vue 3的组件逻辑组织方式 |
| **响应式编程** | 数据变化自动更新UI的编程范式 |
| **API服务层** | 封装API调用的服务层 |
- **组件化** | 将UI拆分为独立可复用的组件 |
| **状态管理** | 管理应用状态和数据流的机制 |

### 13.3 Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-07 | QA Healthcare Team | 初始草案 |
| 1.1 | 2025-12-07 | QA Healthcare Team | 完善技术实现细节 |