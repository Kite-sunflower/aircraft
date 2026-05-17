<template>
  <div class="tool-page">
    <!-- 顶部操作区 -->
    <el-card class="search-card">
      <div class="search-bar">
        <div class="left">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入工具名称"
            clearable
            style="width: 220px"
          />

          <el-select
            v-model="searchForm.status"
            placeholder="工具状态"
            clearable
            style="width: 160px"
          >
            <el-option label="可用" value="available" />
            <el-option label="维修" value="repair" />
            <el-option label="借出" value="borrowed" />
          </el-select>

          <el-button type="primary"> 搜索 </el-button>

          <el-button> 重置 </el-button>
        </div>

        <div class="right">
          <el-button type="danger"> 批量删除 </el-button>

          <el-button type="primary"> 新建工具 </el-button>
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

        <el-table-column prop="name" label="工具名称" min-width="180" />

        <el-table-column prop="stock" label="库存数量" min-width="220" />

        <el-table-column prop="status" label="工具状态" width="120">
          <template #default="{ row }">
            <el-tag v-if="row.status === 'available'" type="success">
              可用
            </el-tag>

            <el-tag v-else-if="row.status === 'repair'" type="primary">
              维修
            </el-tag>

            <el-tag v-else type="warning"> 借出 </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="创建时间" width="180" />

        <el-table-column label="操作" width="240" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link> 编辑 </el-button>

            <el-button v-if="row.status != 'borrowed'" type="success" link>
              借用
            </el-button>
            <el-button v-else type="warning" link> 归还 </el-button>

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
    name: "螺丝刀",
    stock: 1,
    status: "available",
    createdAt: "2026-05-17",
  },
  {
    name: "千斤顶",
    stock: 1,
    status: "repair",
    createdAt: "2026-05-16",
  },
  {
    name: "液压车",
    stock: 1,
    status: "borrowed",
    createdAt: "2026-05-15",
  },
]);
</script>

<style scoped>
.tool-page {
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
