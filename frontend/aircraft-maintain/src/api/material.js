import { materialList } from "@/mock/material";

/**
 * 模拟延迟
 */
const delay = (time = 300) =>
  new Promise((resolve) => setTimeout(resolve, time));

/**
 * 获取列表
 */
export const getMaterialList = async () => {
  await delay();
  return materialList;
};
// 获取任务详情
export const getMaterialDetail = async (id) => {
  await delay();

  return materialList.find((item) => item._id === id);
};
/**
 * 新增
 */
export const createMaterial = async (data) => {
  await delay();

  materialList.unshift({
    _id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString().split("T")[0],
  });
};

/**
 * 更新
 */
export const updateMaterial = async (id, data) => {
  await delay();

  const index = materialList.findIndex((item) => item._id === id);

  if (index !== -1) {
    materialList[index] = {
      ...materialList[index],
      ...data,
    };
  }
};

/**
 * 删除
 */
export const deleteMaterial = async (id) => {
  await delay();

  const index = materialList.findIndex((item) => item._id === id);

  if (index !== -1) {
    materialList.splice(index, 1);
  }
};

/**
 * 批量删除
 */
export const batchDeleteMaterial = async (ids) => {
  await delay();

  ids.forEach((id) => {
    const index = materialList.findIndex((item) => item._id === id);

    if (index !== -1) {
      materialList.splice(index, 1);
    }
  });
};
