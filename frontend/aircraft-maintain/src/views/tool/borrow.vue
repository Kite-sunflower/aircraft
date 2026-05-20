<template>
  <el-card>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="工具ID">
        <el-input v-model="formData.toolId" disabled />
      </el-form-item>

      <el-form-item label="工具名称">
        <el-input v-model="formData.name" disabled />
      </el-form-item>
      <el-form-item label="当前库存">
        <el-input v-model="formData.stock" disabled />
      </el-form-item>
      <el-form-item label="出借数量">
        <el-input
          v-model="formData.usedQuantity"
          :min="1"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="出借者">
        <el-select
          v-model="formData.distributor"
          placeholder="请选择出借者"
          style="width: 100%"
        >
          <el-option label="张三" value="张三" />

          <el-option label="李四" value="李四" />
        </el-select>
      </el-form-item>
      <el-form-item label="借用者">
        <el-select
          v-model="formData.borrower"
          placeholder="请选择借用者"
          style="width: 100%"
        >
          <el-option label="张三" value="张三" />

          <el-option label="李四" value="李四" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit"> 确认出借 </el-button>
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
  toolId: "",
  name: "",
  usedQuantity: 1,
  distributor: "",
  borrower: "",
});
const handleSubmit = () => {
  ElMessage.success("出借成功");

  router.push("/tool/list");
};
onMounted(() => {
  // mock 数据
  formData.value = {
    toolId: route.params.id,
    name: "螺丝刀",
    usedQuantity: 1,
    distributor: "工具管理员",
    borrower: "张三",
  };
});
</script>
