<template>
  <div class="login-page">
    <div class="login-box">
      <!-- 标题 -->
      <div class="title">Aircraft Maintain System</div>

      <!-- 表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="rules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            show-password
            size="large"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { loginApi } from "@/api/auth";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
const router = useRouter();
const userStore = useUserStore();
const loginForm = reactive({
  username: "",
  password: "",
});
const loginFormRef = ref();
const rules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    {
      min: 2,
      max: 6,
      message: "用户名长度为 2-6 位",
      trigger: "blur",
    },
    {
      pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/,
      message: "用户名不能包含特殊符号或空格",
      trigger: "blur",
    },
  ],

  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    {
      min: 4,
      max: 8,
      message: "密码长度为 4-8 位",
      trigger: "blur",
    },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)/,
      message: "密码必须包含字母和数字",
      trigger: "blur",
    },
  ],
};

//登录
const handleLogin = async () => {
  await loginFormRef.value.validate();

  try {
    const res = await loginApi(loginForm);

    userStore.setUserInfo(res.data.token, res.data.userInfo);

    ElMessage.success("登录成功");

    router.push("/");
  } catch (error) {
    ElMessage.error(error.response?.data?.message || "登录失败");
  }
};
</script>

<style scoped>
.login-page {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #f5f7fa;
}

.login-box {
  width: 420px;

  background: white;

  padding: 40px;

  border-radius: 8px;

  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.title {
  text-align: center;

  font-size: 24px;
  font-weight: bold;

  margin-bottom: 40px;

  color: #303133;
}

.login-form {
  width: 100%;
}

.login-btn {
  width: 100%;
}
</style>
