import request from "@/utils/request";

/**
 * 获取列表
 */
export const getMaterialList = async (params) => {
  return request({
    url: "/material",
    method: "get",
    params,
  });
};
// 获取任务详情
export const getMaterialDetail = async (id) => {
  return request({
    url: `/material/${id}`,
    method: "get",
  });
};
/**
 * 新增
 */
export const createMaterial = async (data) => {
  return request({
    url: "/material/create",
    method: "post",
    data,
  });
};

/**
 * 更新
 */
export const updateMaterial = async (id, data) => {
  return request({
    url: `/material/${id}`,
    method: "put",
    data,
  });
};

/**
 * 删除
 */
export const deleteMaterial = async (id) => {
  return request({
    url: `/material/${id}`,
    method: "delete",
  });
};

/**
 * 批量删除
 */
export const batchDeleteMaterial = async (ids) => {
  return request({
    url: `/material/batch/delete`,
    method: "delete",
    data: { ids },
  });
};
//发放材料
export const assignMaterial = async (id, data) => {
  return request({
    url: `/material/${id}/distribute`,
    method: "post",
    data: { ids },
  });
};
