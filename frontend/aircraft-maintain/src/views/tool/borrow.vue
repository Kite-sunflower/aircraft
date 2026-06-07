<template>
  <el-card>
    <el-form :model="formData" label-width="100px">
      <el-form-item label="工具ID">
        <el-input v-model="formData._id" disabled />
      </el-form-item>

      <el-form-item label="工具名称">
        <el-input v-model="formData.name" disabled />
      </el-form-item>

      <el-form-item label="可用库存">
        <el-input v-model="formData.availableStock" disabled />
      </el-form-item>
      <el-form-item label="出借数量">
        <el-input-number
          v-if="formData.availableStock > 0"
          v-model="formData.quantity"
          :min="1"
          :max="formData.availableStock"
          style="width: 100%"
        />
      </el-form-item>

      <el-form-item label="借用者">
        <el-select
          v-model="formData.borrower"
          placeholder="请选择借用者"
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
        <el-button type="primary" @click="handleSubmit"> 确认出借 </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { getUserList } from "@/api/user";
import { getToolDetail, borrowTool } from "@/api/tool";

const route = useRoute();
const router = useRouter();

const formData = ref({
  _id: "",
  name: "",
  availableStock: 0,
  quantity: 1,
  lender: "",
  borrower: "",
});

const userList = ref([]);

const fetchDetail = async () => {
  const id = route.params.id;

  const res = await getToolDetail(id);

  formData.value._id = res._id;
  formData.value.name = res.name;
  formData.value.availableStock = res.availableStock;
  formData.value.quantity = 1;
};

const fetchUsers = async () => {
  const res = await getUserList();

  userList.value = res.list || [];
};

const handleSubmit = async () => {
  if (!formData.value.borrower) {
    ElMessage.warning("请选择借用者");
    return;
  }

  await borrowTool(formData.value._id, {
    quantity: formData.value.quantity,
    borrower: formData.value.borrower,
  });

  ElMessage.success("出借成功");

  router.push("/tool/list");
};
onMounted(async () => {
  await fetchDetail();
  await fetchUsers();
});
</script>
