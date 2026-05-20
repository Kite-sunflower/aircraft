<template>
  <el-card>
    <!-- table -->
    <el-table
      :data="data"
      border
      style="width: 100%"
      :loading="loading"
      :empty-text="emptyText"
      @selection-change="handleSelectionChange"
    >
      <!-- selection -->
      <el-table-column v-if="selection" type="selection" width="55" />

      <!-- columns -->
      <template v-for="col in columns" :key="col.prop">
        <el-table-column
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth"
        >
          <template v-if="col.slot" #default="scope">
            <slot :name="col.slot" v-bind="scope" />
          </template>
        </el-table-column>
      </template>

      <!-- action -->
      <el-table-column
        v-if="$slots.action"
        label="操作"
        width="360"
        fixed="right"
      >
        <template #default="scope">
          <slot name="action" v-bind="scope" />
        </template>
      </el-table-column>
    </el-table>

    <!-- pagination -->
    <div class="pagination">
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page="pagination.page"
        @current-change="handlePageChange"
      />
    </div>
  </el-card>
</template>

<script setup>
defineProps({
  /**
   * table data
   */
  data: {
    type: Array,
    default: () => [],
  },

  /**
   * columns
   */
  columns: {
    type: Array,
    default: () => [],
  },

  /**
   * loading
   */
  loading: {
    type: Boolean,
    default: false,
  },

  /**
   * pagination
   */
  pagination: {
    type: Object,
    required: true,
  },

  /**
   * empty text
   */
  emptyText: {
    type: String,
    default: "暂无数据",
  },

  /**
   * selection
   */
  selection: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["page-change", "selection-change"]);

const handlePageChange = (page) => {
  emit("page-change", page);
};

const handleSelectionChange = (rows) => {
  emit("selection-change", rows);
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: flex-end;

  margin-top: 20px;
}
</style>
