<template>
  <div class="user-page">
    <!-- 顶部操作区 -->
    <el-card class="search-card">
      <div class="search-bar">
        <div class="left">
          <el-input
            v-model="searchForm.username"
            placeholder="请输入用户名"
            clearable
            style="width: 220px"
          />

          <el-select
            v-model="searchForm.role"
            placeholder="角色"
            clearable
            style="width: 160px"
          >
            <el-option label="管理员" value="admin" />
            <el-option label="员工" value="worker" />
            <el-option label="工具管理员" value="toolManager" />
            <el-option label="物料管理员" value="materialManager" />
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

          <el-button type="primary" @click="handleCreate"> 新建用户 </el-button>
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
        empty-text="暂无用户数据"
        @page-change="handlePageChange"
        @selection-change="handleSelectionChange"
      >
        <!-- 状态 -->
        <template #role="{ row }">
          <el-tag v-if="row.role === 'admin'" type="warning"> 管理员 </el-tag>

          <el-tag v-else-if="row.role === 'worker'" type="primary">
            员工
          </el-tag>
          <el-tag v-else-if="row.role === 'toolManager'" type="primary">
            工具管理员
          </el-tag>

          <el-tag v-else-if="row.role === 'materialManager'" type="success">
            物料管理员
          </el-tag>
        </template>

        <template #createdAt="{ row }">
          {{ formatTime(row?.createdAt) }}
        </template>

        <!-- 操作 -->
        <template #action="{ row }">
          <el-button type="primary" link @click="handleEdit(row)">
            编辑
          </el-button>

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
    :title="isEdit ? '编辑用户' : '新建用户'"
    width="500px"
    @close="handleCloseDialog"
  >
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="formData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item v-if="!isEdit" label="密码" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
          show-password
          placeholder="请输入密码"
        />
      </el-form-item>
      <el-form-item label="角色" prop="role">
        <el-select v-model="formData.role" style="width: 100%">
          <el-option label="管理员" value="admin" />
          <el-option label="员工" value="worker" />
          <el-option label="工具管理员" value="toolManager" />
          <el-option label="物料管理员" value="materialManager" />
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
  getUserList,
  deleteUser,
  batchDeleteUser,
  createUser,
  updateUser,
} from "@/api/user";
import { useCrud } from "@/composables/useCrud";
import { useDialog } from "@/composables/useDialog";

import { formatTime } from "@/utils/format";

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
  getList: getUserList,
  deleteItem: deleteUser,
  batchDelete: batchDeleteUser,
  searchConfig: ["username", "role"],
});
const rules = {
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
  ],
  role: [
    {
      required: true,
      message: "请选择用户角色",
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
    username: "",
    password: "",
    role: "",
  },

  rules,

  createApi: createUser,

  updateApi: updateUser,

  fetchList,
});
const columns = [
  {
    prop: "_id",
    label: "ID",
    width: 120,
  },
  {
    prop: "username",
    label: "用户名",
    minWidth: 180,
  },

  {
    prop: "role",
    label: "角色",
    minWidth: 220,
    slot: "role",
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
