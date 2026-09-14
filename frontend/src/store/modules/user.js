import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    token: localStorage.getItem("token") || "",

    userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  }),

  getters: {
    isLogin: (state) => !!state.token,
  },

  actions: {
    // 设置登录信息
    setUserInfo(token, userInfo) {
      this.token = token;
      this.userInfo = userInfo;

      localStorage.setItem("token", token);

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },

    // 退出登录
    logout() {
      this.token = "";
      this.userInfo = {};

      localStorage.removeItem("token");

      localStorage.removeItem("userInfo");
    },
  },
});
