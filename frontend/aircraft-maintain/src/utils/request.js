import axios from "axios";
import { ElMessage } from "element-plus";

// 创建 axios 实例
const service = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取 token
    const token = localStorage.getItem("token");

    // 如果有 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    return response.data;
  },

  (error) => {
    // 错误提示
    ElMessage.error(error.response?.data?.message || "请求失败");

    // token 失效
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      location.href = "/#/login";
    }

    return Promise.reject(error);
  },
);

export default service;
