<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="sidebar">
      <div class="logo">aircraft Maintain</div>
      <el-menu router>
        <el-menu-item
          v-for="item in showMenus"
          :key="item.path"
          :index="item.path"
        >
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧 -->
    <div class="layout-main">
      <!-- 顶部 -->
      <div class="header">
        <div class="header-left">{{ pageTitle }}</div>
        <div class="header-right">
          <el-dropdown>
            <span class="dropdown-link"> Admin ▼</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item divided @click="handleLogout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "@/store/modules/user";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter, useRoute } from "vue-router";

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const pageTitle = computed(() => {
  return route.meta.title || "工作台";
});
const menus = [
  {
    title: "工作台",
    path: "/",
    roles: ["admin"],
  },
  {
    title: "任务管理",
    path: "/task/list",
    roles: ["admin", "worker"],
  },

  {
    title: "工具管理",
    path: "/tool/list",
    roles: ["admin", "toolDist"],
  },

  {
    title: "物料管理",
    path: "/material/list",
    roles: ["admin", "materialsDist"],
  },

  {
    title: "用户管理",
    path: "/user/list",
    roles: ["admin"],
  },
];
const handleLogout = async () => {
  try {
    // 二次确认
    await ElMessageBox.confirm("确认退出当前账号吗？", "退出登录", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });

    // 清空本地数据
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");

    ElMessage.success("退出成功");

    // 跳转登录页
    router.push("/login");
  } catch (error) {
    console.log(error);
  }
};
// 当前角色
const role = computed(() => userStore.userInfo?.role || "");

// 当前用户能看到的菜单
const showMenus = computed(() => {
  const roleVal = role.value;
  if (!roleVal) return [];
  return menus.filter((item) => item.roles.includes(roleVal));
});
</script>
<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
}
/* 左侧菜单 */
.sidebar {
  width: 220px;
  background: #001529;
  color: white;
}
/* 右侧区域 */
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
/* 顶部 */
.header {
  height: 60px;
  background: white;
  border-bottom: 1px solid #ebeef5;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}
.header-left {
  font-size: 18px;
  font-weight: 600;
}
.header-right {
  cursor: pointer;
}
.dropdown-link {
  display: flex;
  align-items: center;

  cursor: pointer;

  height: 60px;
}
/* 内容区域 */
.main-content {
  flex: 1;
  background: #f5f7fa;
  padding: 20px;

  overflow-y: auto;
}
.logo {
  height: 60px;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 18px;
  font-weight: bold;

  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
