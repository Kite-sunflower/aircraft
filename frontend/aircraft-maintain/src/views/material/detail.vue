<template>
  <el-card class="detail-card">
    <!-- loading -->
    <el-skeleton v-if="loading" :rows="8" animated />

    <!-- detail -->
    <el-descriptions v-else title="物料详情" :column="2" border>
      <!-- 物料名称 -->
      <el-descriptions-item label="物料名称">
        {{ detail.name }}
      </el-descriptions-item>

      <!-- 当前库存 -->
      <el-descriptions-item label="当前库存">
        {{ detail.stock }}
      </el-descriptions-item>

      <!-- 已使用数量 -->
      <el-descriptions-item label="已使用数量">
        {{ detail.usedQuantity }}
      </el-descriptions-item>

      <!-- 分配者 -->
      <el-descriptions-item label="分配者">
        {{ detail.distributor?.username || "-" }}
      </el-descriptions-item>

      <!-- 领取人 -->
      <el-descriptions-item label="领取人">
        {{ detail.receiver?.username || "-" }}
      </el-descriptions-item>

      <!-- 领取时间 -->
      <el-descriptions-item label="领取时间">
        {{ detail.receiveTime || "-" }}
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
      name: "螺丝",
      stock: "100",
      usedQuantity: "70",
      distributor: {
        username: "材料管理员",
      },
      receiver: {
        username: "张三",
      },
      receiveTime: "2026-05-18 09:00:00",
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
