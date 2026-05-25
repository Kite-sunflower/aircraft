<template>
  <el-card>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="任务ID">
        <el-input v-model="formData._id" disabled />
      </el-form-item>

      <el-form-item label="任务名称">
        <el-input v-model="formData.title" disabled />
      </el-form-item>

      <el-form-item label="接收者">
        <el-select
          v-model="formData.worker"
          placeholder="请选择接收者"
          style="width: 100%"
        >
          <el-option
            v-for="item in workerList"
            :key="item._id"
            :label="item.username"
            :value="item._id"
          />
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
import { getUserList } from "@/api/user";
import { getTaskDetail, assignTask } from "@/api/task";
const route = useRoute();
const router = useRouter();

const formData = ref({
  _id: "",
  title: "",
  worker: "",
});
const workerList = ref([]);

const handleSubmit = async () => {
  try {
    const id = route.params.id;

    const workerId = formData.value.worker;

    console.log("👉 workerId =", workerId);

    if (!workerId) {
      ElMessage.warning("请选择接收者");
      return;
    }

    await assignTask(id, {
      workerId, //
    });

    ElMessage.success("分配成功");
    router.push("/task/list");
  } catch (error) {
    console.log("分配失败:", error.response?.data || error);
  }
};
const getTaskDetailData = async () => {
  try {
    console.log("👉 1. 进入 getTaskDetailData");

    const id = route.params.id;
    console.log("👉 2. route id =", id);

    if (!id) {
      console.log("❌ 没有 id，直接 return");
      return;
    }

    console.log("👉 3. 准备请求 getTaskDetail");

    const res = await getTaskDetail(id);

    console.log("👉 4. 接口原始返回 res =", res);

    const task = res;

    console.log("👉 5. task =", task);

    formData.value._id = task._id;
    formData.value.title = task.title;

    console.log("👉 6. worker 原始值 =", task.worker);

    formData.value.worker = task.worker?._id || task.worker || "";

    console.log("👉 7. 最终 worker =", formData.value.worker);
  } catch (error) {
    console.log("❌ catch 捕获错误 =", error);
  }
};
const getWorkers = async () => {
  const res = await getUserList();
  const list = res.list || [];
  workerList.value = list.filter((u) => u.role === "worker");
};
onMounted(async () => {
  await getTaskDetailData();
  await getWorkers();
});
</script>
