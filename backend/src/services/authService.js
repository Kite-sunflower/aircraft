const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { create } = require('../services/userService');

exports.registerUser = async (userData) => {
  return await create(userData);
};

//用户登录
exports.loginUser = async (username, password) => {
  const user = await User.findOne({ username }).select('+password');
  if (!user) {
    throw new Error('用户不存在');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('密码错误');
  }

  //生成token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SERECT || 'myserectkey',
    { expiresIn: '7d' }
  );
  const userInfo = user.toObject();
  delete userInfo.password;

  return {
    user: userInfo,
    token,
  };
};
exports.logoutUser = async () => {
  return {
    message: '退出成功，请重新登录',
  };
};

exports.profileUser = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('用户不存在');
  }
  return user;
};
exports.updatePasswordUser = async (userId, oldPwd, newPwd) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new Error('用户不存在');
  }

  const isMatch = await bcrypt.compare(oldPwd, user.password);
  if (!isMatch) {
    throw new Error('旧密码错误');
  }
  if (newPwd.length < 4 || newPwd.length > 8) {
    throw new Error('密码长度为4-8位');
  }

  if (oldPwd === newPwd) {
    throw new Error('新密码不能和旧密码相同');
  }

  user.password = newPwd;
  await user.save();
  return true;
};
