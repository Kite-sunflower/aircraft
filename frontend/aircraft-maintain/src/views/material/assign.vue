<template>
  <el-card>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="物料ID">
        <el-input v-model="formData._id" disabled />
      </el-form-item>

      <el-form-item label="物料名称">
        <el-input v-model="formData.name" disabled />
      </el-form-item>

      <el-form-item label="可用库存">
        <el-input v-model="formData.availableStock" disabled />
      </el-form-item>

      <el-form-item label="发放数量">
        <el-input-number
          v-if="formData.availableStock > 0"
          v-model="formData.quantity"
          :min="1"
          :max="formData.availableStock"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="领取者">
        <el-select
          v-model="formData.receiver"
          placeholder="请选择领取者"
          style="width: 100%"
        >
          <el-option label="张三" value="1" />

          <el-option label="李四" value="2" />
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
  _id: "",
  name: "",
  availableStock: 0,
  quantity: 1,
  receiver: "",
});

const handleSubmit = () => {
  ElMessage.success("发放成功");

  router.push("/material/list");
};
onMounted(() => {
  // mock 数据
  formData.value = {
    _id: route.params.id,
    name: "螺丝",
    availableStock: 10,
    quantity: 10,
    receiver: "1",
  };
});
</script>
