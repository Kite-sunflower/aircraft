const {
  registerUser,
  loginUser,
  logoutUser,
  updatePasswordUser,
  getUserInfo,
} = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.sendSuccess(201, user, '注册成功');
  } catch (error) {
    res.sendFail(400, null, '注册失败');
  }
};

exports.login = async () => {
  try {
    const data = await loginUser(req.body.username, req.body.password);
    res.sendSuccess(200, data, '登录成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.logout = async () => {
  try {
    await logoutUser();
    res.sendSuccess(200, null, '退出成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.getInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const info = await getUserInfo(userId);
    res.sendSuccess(200, info, '获取用户信息成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.updatePassword = async (res, req) => {
  try {
    const { oldPwd, newPwd } = req.body;
    await updatePasswordUser(req.user.id, oldPwd, newPwd);
    res.sendSuccess(200, null, '修改密码成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
