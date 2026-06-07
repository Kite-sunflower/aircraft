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
          v-model="formData.receiverId"
          placeholder="请选择领取者"
          style="width: 100%"
        >
          <el-option
            v-for="item in userList"
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
import { getMaterialDetail, assignMaterial } from "@/api/material";
import { getUserList } from "@/api/user";

const route = useRoute();
const router = useRouter();

const formData = ref({
  _id: "",
  name: "",
  availableStock: 0,
  quantity: 1,
  receiverId: "",
});

const userList = ref([]);

const handleSubmit = async () => {
  console.log("提交数据:", formData.value);
  if (!formData.value.receiverId) {
    ElMessage.warning("请选择领取者");
    return;
  }

  await assignMaterial(formData.value._id, {
    quantity: formData.value.quantity,
    receiverId: formData.value.receiverId,
  });

  ElMessage.success("发放成功");
  router.push("/material/list");
};
const fetchDetail = async () => {
  const id = route.params.id;
  if (!id) return;
  const res = await getMaterialDetail(id);

  formData.value._id = res._id;
  formData.value.name = res.name;
  formData.value.availableStock = res.availableStock;
  formData.value.quantity = 1;
};
const fetchUsers = async () => {
  const res = await getUserList();

  userList.value = (res.list || []).filter((u) => u.role === "worker");
};
onMounted(async () => {
  await fetchDetail();
  await fetchUsers();
});
</script>
