import { ref, reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";

export function useCrud(options) {
  const { getList, deleteItem, batchDelete, searchConfig = [] } = options;

  /**
   * loading
   */
  const loading = ref(false);

  /**
   * table data
   */
  const tableData = ref([]);

  /**
   * selected ids
   */
  const selectedIds = ref([]);

  /**
   * pagination
   */
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  /**
   * search form
   */
  const searchForm = reactive({});

  /**
   * init search form
   */
  searchConfig.forEach((key) => {
    searchForm[key] = "";
  });

  /**
   * fetch list
   */
  const fetchList = async () => {
    loading.value = true;

    try {
      const res = await getList({
        page: pagination.page,
        pageSize: pagination.pageSize,
        ...searchForm,
      });

      tableData.value = res.list;
      pagination.total = res.total;
    } finally {
      loading.value = false;
    }
  };

  /**
   * page change
   */
  const handlePageChange = (page) => {
    pagination.page = page;

    fetchList();
  };

  /**
   * search
   */
  const handleSearch = () => {
    console.log("🔍 搜索触发了！搜索内容：", searchForm); // 👈 只加这一行
    pagination.page = 1;

    fetchList();
  };

  /**
   * reset
   */
  const handleReset = () => {
    searchConfig.forEach((key) => {
      searchForm[key] = "";
    });

    handleSearch();
  };

  /**
   * selection
   */
  const handleSelectionChange = (rows) => {
    selectedIds.value = rows.map((i) => i._id);
  };

  /**
   * delete
   */
  const handleDelete = async (id) => {
    await ElMessageBox.confirm("确认删除该数据吗？", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });
    await deleteItem(id);
    ElMessage.success("删除成功");

    await fetchList();

    if (tableData.value.length === 0 && pagination.page > 1) {
      pagination.page--;

      await fetchList();
    }
  };

  /**
   * batch delete
   */
  const handleBatchDelete = async () => {
    if (!selectedIds.value.length) return;

    await batchDelete(selectedIds.value);

    await fetchList();

    if (tableData.value.length === 0 && pagination.page > 1) {
      pagination.page--;

      await fetchList();
    }
  };

  return {
    loading,
    tableData,
    selectedIds,

    pagination,
    searchForm,

    fetchList,

    handlePageChange,
    handleSearch,
    handleReset,

    handleSelectionChange,

    handleDelete,
    handleBatchDelete,
  };
}
