const {
  borrowTool,
  returnTool,
  getAll,
  getOne,
  getOneToolId,
  create,
  update,
  deleteOne,
  batchDelete,
} = require('../services/toolBorrowService');

// 借工具
exports.borrowToolRecord = async (req, res) => {
  try {
    const { lenderId, quantity } = req.body;

    const result = await borrowTool({
      toolId: req.params.id,
      borrower: req.user._id,
      lender: lenderId,
      quantity,
    });

    res.sendSuccess(200, result, '借用工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

// 还工具
exports.returnToolRecord = async (req, res) => {
  try {
    const result = await returnTool(req.params.id, req.user._id);

    res.sendSuccess(200, result, '归还工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

// 获取全部记录（分页）
exports.getAllRecord = async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const result = await getAll(page, pageSize);

    res.sendSuccess(200, result, '获取借用记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 获取单条记录
exports.getOneRecord = async (req, res) => {
  try {
    const result = await getOne(req.params.id);

    res.sendSuccess(200, result, '获取借用记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 根据工具ID获取记录
exports.getOneToolIdRecord = async (req, res) => {
  try {
    const result = await getOneTool(req.params.toolId);

    res.sendSuccess(200, result, '获取工具借用记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 创建记录
exports.createRecord = async (req, res) => {
  try {
    const result = await create(req.body);

    res.sendSuccess(200, result, '创建借用记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 更新记录
exports.updateRecord = async (req, res) => {
  try {
    const result = await update(req.params.id, req.body);

    res.sendSuccess(200, result, '更新借用记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 删除记录
exports.deleteOneRecord = async (req, res) => {
  try {
    const result = await deleteOne(req.params.id);

    res.sendSuccess(200, result, '删除借用记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 批量删除记录
exports.batchDeleteRecord = async (req, res) => {
  try {
    const { ids } = req.body;

    const result = await batchDelete(ids);

    res.sendSuccess(200, result, '批量删除借用记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};
