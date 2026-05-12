const { deleteMany } = require('../models/task');
const {
  getAll,
  getOne,
  create,
  update,
  deleteId,
  deleteBatch,
  roleSetup,
} = require('../services/userService');

exports.getAllUser = async (req, res) => {
  try {
    const { page } = req.query;
    const items = await getAll(page);
    res.sendSuccess(200, items, '获取用户列表');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

exports.getOneUser = async (req, res) => {
  try {
    const user = await getOne(req.params.id);
    res.sendSuccess(200, user, '获取用户成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.createUser = async (req, res) => {
  try {
    const newuser = await create(req.body);
    res.sendSuccess(201, newuser, '创建用户成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateData = await update(req.params.id, req.body);
    res.sendSuccess(200, updateData, '更新用户成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    await deleteId(req.params.id);
    res.sendSuccess(200, null, '删除用户成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteBatchUser = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteBatch(ids);
    res.sendSuccess(200, null, '批量删除用户成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

exports.roleSetupUser = async (req, res) => {
  try {
    const roleUser = await roleSetup(req.params.id, req.body.role);
    res.sendSuccess(201, roleUser, '用户角色修改成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
