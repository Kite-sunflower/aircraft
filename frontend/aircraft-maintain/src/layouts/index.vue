<template>
  <div class="layout-container">
    <!-- 左侧菜单 -->
    <div class="sidebar">
      <div class="logo">aircraft Maintain</div>
      <el-menu
        router
        background-color="#001529"
        text-color="#fff"
        active-text-color="#409EFF"
        default-active="/"
      >
        <el-menu-item index="/">工作台</el-menu-item>
        <el-menu-item index="/task/list"> 任务中心</el-menu-item>
        <el-menu-item index="/tool/list">工具中心 </el-menu-item>
        <el-menu-item index="/material/list">物料中心 </el-menu-item>
        <el-menu-item index="/user/list">用户权限 </el-menu-item>
        <el-menu-item index="/system">系统设置 </el-menu-item>
      </el-menu>
    </div>

    <!-- 右侧 -->
    <div class="layout-main">
      <!-- 顶部 -->
      <div class="header">
        <div class="header-left">工作台</div>
        <div class="header-right">
          <el-dropdown>
            <span class="dropdown-link"> Admin ▼</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item> 个人中心 </el-dropdown-item>
                <el-dropdown-item> 修改密码 </el-dropdown-item>
                <el-dropdown-item divided> 退出登录 </el-dropdown-item>
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
