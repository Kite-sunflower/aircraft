const {
  distribute,
  getAll,
  getOne,
  getOneMaterial,
  create,
  update,
  deleteOne,
  batchDelete,
} = require('../services/materialReceiveService');

// 发放物料
exports.distributeMaterial = async (req, res) => {
  try {
    const result = await distribute(
      req.params.id,
      req.body.receiverId,
      req.body.quantity,
      req.user._id
    );

    res.sendSuccess(200, result, '发放物料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

// 获取全部记录
exports.getAllRecords = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const result = await getAll(page, pageSize);

    res.sendSuccess(200, result, '获取材料发放记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 获取单条
exports.getOneRecords = async (req, res) => {
  try {
    const result = await getOne(req.params.id);
    res.sendSuccess(200, result, '获取成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};
//
// 根据材料id获取单条
exports.getOneMaterialIdRecords = async (req, res) => {
  try {
    const result = await getOneMaterial(req.params.id);
    res.sendSuccess(200, result, '获取成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};
// 创建
exports.createRecords = async (req, res) => {
  try {
    const result = await create(req.body);
    res.sendSuccess(200, result, '创建成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 更新
exports.updateRecords = async (req, res) => {
  try {
    const result = await update(req.params.id, req.body);
    res.sendSuccess(200, result, '更新成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 删除
exports.deleteOneRecords = async (req, res) => {
  try {
    const result = await deleteOne(req.params.id);
    res.sendSuccess(200, result, '删除成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 批量删除
exports.batchDeleteRecords = async (req, res) => {
  try {
    const { ids } = req.body;

    const result = await batchDelete(ids);

    res.sendSuccess(200, result, '批量删除成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};
