const {
  getAll,
  getOne,
  create,
  update,
  deleteId,
  deleteBatch,
  receive,
  status,
} = require('../services/taskService');

exports.getAllMaterials = async (req, res) => {
  try {
    const { page } = req.query;
    const toolData = await getAll();
    res.sendSuccess(200, toolData, '获取材料列表成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.getOneMaterials = async (req, res) => {
  try {
    const toolData = await getOne(req.params.id);
    res.sendSuccess(200, toolData, '获取材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.createMaterials = async (req, res) => {
  try {
    const newTool = await create(req.body);
    res.sendSuccess(200, newTool, '创建材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.updateMaterials = async (req, res) => {
  try {
    const updateData = await update(req.params.id, req.body);
    res.sendSuccess(200, updateData, '更新材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteMaterials = async (req, res) => {
  try {
    await deleteId();
    res.sendSuccess(200, null, '删除材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteBatchMaterials = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteBatch(ids);
    res.sendSuccess(200, null, '删除材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
//核心逻辑
exports.statusMaterials = async (req, res) => {
  try {
    const result = await status(req.params.id, req.body.status);
    res.sendSuccess(200, result, '更改材料状态成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.receiveMaterials = async (req, res) => {
  try {
    const materialsId = req.params.id;
    const { userId, quantity } = req.body;

    const distributorId = req.user._id;

    const result = await receive(materialsId, userId, quantity, distributorId);
    res.sendSuccess(200, result, '领取材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
