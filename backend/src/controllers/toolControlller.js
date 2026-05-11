const {
  getAll,
  getOne,
  create,
  update,
  deleteId,
  deleteBatch,
  statusSetup,
  borrow,
  restore,
} = require('../services/toolService');

exports.getAllTool = async (req, res) => {
  try {
    const { page } = req.query;
    const toolData = await getAll();
    res.sendSuccess(200, toolData, '获取工具列表成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.getOneTool = async (req, res) => {
  try {
    const toolData = await getOne(req.params.id);
    res.sendSuccess(200, toolData, '获取工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.createTool = async (req, res) => {
  try {
    const newTool = await create(req.body);
    res.sendSuccess(200, newTool, '创建工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.updateTool = async (req, res) => {
  try {
    const updateData = await update(req.params.id, req.body);
    res.sendSuccess(200, updateData, '更新工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteTool = async (req, res) => {
  try {
    await deleteId();
    res.sendSuccess(200, null, '删除工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteBatchTool = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteBatch(ids);
    res.sendSuccess(200, null, '批量删除工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.statusSetupTool = async (req, res) => {
  try {
    await statusSetup(req.params.id, req.params.status);
    res.sendSuccess(200, null, '工具状态修改成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.borrowTool = async (req, res) => {
  try {
    const toolId = req.params.id;
    const { userId, quantity } = req.body;
    const distributorId = req.user._id;
    const result = await borrow(toolId, userId, quantity, distributorId);
    res.sendSuccess(200, result, '借出工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.returnTool = async (req, res) => {
  try {
    const toolId = req.params.id;
    const { userId, quantity } = req.body;
    const collectorId = req.user._id;
    const result = await restore(toolId, userId, quantity, collectorId);
    res.sendSuccess(200, result, '归还工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
