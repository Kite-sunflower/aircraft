import { createRouter, createWebHashHistory } from "vue-router";

import Layout from "@/layouts/index.vue";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/views/dashboard/index.vue"),
      },

      {
        path: "task/list",
        component: () => import("@/views/task/list.vue"),
      },
      {
        path: "tool/list",
        component: () => import("@/views/tool/list.vue"),
      },
      {
        path: "user/list",
        component: () => import("@/views/user/list.vue"),
      },
      {
        path: "material/list",
        component: () => import("@/views/material/list.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
