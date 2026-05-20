import { userList } from "@/mock/user";

const delay = (time = 300) =>
  new Promise((resolve) => setTimeout(resolve, time));

/**
 * 获取用户列表
 */
export const getUserList = async () => {
  await delay();
  return userList;
};

/**
 * 新增用户
 */
export const createUser = async (data) => {
  await delay();

  userList.unshift({
    _id: Date.now().toString(),
    ...data,
    createdAt: new Date().toISOString().split("T")[0],
  });
};

/**
 * 更新用户
 */
export const updateUser = async (id, data) => {
  await delay();

  const index = userList.findIndex((item) => item._id === id);

  if (index !== -1) {
    userList[index] = {
      ...userList[index],
      ...data,
    };
  }
};

/**
 * 删除用户
 */
export const deleteUser = async (id) => {
  await delay();

  const index = userList.findIndex((item) => item._id === id);

  if (index !== -1) {
    userList.splice(index, 1);
  }
};

/**
 * 批量删除用户
 */
export const batchDeleteUser = async (ids) => {
  await delay();

  ids.forEach((id) => {
    const index = userList.findIndex((item) => item._id === id);

    if (index !== -1) {
      userList.splice(index, 1);
    }
  });
};
