<template>
  <a-layout-header class="header">
    <div class="header-content">
      <div class="logo" @click="navigateTo('/')">
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
      
      <!-- 移动端汉堡包菜单 -->
      <div class="mobile-menu">
        <a-button type="text" class="hamburger-btn" @click="showDrawer">
          <MenuOutlined />
        </a-button>
      </div>
    </div>
    
    <!-- 移动端抽屉菜单 -->
    <a-drawer
      title="菜单"
      placement="right"
      :open="drawerVisible"
      @close="closeDrawer"
      width="250"
      class="mobile-drawer"
    >
      <div class="drawer-content">
        <a-menu mode="vertical" class="drawer-menu" :selectedKeys="selectedKeys">
          <a-menu-item key="home" @click="handleMenuClick('/')">
            <HomeOutlined />
            首页
          </a-menu-item>
          <a-menu-item key="consultation" @click="handleMenuClick('/consultation')">
            <MessageOutlined />
            问诊
          </a-menu-item>
          <a-menu-item key="doctors" @click="handleMenuClick('/doctors')">
            <TeamOutlined />
            医生
          </a-menu-item>
          <a-menu-item key="about" @click="handleMenuClick('/about')">
            <InfoCircleOutlined />
            关于
          </a-menu-item>
        </a-menu>
        <a-button type="primary" class="drawer-login-btn" @click="handleMenuClick('/doctor/login')" block>
          <UserOutlined />
          医生登录
        </a-button>
      </div>
    </a-drawer>
  </a-layout-header>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HomeOutlined, MessageOutlined, TeamOutlined, InfoCircleOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();
const selectedKeys = ref<string[]>(['home']);
const drawerVisible = ref<boolean>(false);

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

const showDrawer = () => {
  drawerVisible.value = true;
};

const closeDrawer = () => {
  drawerVisible.value = false;
};

const handleMenuClick = (path: string) => {
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

/* 桌面端菜单样式 */
.desktop-menu {
  display: flex;
  align-items: center;
  flex: 1;
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

/* 移动端菜单样式 */
.mobile-menu {
  display: none;
}

.hamburger-btn {
  font-size: 18px;
  color: #1890ff;
}

/* 抽屉菜单样式 */
.drawer-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.drawer-menu {
  border: none;
  margin-bottom: 16px;
}

.drawer-login-btn {
  margin-top: auto;
  background: #52c41a;
  border-color: #52c41a;
}

.drawer-login-btn:hover {
  background: #73d13d;
  border-color: #73d13d;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
  
  .header-content {
    padding: 0 16px;
  }
  
  .logo span {
    font-size: 18px;
  }
}

/* iPad 端也使用移动端菜单 */
@media (min-width: 769px) and (max-width: 1024px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
}
</style>
