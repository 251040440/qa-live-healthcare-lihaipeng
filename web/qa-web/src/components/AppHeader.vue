<template>
  <a-layout-header class="header">
    <div class="header-content">
      <div class="logo">
        <img src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=100" alt="QA Live Healthcare" />
        <span>QA Live Healthcare</span>
      </div>
      
      <!-- 桌面端菜单 -->
      <div class="desktop-menu">
        <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" class="nav-menu">
          <a-menu-item key="home" @click="navigateTo('/')">
            <HomeOutlined />
            首页
          </a-menu-item>
          <a-menu-item key="consultation" @click="navigateTo('/consultation')">
            <MessageOutlined />
            问诊
          </a-menu-item>
          <a-menu-item key="doctors" @click="navigateTo('/doctors')">
            <TeamOutlined />
            医生
          </a-menu-item>
          <a-menu-item key="about" @click="navigateTo('/about')">
            <InfoCircleOutlined />
            关于
          </a-menu-item>
        </a-menu>
        <a-button type="primary" class="login-btn" @click="navigateTo('/doctor/login')">
          <UserOutlined />
          医生登录
        </a-button>
      </div>

      <!-- 移动端汉堡包菜单按钮 -->
      <div class="mobile-menu-trigger">
        <a-button type="text" @click="showMobileMenu = true">
          <MenuOutlined />
        </a-button>
      </div>

      <!-- 移动端汉堡包菜单抽屉 -->
      <a-drawer
        v-model:open="showMobileMenu"
        placement="right"
        :closable="false"
        :width="280"
        class="mobile-menu-drawer"
      >
        <template #title>
          <div class="drawer-header">
            <span class="drawer-title">菜单</span>
            <a-button type="text" @click="showMobileMenu = false" class="close-btn">
              <CloseOutlined />
            </a-button>
          </div>
        </template>
        
        <div class="mobile-menu-content">
          <div class="menu-item" @click="navigateAndClose('/')">
            <HomeOutlined />
            <span>首页</span>
          </div>
          <div class="menu-item" @click="navigateAndClose('/consultation')">
            <MessageOutlined />
            <span>问诊</span>
          </div>
          <div class="menu-item" @click="navigateAndClose('/doctors')">
            <TeamOutlined />
            <span>医生</span>
          </div>
          <div class="menu-item" @click="navigateAndClose('/about')">
            <InfoCircleOutlined />
            <span>关于</span>
          </div>
          <div class="menu-item login-item" @click="navigateAndClose('/doctor/login')">
            <a-button type="primary" class="mobile-login-btn">
              <UserOutlined />
              医生登录
            </a-button>
          </div>
        </div>
      </a-drawer>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeOutlined, MessageOutlined, TeamOutlined, InfoCircleOutlined, UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>(['home']);
const showMobileMenu = ref(false);

watch(() => route.path, (newPath) => {
  if (newPath === '/') {
    selectedKeys.value = ['home'];
  } else if (newPath.startsWith('/consultation')) {
    selectedKeys.value = ['consultation'];
  } else if (newPath.startsWith('/doctors')) {
    selectedKeys.value = ['doctors'];
  } else if (newPath.startsWith('/about')) {
    selectedKeys.value = ['about'];
  }
}, { immediate: true });

const navigateTo = (path: string) => {
  router.push(path);
};

const navigateAndClose = (path: string) => {
  router.push(path);
  showMobileMenu.value = false;
};
</script>

<style scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 0;
  height: 64px;
  line-height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo img {
  height: 40px;
  width: 40px;
  border-radius: 8px;
  object-fit: cover;
}

.logo span {
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
}

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 24px;
  flex: 1;
  justify-content: flex-end;
}

.nav-menu {
  flex: 1;
  border: none;
  margin: 0 40px;
  line-height: 64px;
}

.login-btn {
  background: #52c41a;
  border-color: #52c41a;
}

.login-btn:hover {
  background: #73d13d;
  border-color: #73d13d;
}

/* 移动端菜单按钮 */
.mobile-menu-trigger {
  display: none;
}

/* 移动端菜单内容 */
.mobile-menu-drawer :deep(.ant-drawer-header) {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 24px;
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.drawer-title {
  font-size: 16px;
  font-weight: 500;
  color: #262626;
}

.close-btn {
  color: #8c8c8c;
}

.close-btn:hover {
  color: #262626;
}

.mobile-menu-content {
  padding: 24px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: #262626;
  font-size: 14px;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-item.login-item {
  margin-top: 16px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.mobile-login-btn {
  width: 100%;
  background: #52c41a;
  border-color: #52c41a;
}

.mobile-login-btn:hover {
  background: #73d13d;
  border-color: #73d13d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu-trigger {
    display: block;
  }
  
  .header-content {
    padding: 0 16px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu-trigger {
    display: block;
  }
  
  .header-content {
    padding: 0 20px;
  }
}
</style>
