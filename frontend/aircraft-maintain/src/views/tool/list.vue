<template>
  <div class="tool-page">
    <!-- 顶部操作区 -->
    <el-card class="search-card">
      <div class="search-bar">
        <div class="left">
          <el-input
            v-model="searchForm.name"
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
          </el-select>

          <el-button type="primary" @click="handleSearch"> 搜索 </el-button>

          <el-button @click="handleReset"> 重置 </el-button>
        </div>

        <div class="right">
          <el-button
            type="danger"
            @click="handleBatchDelete"
            :disabled="!selectedIds.length"
          >
            批量删除
          </el-button>

          <el-button type="primary" @click="handleCreate"> 新建工具 </el-button>
        </div>
      </div>
    </el-card>
    <el-card>
      <!-- 表格 -->
      <CrudTable
        :data="tableData"
        :columns="columns"
        :loading="loading"
        :pagination="pagination"
        empty-text="暂无工具数据"
        @page-change="handlePageChange"
        @selection-change="handleSelectionChange"
      >
        <!-- 状态 -->
        <template #status="{ row }">
          <el-tag v-if="row.status === 'repair'" type="warning"> 维修 </el-tag>

          <el-tag v-else-if="row.status === 'available'" type="primary">
            可用
          </el-tag>
        </template>

        <template #createdAt="{ row }">
          {{ formatTime(row?.createdAt) }}
        </template>

        <!-- 操作 -->
        <template #action="{ row }">
          <div class="table-actions">
            <el-button type="primary" link @click="handleEdit(row)">
              编辑
            </el-button>

            <el-button type="success" link @click="handleBorrow(row)">
              出借
            </el-button>

            <el-button type="warning" link @click="handleReturn(row)">
              归还
            </el-button>

            <el-button type="info" link @click="handleView(row)">
              查看
            </el-button>

            <el-button type="danger" link @click="handleDelete(row._id)">
              删除
            </el-button>
          </div>
        </template>
      </CrudTable>
    </el-card>
  </div>
  <!-- 新增/编辑弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '编辑工具' : '新建工具'"
    width="500px"
    @close="handleCloseDialog"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="工具名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入工具名称" />
      </el-form-item>

      <el-form-item label="库存" prop="stock">
        <el-input-number
          v-model="formData.stock"
          :min="0"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" style="width: 100%">
          <el-option label="可用" value="available" />
          <el-option label="维修" value="repair" />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleCloseDialog"> 取消 </el-button>

      <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted } from "vue";
import CrudTable from "@/components/CrudTable/index.vue";
import {
  getToolList,
  deleteTool,
  batchDeleteTool,
  createTool,
  updateTool,
} from "@/api/tool";
import { useCrud } from "@/composables/useCrud";
import { useDialog } from "@/composables/useDialog";
import { useRouter } from "vue-router";

import { formatTime } from "@/utils/format";

const router = useRouter();

const handleView = (row) => {
  router.push(`/tool/detail/${row._id}`);
};
const handleBorrow = (row) => {
  router.push(`/tool/borrow/${row._id}`);
};
const handleReturn = (row) => {
  router.push(`/tool/return/${row._id}`);
};
const {
  loading,
  tableData,
  selectedIds,
  pagination,
  searchForm,

  fetchList,
  handlePageChange,
  handleDelete,
  handleBatchDelete,
  handleSelectionChange,
  handleSearch,
  handleReset,
} = useCrud({
  getList: getToolList,
  deleteItem: deleteTool,
  batchDelete: batchDeleteTool,
  searchConfig: ["name", "status"],
});
const rules = {
  name: [
    {
      required: true,
      message: "请输入工具名称",
      trigger: "blur",
    },
  ],
  stock: [
    {
      required: true,
      message: "请输入库存",
      trigger: "blur",
    },
  ],
  status: [
    {
      required: true,
      message: "请选择工具状态",
      trigger: "change",
    },
  ],
};

const {
  dialogVisible,
  isEdit,
  submitLoading,

  formData,
  formRef,

  handleCloseDialog,
  handleCreate,
  handleEdit,
  handleSubmit,
} = useDialog({
  defaultForm: {
    _id: "",
    name: "",
    stock: 0,
    status: "available",
  },

  rules,

  createApi: createTool,

  updateApi: updateTool,

  fetchList,
});
const columns = [
  {
    prop: "_id",
    label: "ID",
    width: 120,
  },
  {
    prop: "name",
    label: "工具名称",
    minWidth: 180,
  },

  {
    prop: "stock",
    label: "库存",
    minWidth: 180,
  },
  {
    prop: "availableStock",
    label: "可用库存",
    minWidth: 180,
  },

  {
    prop: "status",
    label: "工具状态",
    width: 120,
    slot: "status",
  },

  {
    prop: "createdAt",
    label: "创建时间",
    width: 180,
    slot: "createdAt",
  },
];
onMounted(() => {
  fetchList();
});
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
.table-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;
}
</style>
