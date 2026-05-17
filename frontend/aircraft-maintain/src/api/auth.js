import request from "@/utils/request";

// 登录
export const loginApi = (data) => {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
};

// 获取用户信息
export const getProfileApi = () => {
  return request({
    url: "/auth/profile",
    method: "get",
  });
};
