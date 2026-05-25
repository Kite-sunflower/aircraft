<template>
  <el-card class="detail-card">
    <!-- loading -->
    <el-skeleton v-if="loading" :rows="10" animated />

    <!-- detail -->
    <el-descriptions v-else title="工具详情" :column="2" border>
      <!-- 工具名称 -->
      <el-descriptions-item label="工具名称">
        {{ detail.name }}
      </el-descriptions-item>

      <!-- 工具状态 -->
      <el-descriptions-item label="工具状态">
        <el-tag v-if="detail.status === 'available'" type="success">
          可用
        </el-tag>
        <el-tag v-if="detail.status === 'repair'" type="warning"> 维修 </el-tag>
      </el-descriptions-item>

      <!-- 库存 -->
      <el-descriptions-item label="库存">
        {{ detail.stock }}
      </el-descriptions-item>
      <!-- 可用库存 -->
      <el-descriptions-item label="可用库存">
        {{ detail.availableStock }}
      </el-descriptions-item>
      <!-- 借用数量 -->
      <el-descriptions-item label="借用数量">
        {{ detail.quantity }}
      </el-descriptions-item>

      <!-- 分配者 -->
      <el-descriptions-item label="工具管理员">
        {{ detail.lender?.username || "-" }}
      </el-descriptions-item>

      <!-- 借用人 -->
      <el-descriptions-item label="借用人">
        {{ detail.borrower?.username || "-" }}
      </el-descriptions-item>

      <!-- 归还人 -->
      <el-descriptions-item label="归还人">
        {{ detail.returner?.username || "-" }}
      </el-descriptions-item>

      <!-- 借出时间 -->
      <el-descriptions-item label="借出时间">
        {{ detail.borrowAt || "-" }}
      </el-descriptions-item>

      <!-- 归还时间 -->
      <el-descriptions-item label="归还时间">
        {{ detail.returnAt || "-" }}
      </el-descriptions-item>

      <!-- 创建时间 -->
      <el-descriptions-item label="创建时间">
        {{ detail.createdAt }}
      </el-descriptions-item>

      <!-- 更新时间 -->
      <el-descriptions-item label="更新时间">
        {{ detail.updatedAt }}
      </el-descriptions-item>
    </el-descriptions>
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
//import { getTaskDetail } from "@/api/task";

const route = useRoute();

const detail = ref({});
const loading = ref(false);

const fetchDetail = async () => {
  loading.value = true;

  setTimeout(() => {
    detail.value = {
      name: "螺丝刀",
      status: "available",
      stock: 100,
      availableStock: 99,
      quantity: 1,
      lender: {
        username: "工具管理员",
      },
      borrower: {
        username: "张三",
      },
      returner: {
        username: "张三",
      },
      borrowAt: "2026-05-18 09:00:00",
      returnAt: "2026-05-18 09:00:00",
      createdAt: "2026-05-18 09:00:00",
      updatedAt: "2026-05-18 09:00:00",
    };

    loading.value = false;
  }, 500);
};

onMounted(() => {
  fetchDetail();
});
</script>
