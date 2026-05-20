const { borrowTool, returnTool } = require('../services/toolBorrowService');

// 借工具
exports.borrowToolRecord = async (req, res) => {
  try {
    const result = await borrowTool({
      toolId: req.params.id,
      borrower: req.user._id,
      lender: req.body.lenderId,
      quantity: req.body.quantity,
    });

    res.sendSuccess(200, result, '借用工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

//还工具
exports.returnToolRecord = async (req, res) => {
  try {
    const result = await returnTool(
      req.params.id, // recordId（借用记录ID）
      req.user._id // 操作者
    );

    res.sendSuccess(200, result, '归还工具成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
