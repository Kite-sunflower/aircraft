import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/store/modules/user";

// 创建 axios 实例
const service = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();

    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 业务成功
    if (res.success) {
      return res.data;
    }

    // 业务失败
    ElMessage.error(res.message || "请求失败");

    return Promise.reject(res.message);
  },

  (error) => {
    if (error.response?.status === 401) {
      const userStore = useUserStore();

      userStore.logout();

      window.location.href = "/#/login";
    }

    ElMessage.error(error.response?.data?.message || "服务器错误");

    return Promise.reject(error);
  },
);

export default service;
