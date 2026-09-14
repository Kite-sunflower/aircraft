import request from "@/utils/request";

/**
 * 获取用户列表
 */
export const getUserList = async (params) => {
  return request({
    url: "/user",
    method: "get",
    params,
  });
};

/**
 * 新增用户
 */
export const createUser = async (data) => {
  return request({
    url: "/user/create",
    method: "post",
    data,
  });
};

/**
 * 更新用户
 */
export const updateUser = async (id, data) => {
  return request({
    url: `/user/${id}/update`,
    method: "put",
    data,
  });
};

/**
 * 删除用户
 */
export const deleteUser = async (id) => {
  return request({
    url: `/user/${id}/delete`,
    method: "delete",
  });
};

/**
 * 批量删除用户
 */
export const batchDeleteUser = async (ids) => {
  return request({
    url: `/user/batch/delete`,
    method: "post",
    data: { ids },
  });
};
