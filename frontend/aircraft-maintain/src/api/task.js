import request from "@/utils/request";

/**
 * 获取列表
 */
export const getTaskList = async (params) => {
  return request({
    url: "/task",
    method: "get",
    params,
  });

  return res.list;
};
// 获取任务详情
export const getTaskDetail = async (id) => {
  return request({
    url: `/task/${id}`,
    method: "get",
  });
};
/**
 * 新增
 */
export const createTask = async (data) => {
  return request({
    url: "/task/create",
    method: "post",
    data,
  });
};

/**
 * 更新
 */
export const updateTask = async (id, data) => {
  return request({
    url: `/task/${id}/update`,
    method: "put",
    data,
  });
};

/**
 * 删除
 */
export const deleteTask = async (id) => {
  return request({
    url: `/task/${id}/delete`,
    method: "delete",
  });
};
/**
 * 批量删除
 */
export const batchDeleteTask = async (ids) => {
  return request({
    url: "/task/batch/delete",
    method: "post",
    data: { ids },
  });
};
//分配任务
export const assignTask = async (id, data) => {
  return request({
    url: `/task/${id}/distribute`,
    method: "put",
    data,
  });
};
