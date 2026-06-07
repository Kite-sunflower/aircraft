const {
  borrowTool,
  returnTool,
  getAll,
  getOne,
  getOneToolId,
  deleteOne,
  deleteBatch,
} = require('../services/toolBorrowService');

// 借工具
exports.borrowToolRecord = async (req, res) => {
  try {
    const { borrower, quantity } = req.body;

    const result = await borrowTool({
      toolId: req.params.toolId,
      borrower: borrower,
      lender: req.user._id,
      quantity,
    });

    res.sendSuccess(201, result, '借用工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

// 还工具
exports.returnToolRecord = async (req, res) => {
  try {
    const result = await returnTool({
      toolId: req.params.toolId,
      returner: req.body.returner,
    });

    res.sendSuccess(200, result, '归还工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

// 获取全部记录（分页）
exports.getAllRecord = async (req, res) => {
  try {
    // 最稳健写法：转数字 + 默认值，防止前端传奇怪参数
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const result = await getAll(page, pageSize);

    res.sendSuccess(200, result, '获取借用记录列表成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 获取单条记录
exports.getOneRecord = async (req, res) => {
  try {
    const result = await getOne(req.params.id);

    res.sendSuccess(200, result, '获取单条借用记录成功');
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};

// 根据工具ID获取记录（分页版）
exports.getOneToolIdRecord = async (req, res) => {
  try {
    const { toolId } = req.params;

    // 分页参数：解析数字 + 默认值（最稳写法）
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    // 把 3 个参数全部传给 service
    const result = await getOneToolId(toolId, page, pageSize);

    res.sendSuccess(200, result, '根据工具id获取借用记录成功');
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
exports.deleteBatchRecord = async (req, res) => {
  try {
    const { ids } = req.body;

    const result = await deleteBatch(ids);

    res.sendSuccess(200, result, `批量删除工具记录成功,共删除 ${result.deletedCount} 条`);
  } catch (err) {
    res.sendFail(400, null, err.message);
  }
};
