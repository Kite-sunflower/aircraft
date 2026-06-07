const User = require('../models/user');

const pagination = require('../utils/pagination');
const buildQuery = require('../utils/buildQuery');

exports.getAll = async (params) => {
  const query = buildQuery(
    {
      username: 'fuzzy',
      role: 'exact',
    },
    params
  );

  return await pagination({
    Model: User,

    page: params.page,
    pageSize: params.pageSize,

    query,
  });
};
exports.getOne = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('查询用户不存在');
  }
  return user;
};

exports.create = async (userData) => {
  const { username, password, role } = userData;

  // 非空校验
  if (!username?.trim() || !password?.trim()) {
    throw new Error('用户名和密码不能为空');
  }

  // 密码不能等于用户名
  if (username === password) {
    throw new Error('密码不能和用户名相同');
  }

  // 用户是否存在
  const user = await User.findOne({ username });

  if (user) {
    throw new Error('创建的用户已存在');
  }
  // 角色判断
  const allowRoles = ['admin', 'worker', 'toolManager', 'materialManager'];

  if (!allowRoles.includes(role)) {
    throw new Error('非法角色类型');
  }
  // 创建用户
  return await User.create({
    username,
    password,
    role,
  });
};
exports.update = async (id, updateData) => {
  // 禁止通过普通更新接口修改密码
  if (updateData.password) {
    throw new Error('请使用修改密码接口');
  }

  const updateUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updateUser) {
    throw new Error('更新的用户不存在');
  }

  return updateUser;
};
exports.deleteId = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('删除的用户不存在');
  }
  if (user.role === 'admin') {
    throw new Error('禁止删除管理员');
  }

  await User.findByIdAndDelete(id);
  return {
    deletedCount: 1,
  };
};
exports.deleteBatch = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('选择要删除的数据');
  }
  const list = await User.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在在');
  }

  if (list.some((item) => item.role === 'admin')) {
    throw new Error('禁止删除管理员');
  }

  const result = await User.deleteMany({ _id: { $in: ids } });
  return {
    deletedCount: result.deletedCount,
  };
};

exports.roleSetup = async (id, role) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('修改角色的用户不存在');
  }
  if (!['admin', 'toolManager', 'materialManager', 'worker'].includes(role)) {
    throw new Error('非法角色');
  }

  user.role = role;
  await user.save();
  return user;
};
