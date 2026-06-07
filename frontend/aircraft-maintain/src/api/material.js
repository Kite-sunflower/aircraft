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
// 获取材料详情
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
    url: `/material/${id}/update`,
    method: "put",
    data,
  });
};

/**
 * 删除
 */
export const deleteMaterial = async (id) => {
  return request({
    url: `/material/${id}/delete`,
    method: "delete",
  });
};

/**
 * 批量删除
 */
export const batchDeleteMaterial = async (ids) => {
  return request({
    url: `/material/batch/delete`,
    method: "post",
    data: { ids },
  });
};
//发放材料
export const assignMaterial = async (id, data) => {
  return request({
    url: `/materialRecords/${id}/distribute`,
    method: "post",
    data,
  });
};
