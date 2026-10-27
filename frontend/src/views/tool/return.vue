<template>
  <div class="return-page" v-loading="loading">
    <div class="page-header">
      <div>
        <h2>工具归还</h2>
        <p>请选择需要归还的借用记录，每条记录单独处理。</p>
      </div>
      <el-button @click="router.push('/tool/list')">
        返回工具列表
      </el-button>
    </div>

    <el-alert
      v-if="!loading && records.length === 0"
      title="该工具目前没有未归还的借用记录"
      type="info"
      show-icon
      :closable="false"
      class="empty-alert"
    />

    <el-card
      v-for="item in records"
      :key="item._id"
      class="record-card"
    >
      <template #header>
        <div class="record-header">
          <span>借用人：{{ item.borrower?.username || "-" }}</span>
          <el-tag type="warning">借用中</el-tag>
        </div>
      </template>

      <el-descriptions :column="2" border>
        <el-descriptions-item label="工具名称">
          {{ item.tool?.name || tool?.name || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="可用库存">
          {{ tool?.availableStock ?? "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="借用数量">
          {{ item.quantity }}
        </el-descriptions-item>
        <el-descriptions-item label="工具管理员">
          {{ item.lender?.username || "-" }}
        </el-descriptions-item>
        <el-descriptions-item label="借用时间">
          {{ formatDate(item.borrowAt || item.createdAt) }}
        </el-descriptions-item>
        <el-descriptions-item label="借用记录ID" :span="2">
          {{ item._id }}
        </el-descriptions-item>
      </el-descriptions>

      <div class="record-actions">
        <el-button
          type="primary"
          :loading="returningId === item._id"
          :disabled="returningId !== ''"
          @click="handleReturn(item)"
        >
          确认归还
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import { getToolDetail, getToolRecord, returnTool } from "@/api/tool";

const route = useRoute();
const router = useRouter();

const loading = ref(false);
const returningId = ref("");
const tool = ref(null);
const records = ref([]);

const formatDate = (value) => {
  if (!value) return "-";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString();
};

const fetchRecords = async () => {
  loading.value = true;

  try {
    const toolId = route.params.id;

    const [toolResult, recordResult] = await Promise.all([
      getToolDetail(toolId),
      getToolRecord(toolId),
    ]);

    tool.value = toolResult;

    const list = Array.isArray(recordResult?.list)
      ? recordResult.list
      : [];

    records.value = list.filter(
      (item) => item.status === "borrowing"
    );
  } catch (error) {
    console.error("加载工具借用记录失败：", error);
    ElMessage.error("加载借用记录失败，请检查网络或后端服务");
  } finally {
    loading.value = false;
  }
};

const handleReturn = async (item) => {
  if (!item?._id || returningId.value) return;

  try {
    await ElMessageBox.confirm(
      `确认归还 ${item.borrower?.username || "该借用人"} 借用的 ${item.quantity} 件工具吗？`,
      "确认归还",
      {
        confirmButtonText: "确认归还",
        cancelButtonText: "取消",
        type: "warning",
      }
    );
  } catch {
    return;
  }

  try {
    returningId.value = item._id;

    // 使用具体的借用记录 ID，只归还这一条记录
    await returnTool(item._id);

    ElMessage.success("归还成功");

    // 重新加载数据，移除已归还的记录
    await fetchRecords();
  } catch (error) {
    console.error("归还工具失败：", error);
    ElMessage.error("归还失败，请检查借用记录或后端日志");
  } finally {
    returningId.value = "";
  }
};

onMounted(fetchRecords);
</script>

<style scoped>
.return-page {
  padding: 4px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.page-header h2 {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 600;
}

.page-header p {
  margin: 0;
  color: var(--el-text-color-secondary);
  line-height: 1.7;
}

.record-card {
  margin-bottom: 16px;
}

.record-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.record-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.empty-alert {
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
