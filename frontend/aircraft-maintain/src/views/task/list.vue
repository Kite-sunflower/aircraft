<template>
  <div class="task-page">
    <!-- 顶部操作区 -->
    <el-card class="search-card">
      <div class="search-bar">
        <div class="left">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入任务名称"
            clearable
            style="width: 220px"
          />

          <el-select
            v-model="searchForm.status"
            placeholder="任务状态"
            clearable
            style="width: 160px"
          >
            <el-option label="待处理" value="pending" />
            <el-option label="进行中" value="doing" />
            <el-option label="已完成" value="finish" />
          </el-select>

          <el-button type="primary"> 搜索 </el-button>

          <el-button> 重置 </el-button>
        </div>

        <div class="right">
          <el-button type="danger"> 批量删除 </el-button>

          <el-button type="primary"> 新建任务 </el-button>
        </div>
      </div>
    </el-card>

    <!-- 表格区域 -->
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />

        <el-table-column prop="title" label="任务名称" min-width="180" />

        <el-table-column prop="desc" label="任务描述" min-width="220" />

        <el-table-column prop="status" label="任务状态" width="120">
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

        <el-table-column prop="createdAt" label="创建时间" width="180" />

        <el-table-column label="操作" width="240" fixed="right">
          <template #default>
            <el-button type="primary" link> 编辑 </el-button>

            <el-button type="success" link> 分配 </el-button>

            <el-button type="danger" link> 删除 </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="100"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const searchForm = reactive({
  keyword: "",
  status: "",
});
const selectedIds = ref([]);

const handleSelectionChange = (rows) => {
  selectedIds.value = rows.map((item) => item._id);
};
const tableData = ref([
  {
    title: "发动机检查",
    desc: "检查发动机运行状态",
    status: "pending",
    createdAt: "2026-05-17",
  },
  {
    title: "轮胎更换",
    desc: "更换飞机轮胎",
    status: "doing",
    createdAt: "2026-05-16",
  },
  {
    title: "系统巡检",
    desc: "执行系统安全巡检",
    status: "finish",
    createdAt: "2026-05-15",
  },
]);
</script>

<style scoped>
.task-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* 搜索区域 */
.search-card {
  margin-bottom: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pagination {
  display: flex;
  justify-content: flex-end;

  margin-top: 20px;
}
</style>
