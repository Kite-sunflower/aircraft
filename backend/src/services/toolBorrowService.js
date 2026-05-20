const Tool = require('../models/tool');
const ToolBorrowRecord = require('../models/toolBorrowRecord');

//借工具
exports.borrowTool = async ({ toolId, borrower, lender, quantity }) => {
  const tool = await Tool.findById(toolId);

  if (!tool) throw new Error('工具不存在');
  if (tool.status !== 'available') throw new Error('工具不可用');
  if (!quantity || quantity <= 0) {
    throw new Error('借用数量非法');
  }
  if (tool.availableStock < quantity) throw new Error('库存不足');

  tool.availableStock -= quantity;
  await tool.save();

  const record = await ToolBorrowRecord.create({
    tool: toolId,
    borrower,
    lender,
    quantity,
    status: 'borrowing',
  });

  return record;
};
//还工具
exports.returnTool = async (recordId, returnerId) => {
  const record = await ToolBorrowRecord.findById(recordId);

  if (!record) {
    throw new Error('记录不存在');
  }

  if (record.status === 'returned') {
    throw new Error('工具已归还');
  }

  const tool = await Tool.findById(record.tool);

  if (!tool) {
    throw new Error('工具不存在');
  }

  // ✔ 加库存
  tool.availableStock += record.quantity;
  await tool.save();

  // ✔ 更新借用记录
  record.status = 'returned';
  record.returnAt = new Date();
  record.returner = returnerId; // 可选：记录是谁操作归还（推荐加）

  await record.save();

  return record;
};
