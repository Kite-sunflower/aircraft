const {
  distribute,
  getAll,
  getOne,
  getOneMaterialId,
  deleteOne,
  deleteBatch,
} = require('../services/materialReceiveService');

// 发放物料
exports.distributeMaterial = async (req, res) => {
  try {
    const result = await distribute(
      req.params.materialId,
      req.body.receiverId,
      req.body.quantity,
      req.user._id
    );

    res.sendSuccess(201, result, '发放物料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

// 获取全部记录
exports.getAllRecords = async (req, res) => {
  try {
    // 最安全的分页写法（解析数字 + 兜底默认值）
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await getAll(page, pageSize);

    res.sendSuccess(200, result, '获取材料发放记录列表成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 获取单条
exports.getOneRecords = async (req, res) => {
  try {
    const result = await getOne(req.params.id);
    res.sendSuccess(200, result, '获取单挑材料记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 根据材料id获取记录（分页版）
exports.getOneMaterialIdRecords = async (req, res) => {
  try {
    const materialId = req.params.materialId;
    // 从前端接收分页参数，给默认值（最规范）
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // 把分页参数传给 service
    const result = await getOneMaterialId(materialId, page, pageSize);

    res.sendSuccess(200, result, '根据材料id获取发放记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 删除
exports.deleteOneRecords = async (req, res) => {
  try {
    const result = await deleteOne(req.params.id);
    res.sendSuccess(200, result, '材料记录删除成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 批量删除
exports.deleteBatchRecords = async (req, res) => {
  try {
    const { ids } = req.body;

    const result = await deleteBatch(ids);

    res.sendSuccess(200, result, `批量删除材料记录成功,共删除 ${result.deletedCount} 条`);
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};
