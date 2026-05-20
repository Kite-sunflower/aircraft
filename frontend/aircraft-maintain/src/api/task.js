import { taskList } from "@/mock/task";

/**
 * 模拟延迟
 */
const delay = (time = 300) =>
  new Promise((resolve) => setTimeout(resolve, time));

/**
 * 获取列表
 */
export const getTaskList = async () => {
  await delay();
  return taskList;
};
// 获取任务详情
export const getTaskDetail = async (id) => {
  await delay();

  return taskList.find((item) => item._id === id);
};
/**
 * 新增
 */
export const createTask = async (data) => {
  await delay();

  taskList.unshift({
    _id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString().split("T")[0],
  });
};

/**
 * 更新
 */
export const updateTask = async (id, data) => {
  await delay();

  const index = taskList.findIndex((item) => item._id === id);

  if (index !== -1) {
    taskList[index] = {
      ...taskList[index],
      ...data,
    };
  }
};

/**
 * 删除
 */
export const deleteTask = async (id) => {
  await delay();

  const index = taskList.findIndex((item) => item._id === id);

  if (index !== -1) {
    taskList.splice(index, 1);
  }
};

/**
 * 批量删除
 */
export const batchDeleteTask = async (ids) => {
  await delay();

  ids.forEach((id) => {
    const index = taskList.findIndex((item) => item._id === id);

    if (index !== -1) {
      taskList.splice(index, 1);
    }
  });
};
