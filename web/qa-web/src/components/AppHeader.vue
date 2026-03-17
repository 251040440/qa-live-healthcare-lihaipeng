<template>
  <a-layout-header class="header">
    <div class="header-content">
      <div class="logo">
        <img src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=100" alt="QA Live Healthcare" />
        <span>QA Live Healthcare</span>
      </div>
      
      <!-- 桌面端菜单 -->
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" class="nav-menu desktop-menu">
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
      <a-button type="primary" class="login-btn desktop-login" @click="navigateTo('/doctor/login')">
        <UserOutlined />
        医生登录
      </a-button>
      
      <!-- 移动端汉堡包按钮 -->
      <div class="mobile-menu-btn" @click="toggleDrawer">
        <MenuOutlined v-if="!drawerVisible" />
        <CloseOutlined v-else />
      </div>
    </div>
    
    <!-- 移动端抽屉菜单 -->
    <a-drawer
      v-model:open="drawerVisible"
      placement="right"
      :closable="false"
      :width="280"
      class="mobile-drawer"
    >
      <div class="drawer-content">
        <div class="drawer-header">
          <span class="drawer-title">菜单</span>
          <CloseOutlined @click="closeDrawer" class="close-icon" />
        </div>
        
        <div class="drawer-menu">
          <div 
            class="menu-item" 
            :class="{ active: selectedKeys.includes('home') }"
            @click="handleMenuItemClick('/')"
          >
            <HomeOutlined />
            <span>首页</span>
          </div>
          <div 
            class="menu-item" 
            :class="{ active: selectedKeys.includes('consultation') }"
            @click="handleMenuItemClick('/consultation')"
          >
            <MessageOutlined />
            <span>问诊</span>
          </div>
          <div 
            class="menu-item" 
            :class="{ active: selectedKeys.includes('doctors') }"
            @click="handleMenuItemClick('/doctors')"
          >
            <TeamOutlined />
            <span>医生</span>
          </div>
          <div 
            class="menu-item" 
            :class="{ active: selectedKeys.includes('about') }"
            @click="handleMenuItemClick('/about')"
          >
            <InfoCircleOutlined />
            <span>关于</span>
          </div>
          
          <div class="menu-divider"></div>
          
          <a-button type="primary" class="drawer-login-btn" @click="handleMenuItemClick('/doctor/login')">
            <UserOutlined />
            医生登录
          </a-button>
        </div>
      </div>
    </a-drawer>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeOutlined, MessageOutlined, TeamOutlined, InfoCircleOutlined, UserOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>(['home']);
const drawerVisible = ref(false);

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

const toggleDrawer = () => {
  drawerVisible.value = !drawerVisible.value;
};

const closeDrawer = () => {
  drawerVisible.value = false;
};

const handleMenuItemClick = (path: string) => {
  navigateTo(path);
  closeDrawer();
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

/* 桌面端样式 */
.desktop-menu,
.desktop-login {
  display: flex;
}

.mobile-menu-btn {
  display: none;
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s;
}

.mobile-menu-btn:hover {
  color: #1890ff;
}

/* 移动端抽屉样式 */
.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;
}

.drawer-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
}

.close-icon {
  font-size: 18px;
  color: #8c8c8c;
  cursor: pointer;
  transition: color 0.3s;
}

.close-icon:hover {
  color: #1890ff;
}

.drawer-menu {
  flex: 1;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 4px 0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  color: #595959;
  font-size: 15px;
}

.menu-item:hover {
  background: #f5f5f5;
  color: #1890ff;
}

.menu-item.active {
  background: #e6f7ff;
  color: #1890ff;
  font-weight: 500;
}

.menu-item :deep(.anticon) {
  font-size: 16px;
}

.menu-divider {
  height: 1px;
  background: #f0f0f0;
  margin: 16px 0;
}

.drawer-login-btn {
  width: 100%;
  height: 40px;
  background: #52c41a;
  border-color: #52c41a;
  margin-top: 8px;
}

.drawer-login-btn:hover {
  background: #73d13d;
  border-color: #73d13d;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .desktop-menu,
  .desktop-login {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .header-content {
    padding: 0 16px;
  }
  
  .logo img {
    height: 32px;
    width: 32px;
  }
  
  .logo span {
    font-size: 16px;
  }
}
</style>
