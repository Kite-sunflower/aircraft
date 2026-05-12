const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
  try {
    //获取token
    const authStr = req.headers.authorization;
    if (!authStr || !authStr.startsWith('Bearer ')) {
      return res.sendFail(401, null, '未登录,请先登录');
    }

    //取出token
    const token = authStr.replace('Bearer ', '');
    if (!token) {
      return res.sendFail(401, null, '未登录,请先登录');
    }

    //解密 token（你之前用的是 userId，要对应 login 里的 sign 内容）
    const decoded = jwt.verify(token, process.env.JWT_SERECT || 'myserectkey');

    //查询用户
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.sendFail(401, null, '用户不存在或已被删除！');
    }

    // 把用户信息挂载到 req
    req.user = user;
    next();
  } catch (error) {
    res.sendFail(401, null, error.message);
  }
};
exports.admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.sendFail(403, null, '权限不足,仅管理员可操作');
  }
  next();
};
exports.toolDist = (req, res, next) => {
  if (req.user.role !== 'admin' || req.user.role !== 'toolDist') {
    return res.sendFail(403, null, '权限不足,仅管理员和工具管理员可操作');
  }
  next();
};
exports.materialsDist = (req, res, next) => {
  if (req.user.role !== 'admin' || req.user.role !== 'materialsDist') {
    return res.sendFail(403, null, '权限不足,仅管理员和材料管理员可操作');
  }
  next();
};
exports.onlySelf = async (req, res, next) => {
  const loginUserId = req.user._id.toString();
  const targetId = req.params.id;

  if (req.user.role !== 'admin' && loginUserId !== targetId) {
    return res.sendFail(403, null, '无权操作他人数据');
  }
  next();
};
