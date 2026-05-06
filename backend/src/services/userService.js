const User = require('../models/user');

exports.getAllUser = async () => {
  return await User.find().sort({ createdAt: -1 });
};

exports.getUser = async (id) => {
  const user = await User.findById(id);
  return user;
};

exports.createUser = async (userDate) => {
  const { username, password } = userDate;

  if (!username || !password) throw new Error('用户名和密码不能为空');
  const user = User.findOne(username);
  if (user) throw new Error(400, null, '用户已存在');
  await User.create({
    ...userDate,
  });
};
exports.updateUser = async (id, updateDate) => {
  const user = User.findById(id);
  if (!user) throw new Error('用户不存在');
  await User.findByIdAndUpdate(id, updateDate, {
    new: true,
    runValidators: true,
  });
};
exports.deleteUser = async (id) => {
  const user = User.findById(id);
  if (!user) throw new Error('用户不存在');
  await User.findByIdAndDelete(id);
  return true;
};
