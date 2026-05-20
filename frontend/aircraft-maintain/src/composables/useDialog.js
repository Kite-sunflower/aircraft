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
        await createApi(formData.value);
      }

      await fetchList();

      handleCloseDialog();
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
