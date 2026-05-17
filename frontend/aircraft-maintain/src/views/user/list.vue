<template>
  <div class="user-page">
    <!-- 顶部操作区 -->
    <el-card class="search-card">
      <div class="search-bar">
        <div class="left">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入用户名称"
            clearable
            style="width: 220px"
          />

          <el-select
            v-model="searchForm.status"
            placeholder="用户角色"
            clearable
            style="width: 160px"
          >
            <el-option label="超级管理员" value="admin" />
            <el-option label="工人" value="worker" />
            <el-option label="工具管理员" value="toolDist" />
            <el-option label="物料管理员" value="materialsDist" />
          </el-select>

          <el-button type="primary"> 搜索 </el-button>

          <el-button> 重置 </el-button>
        </div>

        <div class="right">
          <el-button type="danger"> 批量删除 </el-button>

          <el-button type="primary"> 新建用户 </el-button>
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

        <el-table-column prop="username" label="用户名" min-width="180" />

        <el-table-column prop="role" label="用户角色" min-width="220">
          <template #default="{ row }">
            <el-tag v-if="row.role === 'admin'" type="danger"> 管理员 </el-tag>
            <el-tag v-else-if="row.role === 'worker'" type="info">
              员工
            </el-tag>
            <el-tag v-else-if="row.role === 'toolDist'" type="success">
              工具管理员
            </el-tag>
            <el-tag v-else type="warning"> 材料管理员</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="创建时间" width="180" />

        <el-table-column label="操作" width="240" fixed="right">
          <template #default>
            <el-button type="primary" link> 编辑 </el-button>

            <el-button type="success" link> 角色设置</el-button>

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
    username: "admin",
    role: "admin",
    createdAt: "2026-05-17",
  },
  {
    username: "worker",
    role: "worker",
    createdAt: "2026-05-16",
  },
  {
    username: "tool",
    role: "toolDist",
    createdAt: "2026-05-15",
  },
  {
    username: "material",
    role: "materialsDist",
    createdAt: "2026-05-15",
  },
]);
</script>

<style scoped>
.user-page {
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
