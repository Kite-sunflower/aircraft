import request from "@/utils/request";

/**
 * 获取工具列表
 */
export const getToolList = async (params) => {
  return request({
    url: "/tool",
    method: "get",
    params,
  });
};
// 获取工具详情
export const getToolDetail = async (id) => {
  return request({
    url: `/tool/${id}`,
    method: "get",
  });
};
// 获取工具记录详情
export const getToolRecord = async (id) => {
  return request({
    url: `/toolRecords/${id}/toolRecord`,
    method: "get",
  });
};
/**
 * 新增工具
 */
export const createTool = async (data) => {
  return request({
    url: "/tool/create",
    method: "post",
    data,
  });
};

/**
 * 更新工具
 */
export const updateTool = async (id, data) => {
  return request({
    url: `/tool/${id}/update`,
    method: "put",
    data,
  });
};

/**
 * 删除工具
 */
export const deleteTool = async (id) => {
  return request({
    url: `/tool/${id}/delete`,
    method: "delete",
  });
};

/**
 * 批量删除工具
 */
export const batchDeleteTool = async (ids) => {
  return request({
    url: "/tool/batch/delete",
    method: "post",
    data: { ids },
  });
};
//借工具
export const borrowTool = async (id, data) => {
  return request({
    url: `/toolRecords/${id}/borrow`,
    method: "post",
    data,
  });
};
//还工具
export const returnTool = async (id, data) => {
  return request({
    url: `/toolRecords/${id}/return`,
    method: "post",
  });
};
