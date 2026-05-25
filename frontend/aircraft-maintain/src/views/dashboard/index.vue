<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <div class="card-grid">
      <el-card>
        <div class="card-item">
          <div class="label">任务数量</div>
          <div class="value">{{ stats.taskCount }}</div>
        </div>
      </el-card>

      <el-card>
        <div class="card-item">
          <div class="label">工具数量</div>
          <div class="value">{{ stats.toolCount }}</div>
        </div>
      </el-card>

      <el-card>
        <div class="card-item">
          <div class="label">物料数量</div>
          <div class="value">{{ stats.materialCount }}</div>
        </div>
      </el-card>

      <el-card>
        <div class="card-item">
          <div class="label">用户数量</div>
          <div class="value">{{ stats.userCount }}</div>
        </div>
      </el-card>
    </div>

    <!-- 最近任务 -->
    <div class="table-box">
      <el-card>
        <template #header>
          <div>最近任务</div>
        </template>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="_id"
            label="ID"
            width="180"
            show-overflow-tooltip
          />
          <el-table-column prop="title" label="任务名称" />
          <el-table-column label="状态">
            <template #default="{ row }">
              <el-tag v-if="row.status === 'pending'" type="warning">
                待处理
              </el-tag>

              <el-tag v-else-if="row.status === 'doing'" type="primary">
                进行中
              </el-tag>

              <el-tag v-else type="success"> 已完成 </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template #default="{ row }">
              {{ formatDateTime(row.createdAt) }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { getTaskList } from "@/api/task";
import { getUserList } from "@/api/user";
import { getToolList } from "@/api/tool";
import { getMaterialList } from "@/api/material";
import { formatTime } from "@/utils/format";

const stats = ref({
  taskCount: 0,
  userCount: 0,
  toolCount: 0,
  materialCount: 0,
});

const tableData = ref([]);

const fetchDashboard = async () => {
  const [tasks, users, tools, materials] = await Promise.all([
    getTaskList(),
    getUserList(),
    getToolList(),
    getMaterialList(),
  ]);

  // 统计
  stats.value = {
    taskCount: tasks.length,
    userCount: users.length,
    toolCount: tools.length,
    materialCount: materials.length,
  };

  // 最近任务
  tableData.value = tasks.slice(0, 10);
};

onMounted(() => {
  fetchDashboard();
});
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* 卡片内容 */
.card-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  color: #666;
  font-size: 14px;
}

.value {
  font-size: 24px;
  font-weight: bold;
}

/* 表格区域 */
.table-box {
  margin-top: 10px;
}
</style>
