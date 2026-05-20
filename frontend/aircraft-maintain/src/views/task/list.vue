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

          <el-button type="primary" @click="handleCreate"> 新建任务 </el-button>
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
        empty-text="暂无任务数据"
        @page-change="handlePageChange"
        @selection-change="handleSelectionChange"
      >
        <!-- 状态 -->
        <template #status="{ row }">
          <el-tag v-if="row.status === 'pending'" type="warning">
            待处理
          </el-tag>

          <el-tag v-else-if="row.status === 'doing'" type="primary">
            进行中
          </el-tag>

          <el-tag v-else type="success"> 已完成 </el-tag>
        </template>

        <!-- 操作 -->
        <template #action="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">
            编辑
          </el-button>

          <el-button type="success" link @click="handleAssign(row)">
            分配
          </el-button>
          <el-button type="primary" link @click="handleView(row)">
            查看</el-button
          >
          <el-button type="danger" link @click="handleDelete(row._id)">
            删除
          </el-button>
        </template>
      </CrudTable>
    </el-card>
  </div>
  <!-- 新增/编辑弹窗 -->
  <el-dialog
    v-model="dialogVisible"
    :title="isEdit ? '编辑任务' : '新建任务'"
    width="500px"
    @close="handleCloseDialog"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="任务名称" prop="title">
        <el-input v-model="formData.title" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="任务描述" prop="desc">
        <el-input
          v-model="formData.desc"
          type="textarea"
          placeholder="请输入任务描述"
        />
      </el-form-item>
      <el-form-item label="任务状态">
        <el-select v-model="formData.status" style="width: 100%">
          <el-option label="待处理" value="pending" />
          <el-option label="进行中" value="doing" />
          <el-option label="已完成" value="finish" />
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
  getTaskList,
  deleteTask,
  batchDeleteTask,
  createTask,
  updateTask,
} from "@/api/task";
import { useCrud } from "@/composables/useCrud";
import { useDialog } from "@/composables/useDialog";
import { useRouter } from "vue-router";
const router = useRouter();

const handleView = (row) => {
  router.push(`/task/detail/${row._id}`);
};
const handleAssign = (row) => {
  router.push(`/task/assign/${row._id}`);
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
  getList: getTaskList,
  deleteItem: deleteTask,
  batchDelete: batchDeleteTask,
  searchConfig: ["title", "status"],
});
const rules = {
  title: [
    {
      required: true,
      message: "请输入任务名称",
      trigger: "blur",
    },
  ],

  desc: [
    {
      required: true,
      message: "请输入任务描述",
      trigger: "blur",
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
    title: "",
    desc: "",
    status: "pending",
  },

  rules,

  createApi: createTask,

  updateApi: updateTask,

  fetchList,
});
const columns = [
  {
    prop: "_id",
    label: "ID",
    width: 120,
  },
  {
    prop: "title",
    label: "任务名称",
    minWidth: 180,
  },

  {
    prop: "desc",
    label: "任务描述",
    minWidth: 220,
  },

  {
    prop: "status",
    label: "任务状态",
    width: 120,
    slot: "status",
  },

  {
    prop: "createdAt",
    label: "创建时间",
    width: 180,
  },
];
onMounted(() => {
  fetchList();
});
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
