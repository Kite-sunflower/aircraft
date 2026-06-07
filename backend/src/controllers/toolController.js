const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  deleteBatch,
  statusSetup,
} = require('../services/toolService');

exports.getAllTool = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, name, status } = req.query;
    const toolData = await getAll({ page, pageSize, name, status });
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
    res.sendSuccess(201, newTool, '创建工具成功');
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
    const result = await deleteOne(req.params.id);
    res.sendSuccess(200, result, '删除工具成功');
  } catch (error) {
    res.sendFail(404, null, error.message);
  }
};
exports.deleteBatchTool = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await deleteBatch(ids);
    res.sendSuccess(200, result, '批量删除工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.statusSetupTool = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.sendFail(400, null, 'status不能为空');
    }
    const data = await statusSetup(req.params.id, status);
    res.sendSuccess(200, data, '工具状态修改成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
