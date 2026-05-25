const {
  getAll,
  getOne,
  create,
  update,
  deleteId,
  deleteBatch,
} = require('../services/materialService');

exports.getAllMaterial = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const materialData = await getAll(page, limit);
    res.sendSuccess(200, materialData, '获取材料列表成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.getOneMaterial = async (req, res) => {
  try {
    const materialData = await getOne(req.params.id);
    res.sendSuccess(200, materialData, '获取材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.createMaterial = async (req, res) => {
  try {
    const newMaterial = await create(req.body);
    res.sendSuccess(201, newMaterial, '创建材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.updateMaterial = async (req, res) => {
  try {
    const updateData = await update(req.params.id, req.body);
    res.sendSuccess(200, updateData, '更新材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteMaterial = async (req, res) => {
  try {
    await deleteId(req.params.id);
    res.sendSuccess(200, null, '删除材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteBatchMaterial = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteBatch(ids);
    res.sendSuccess(200, null, '删除材料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
