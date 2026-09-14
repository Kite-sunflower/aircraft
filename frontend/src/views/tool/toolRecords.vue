<template>
  <el-card class="detail-card">
    <el-skeleton v-if="loading" :rows="10" animated />

    <template v-else>
      <div v-if="detail.length">
        <el-card v-for="item in detail" :key="item._id" class="mb-4">
          <el-descriptions :column="2" border>
            <el-descriptions-item label="工具名称">
              {{ item.tool?.name }}
            </el-descriptions-item>

            <el-descriptions-item label="工具状态">
              <el-tag v-if="item.tool?.status === 'available'" type="success">
                可用
              </el-tag>

              <el-tag v-else-if="item.tool?.status === 'repair'" type="warning">
                维修
              </el-tag>
            </el-descriptions-item>

            <el-descriptions-item label="库存">
              {{ item.tool?.stock }}
            </el-descriptions-item>

            <el-descriptions-item label="可用库存">
              {{ item.tool?.availableStock }}
            </el-descriptions-item>

            <el-descriptions-item label="借用数量">
              {{ item.quantity }}
            </el-descriptions-item>

            <el-descriptions-item label="工具管理员">
              {{ item.lender?.username || "-" }}
            </el-descriptions-item>

            <el-descriptions-item label="借用人">
              {{ item.borrower?.username || "-" }}
            </el-descriptions-item>

            <el-descriptions-item label="归还人">
              {{ item.returner?.username || "-" }}
            </el-descriptions-item>

            <el-descriptions-item label="借出时间">
              {{ item.borrowAt || "-" }}
            </el-descriptions-item>

            <el-descriptions-item label="归还时间">
              {{ item.returnAt || "-" }}
            </el-descriptions-item>

            <el-descriptions-item label="创建时间">
              {{ item.createdAt }}
            </el-descriptions-item>

            <el-descriptions-item label="更新时间">
              {{ item.updatedAt }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>

      <el-empty v-else description="暂无借还记录" />
    </template>
  </el-card>
</template>

<style scoped>
.detail-card {
  width: 100%;
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getToolRecord } from "@/api/tool";

const route = useRoute();

const detail = ref([]);
const loading = ref(false);

const fetchDetail = async () => {
  loading.value = true;

  try {
    const id = route.params.id;

    const res = await getToolRecord(id);
    console.log("tool detail res:", res);
    detail.value = res.list || [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDetail();
});
</script>
