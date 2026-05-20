<template>
  <el-card>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="任务ID">
        <el-input v-model="formData.taskId" disabled />
      </el-form-item>

      <el-form-item label="任务名称">
        <el-input v-model="formData.title" disabled />
      </el-form-item>

      <el-form-item label="接收者">
        <el-select
          v-model="formData.receiver"
          placeholder="请选择接收者"
          style="width: 100%"
        >
          <el-option label="张三" value="张三" />

          <el-option label="李四" value="李四" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit"> 确认分配 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const route = useRoute();
const router = useRouter();

const formData = ref({
  taskId: "",
  title: "",
  receiver: "",
});
const handleSubmit = () => {
  ElMessage.success("分配成功");

  router.push("/task/list");
};
onMounted(() => {
  // mock 数据
  formData.value = {
    taskId: route.params.id,
    title: "发动机检查任务",
    receiver: "",
  };
});
</script>
