<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <div class="card-grid">
      <el-card>
        <div class="card-item">
          <div class="label">任务数量</div>
          <div class="value">12</div>
        </div>
      </el-card>

      <el-card>
        <div class="card-item">
          <div class="label">工具数量</div>
          <div class="value">8</div>
        </div>
      </el-card>

      <el-card>
        <div class="card-item">
          <div class="label">物料数量</div>
          <div class="value">15</div>
        </div>
      </el-card>

      <el-card>
        <div class="card-item">
          <div class="label">用户数量</div>
          <div class="value">5</div>
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
          <el-table-column prop="title" label="任务名称" />
          <el-table-column prop="status" label="状态" />
          <el-table-column prop="date" label="时间" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script setup>
const tableData = [
  { title: "检查发动机", status: "进行中", date: "2026-05-17" },
  { title: "更换轮胎", status: "已完成", date: "2026-05-16" },
  { title: "系统巡检", status: "待处理", date: "2026-05-15" },
];
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
