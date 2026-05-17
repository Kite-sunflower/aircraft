const User = require('../models/user');

const pagination = require('../utils/pagination');

exports.getAll = async (page) => {
  return await pagination(User, page);
};
exports.getOne = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('查询用户不存在');
  }
  return user;
};

exports.create = async (userData) => {
  const { username, password } = userData;

  // 非空校验
  if (!username || !password) {
    throw new Error('用户名和密码不能为空');
  }

  // 密码长度
  if (password.length < 4 || password.length > 8) {
    throw new Error('密码长度为4-8位');
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

  // 创建用户
  return await User.create({
    username,
    password,
  });
};
exports.update = async (id, updateData) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('更新的用户不存在');
  }

  /// 禁止通过普通更新接口修改密码
  if (updateData.password) {
    throw new Error('请使用修改密码接口');
  }

  const updateUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

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
  return true;
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

  await User.deleteMany({ _id: { $in: ids } });
  return true;
};

exports.roleSetup = async (id, role) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('修改角色的用户不存在');
  }
  console.log(role);
  if (!['admin', 'toolDist', 'materialsDist', 'worker'].includes(role)) {
    throw new Error('非法角色');
  }

  user.role = role;
  await user.save();
  return user;
};
