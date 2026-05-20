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

        <el-tag v-else type="success"> 已完成 </el-tag>
      </el-descriptions-item>

      <el-descriptions-item label="任务描述" :span="2">
        {{ detail.desc }}
      </el-descriptions-item>

      <el-descriptions-item label="分配者">
        {{ detail.distributor?.username || "-" }}
      </el-descriptions-item>

      <el-descriptions-item label="领取者">
        {{ detail.accepter?.username || "-" }}
      </el-descriptions-item>

      <el-descriptions-item label="领取时间">
        {{ detail.acceptedAt }}
      </el-descriptions-item>

      <el-descriptions-item label="完成时间">
        {{ detail.finishedAt }}
      </el-descriptions-item>

      <el-descriptions-item label="创建时间">
        {{ detail.createdAt }}
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
      title: "发动机检修任务",
      desc: "检查发动机叶片磨损情况",
      distributor: {
        username: "管理员",
      },
      accepter: {
        username: "李四",
      },
      acceptedAt: "2026-05-18 10:00:00",
      finishedAt: "2026-05-18 18:00:00",
      status: "doing",
      createdAt: "2026-05-18 09:00:00",
    };

    loading.value = false;
  }, 500);
};

onMounted(() => {
  fetchDetail();
});
</script>
