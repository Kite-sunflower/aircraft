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

        <el-tag v-else-if="detail.status === 'borrowed'" type="warning">
          出借中
        </el-tag>

        <el-tag v-else type="danger"> 维修中 </el-tag>
      </el-descriptions-item>

      <!-- 库存 -->
      <el-descriptions-item label="库存">
        {{ detail.stock }}
      </el-descriptions-item>

      <!-- 借用数量 -->
      <el-descriptions-item label="已借用数量">
        {{ detail.usedQuantity }}
      </el-descriptions-item>

      <!-- 分配者 -->
      <el-descriptions-item label="分配者">
        {{ detail.distributor?.username || "-" }}
      </el-descriptions-item>

      <!-- 回收者 -->
      <el-descriptions-item label="领取者">
        {{ detail.collector?.username || "-" }}
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
        {{ detail.borrowTime || "-" }}
      </el-descriptions-item>

      <!-- 归还时间 -->
      <el-descriptions-item label="归还时间">
        {{ detail.returnTime || "-" }}
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
      stock: "100",
      usedQuantity: "1",
      distributor: {
        username: "工具管理员",
      },
      collector: {
        username: "工具管理员",
      },
      borrower: {
        username: "张三",
      },
      returner: {
        username: "张三",
      },
      borrowTime: "2026-05-18 09:00:00",
      returnTime: "2026-05-18 09:00:00",
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
