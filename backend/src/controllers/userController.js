const { getAllUser } = require('../services/userService');

exports.getAll = async (req, res) => {
  try {
    const items = await getAllUser();
    res.sendSuccess(200, items, '获取用户列表');
  } catch (error) {
    res.sendFail(400, null, '获取用列表失败');
  }
};
