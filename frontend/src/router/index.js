import { createRouter, createWebHashHistory } from "vue-router";
import { ElMessage } from "element-plus";
import Layout from "@/layouts/index.vue";

import { useUserStore } from "@/store/modules/user";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "工作台",
          roles: ["admin", "worker", "toolManager", "materialManager"],
        },
      },

      {
        path: "task/list",
        name: "TaskList",
        component: () => import("@/views/task/list.vue"),
        meta: {
          title: "任务管理",
          roles: ["admin", "worker"],
        },
      },
      {
        path: "task/detail/:id",
        name: "TaskDetail",
        component: () => import("@/views/task/detail.vue"),
        meta: {
          title: "任务详情",
        },
      },
      {
        path: "task/assign/:id",
        name: "TaskAssign",
        component: () => import("@/views/task/assign.vue"),
        meta: {
          title: "任务分配",
        },
      },
      {
        path: "tool/list",
        name: "ToolList",
        component: () => import("@/views/tool/list.vue"),
        meta: {
          title: "工具管理",
          roles: ["admin", "toolManager"],
        },
      },
      {
        path: "tool/toolRecords/:id",
        name: "ToolRecords",
        component: () => import("@/views/tool/toolRecords.vue"),
        meta: {
          title: "工具记录详情",
        },
      },
      {
        path: "tool/borrow/:id",
        name: "ToolBorrow",
        component: () => import("@/views/tool/borrow.vue"),
        meta: {
          title: "借用工具",
        },
      },
      {
        path: "tool/return/:id",
        name: "ToolReturn",
        component: () => import("@/views/tool/return.vue"),
        meta: {
          title: "归还工具",
        },
      },
      {
        path: "user/list",
        name: "UserList",
        component: () => import("@/views/user/list.vue"),
        meta: {
          title: "用户管理",
          roles: ["admin"],
        },
      },
      {
        path: "material/list",
        name: "MaterialList",
        component: () => import("@/views/material/list.vue"),
        meta: {
          title: "物料管理",
          roles: ["admin", "materialManager"],
        },
      },
      {
        path: "material/materialRecords/:id",
        name: "MaterialRecords",
        component: () => import("@/views/material/materialRecords.vue"),
        meta: {
          title: "物料记录详情",
        },
      },
      {
        path: "material/assign/:id",
        name: "MaterialAssign",
        component: () => import("@/views/material/assign.vue"),
        meta: {
          title: "发送物料",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 路由前置守卫
router.beforeEach((to) => {
  const userStore = useUserStore();
  const token = userStore.token;
  const role = userStore.userInfo?.role;
  //  未登录
  if (!token) {
    if (to.path !== "/login") {
      return "/login";
    }
    return true;
  }

  // ✔ 已登录：不允许访问login页面
  if (token && to.path === "/login") {
    return { path: "/" };
  }

  const roles = to.meta?.roles;

  if (roles && !roles.includes(role)) {
    ElMessage.error("没有访问权限");
    return false;
  }

  return true;
});
export default router;
