<template>
  <el-card>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="工具ID">
        <el-input v-model="formData._id" disabled />
      </el-form-item>

      <el-form-item label="工具名称">
        <el-input v-model="formData.name" disabled />
      </el-form-item>
      <el-form-item label="出借数量">
        <el-input v-model="formData.quantity" disabled />
      </el-form-item>
      <el-form-item label="归还数量">
        <el-input v-model="formData.quantity" disabled />
      </el-form-item>
      <el-form-item label="工具管理员">
        <el-select
          v-model="formData.lender"
          placeholder="请选择工具管理员"
          style="width: 100%"
        >
          <el-option label="张三" value="1" />

          <el-option label="李四" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="归还者">
        <el-select
          v-model="formData.returner"
          placeholder="请选择归还者"
          style="width: 100%"
        >
          <el-option label="张三" value="1" />

          <el-option label="李四" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="借用者">
        <el-input v-model="formData.borrower" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit"> 确认归还 </el-button>
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
  quantity: 1,
  returnQuantity: 1,
  lender: "",
  returner: "",
});
const handleSubmit = () => {
  ElMessage.success("归还成功");

  router.push("/tool/list");
};
onMounted(() => {
  // mock 数据
  formData.value = {
    _id: route.params.id,
    name: "螺丝刀",
    quantity: 10,
    returnQuantity: 1,
    lender: "1",
    returner: "2",
    borrower: "3",
  };
});
</script>
