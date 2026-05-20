<template>
  <el-card>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="物料ID">
        <el-input v-model="formData.materialId" disabled />
      </el-form-item>

      <el-form-item label="物料名称">
        <el-input v-model="formData.name" disabled />
      </el-form-item>
      <el-form-item label="发放数量">
        <el-input v-model="formData.usedQuantity" disabled />
      </el-form-item>
      <el-form-item label="领取者">
        <el-select
          v-model="formData.receiver"
          placeholder="请选择领取者"
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
  materialId: "",
  name: "",
  usedQuantity: "",
  receiver: "",
});
const handleSubmit = () => {
  ElMessage.success("分配成功");

  router.push("/material/list");
};
onMounted(() => {
  // mock 数据
  formData.value = {
    materialId: route.params.id,
    name: "螺丝",
    usedQuantity: 10,
    receiver: "张三",
  };
});
</script>
