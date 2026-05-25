<template>
  <el-card class="detail-card">
    <!-- loading -->
    <el-skeleton v-if="loading" :rows="8" animated />

    <!-- detail -->
    <el-descriptions v-else title="任务详情" :column="2" border>
      <el-descriptions-item label="任务名称">
        {{ detail.title }}
      </el-descriptions-item>

      <el-descriptions-item label="任务状态">
        <el-tag v-if="detail.status === 'pending'" type="warning">
          待处理
        </el-tag>

        <el-tag v-else-if="detail.status === 'doing'" type="primary">
          进行中
        </el-tag>

        <el-tag v-else-if="detail.status === 'finished'" type="success">
          已完成
        </el-tag>
      </el-descriptions-item>

      <el-descriptions-item label="任务描述" :span="2">
        {{ detail.description }}
      </el-descriptions-item>

      <el-descriptions-item label="创建者">
        {{ detail.creator?.username || "-" }}
      </el-descriptions-item>

      <el-descriptions-item label="分配者">
        {{ detail.manager?.username || "-" }}
      </el-descriptions-item>

      <el-descriptions-item label="领取者">
        {{ detail.worker?.username || "-" }}
      </el-descriptions-item>

      <el-descriptions-item label="领取时间">
        {{ formatTime(detail.assignedAt) }}
      </el-descriptions-item>

      <el-descriptions-item label="完成时间">
        {{ formatTime(detail.finishedAt) }}
      </el-descriptions-item>

      <el-descriptions-item label="创建时间">
        {{ formatTime(detail.createdAt) }}
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
import { getTaskDetail } from "@/api/task";

import { formatTime } from "@/utils/format";

const route = useRoute();

const detail = ref({});
const loading = ref(false);

const fetchDetail = async () => {
  loading.value = true;
  try {
    const id = route.params.id;

    const res = await getTaskDetail(id);

    detail.value = res;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDetail();
});
</script>
