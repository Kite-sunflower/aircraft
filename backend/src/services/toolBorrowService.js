const Tool = require('../models/tool');
const ToolBorrowRecord = require('../models/toolBorrowRecord');

// 借工具
exports.borrowTool = async ({ toolId, borrower, lender, quantity }) => {
  // 参数校验
  if (!toolId) {
    throw new Error('工具ID不能为空');
  }

  if (!borrower) {
    throw new Error('借用人不能为空');
  }

  if (!lender) {
    throw new Error('出借人不能为空');
  }

  if (!quantity || quantity <= 0) {
    throw new Error('借用数量非法');
  }

  // 查找工具
  const tool = await Tool.findById(toolId);

  if (!tool) {
    throw new Error('工具不存在');
  }

  // 工具状态校验
  if (tool.status !== 'available') {
    throw new Error('工具不可用');
  }

  // 库存校验
  if (tool.availableStock < quantity) {
    throw new Error('库存不足');
  }

  // 防止超过总库存
  if (quantity > tool.stock) {
    throw new Error('借用数量超过总库存');
  }

  // 扣减库存
  tool.availableStock -= quantity;

  await tool.save();

  // 创建借用记录
  const record = await ToolBorrowRecord.create({
    tool: toolId,
    borrower,
    lender,
    quantity,
    status: 'borrowing',
  });

  return record;
};

// 归还工具
exports.returnTool = async ({ toolId, returner }) => {
  // 参数校验
  if (!toolId) {
    throw new Error('工具ID不能为空');
  }

  if (!returner) {
    throw new Error('归还人不能为空');
  }
  //根据toolId来查找到借这个工具的记录
  const record = await ToolBorrowRecord.findOne({
    tool: toolId,
    borrower: returner, // 谁借的谁还
    status: 'borrowing', // 只找未归还的
  });

  if (!record) {
    throw new Error('工具借用记录不存在');
  }

  // 查找工具
  const tool = await Tool.findById(record.tool);

  // 防止库存异常
  if (tool.availableStock + record.quantity > tool.stock) {
    throw new Error('归还数量异常');
  }

  // 增加库存
  tool.availableStock += record.quantity;

  await tool.save();

  // 更新记录
  record.status = 'returned';
  record.returnAt = new Date();
  record.returner = returner;

  await record.save();

  return record;
};

// 获取全部记录（分页）
exports.getAll = async (page, pageSize) => {
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  const skip = (page - 1) * pageSize;

  const list = await ToolBorrowRecord.find()
    .populate('tool')
    .populate('lender')
    .populate('borrower')
    .populate('returner')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  const total = await ToolBorrowRecord.countDocuments();

  return {
    list,
    total,
    page,
    pageSize,
  };
};

// 获取单条记录
exports.getOne = async (id) => {
  if (!id) {
    throw new Error('记录ID不能为空');
  }

  return await ToolBorrowRecord.findById(id)
    .populate('tool')
    .populate('lender')
    .populate('borrower')
    .populate('returner');
};

// 按工具查询记录
exports.getOneToolId = async (toolId) => {
  if (!toolId) {
    throw new Error('工具ID不能为空');
  }

  return await ToolBorrowRecord.find({ tool: toolId })
    .populate('tool')
    .populate('lender')
    .populate('borrower')
    .populate('returner')
    .sort({ createdAt: -1 });
};

// 删除记录
exports.deleteOne = async (id) => {
  const record = await ToolBorrowRecord.findByIdAndDelete(id);
  if (!record) {
    throw new Error('记录不存在');
  }
  return {
    deletedCount: 1,
  };
};

// 批量删除
exports.deleteBatch = async (ids) => {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error('ids不能为空');
  }

  const list = await ToolBorrowRecord.find({ _id: { $in: ids } });

  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }

  const result = await ToolBorrowRecord.deleteMany({
    _id: { $in: ids },
  });

  return {
    deletedCount: result.deletedCount,
  };
};
