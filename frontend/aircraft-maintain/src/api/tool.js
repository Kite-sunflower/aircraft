import { toolList } from "@/mock/tool";

const delay = (time = 300) =>
  new Promise((resolve) => setTimeout(resolve, time));

/**
 * 获取工具列表
 */
export const getToolList = async () => {
  await delay();
  return toolList;
};
// 获取工具详情
export const getToolDetail = async (id) => {
  await delay();

  return toolList.find((item) => item._id === id);
};
/**
 * 新增工具
 */
export const createTool = async (data) => {
  await delay();

  toolList.unshift({
    _id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString().split("T")[0],
  });
};

/**
 * 更新工具
 */
export const updateTool = async (id, data) => {
  await delay();

  const index = toolList.findIndex((item) => item._id === id);

  if (index !== -1) {
    toolList[index] = {
      ...toolList[index],
      ...data,
    };
  }
};

/**
 * 删除工具
 */
export const deleteTool = async (id) => {
  await delay();

  const index = toolList.findIndex((item) => item._id === id);

  if (index !== -1) {
    toolList.splice(index, 1);
  }
};

/**
 * 批量删除工具
 */
export const batchDeleteTool = async (ids) => {
  await delay();

  ids.forEach((id) => {
    const index = toolList.findIndex((item) => item._id === id);

    if (index !== -1) {
      toolList.splice(index, 1);
    }
  });
};
