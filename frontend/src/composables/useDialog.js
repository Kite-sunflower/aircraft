import { ref } from "vue";

export function useDialog(options) {
  const { defaultForm, rules, createApi, updateApi, fetchList } = options;

  /**
   * dialog
   */
  const dialogVisible = ref(false);

  /**
   * loading
   */
  const submitLoading = ref(false);

  /**
   * edit mode
   */
  const isEdit = ref(false);

  /**
   * form
   */
  const formData = ref({
    ...defaultForm,
  });

  /**
   * form ref
   */
  const formRef = ref();

  /**
   * close dialog
   */
  const handleCloseDialog = () => {
    dialogVisible.value = false;

    formRef.value?.resetFields();

    formData.value = {
      ...defaultForm,
    };
  };

  /**
   * create
   */
  const handleCreate = () => {
    isEdit.value = false;

    formData.value = {
      ...defaultForm,
    };

    dialogVisible.value = true;
  };

  /**
   * edit
   */
  const handleEdit = (row) => {
    isEdit.value = true;

    formData.value = {
      ...row,
    };

    dialogVisible.value = true;
  };

  /**
   * submit
   */
  const handleSubmit = async () => {
    await formRef.value.validate();

    submitLoading.value = true;

    try {
      if (isEdit.value) {
        await updateApi(formData.value._id, formData.value);
      } else {
        const { _id, ...payload } = formData.value;
        await createApi(payload);
      }

      await fetchList();
      handleCloseDialog();
    } catch (err) {
      console.log(" 后端错误:", err.response?.data || err);

      ElMessage.error(err.response?.data?.message || "提交失败");
    } finally {
      submitLoading.value = false;
    }
  };

  return {
    dialogVisible,
    submitLoading,
    isEdit,

    formData,
    formRef,
    rules,

    handleCloseDialog,
    handleCreate,
    handleEdit,
    handleSubmit,
  };
}
