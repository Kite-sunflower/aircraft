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

  //并发安全锁
  const tool = await Tool.findOneAndUpdate(
    {
      _id: toolId,
      status: 'available',
      availableStock: { $gte: quantity }, // 库存必须 >= 借用数量
      stock: { $gte: quantity }, // 借用数量不能 > 总库存
    },
    {
      $inc: { availableStock: -quantity }, // 原子扣减（并发安全）
    },
    { new: true } // 返回更新后的数据
  );

  // 如果 tool 为 null，说明条件不满足（库存不足/工具不存在）
  if (!tool) {
    throw new Error('库存不足或工具不可用');
  }
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

  //并发安全锁
  const tool = await Tool.findOneAndUpdate(
    {
      _id: record.tool,
      // 安全判断：归还后不能超过总库存
      $expr: { $lte: [{ $add: ['$availableStock', record.quantity] }, '$stock'] },
    },
    {
      // 原子增加库存（并发安全）
      $inc: { availableStock: record.quantity },
    },
    { new: true }
  );

  // 如果 tool = null，说明归还后会超库存 → 异常
  if (!tool) {
    throw new Error('归还失败：库存异常，可能是重复归还');
  }

  // 更新记录
  record.status = 'returned';
  record.returnAt = new Date();
  record.returner = returner;

  await record.save();

  return record;
};

// 获取全部记录（分页）
exports.getAll = async (page = 1, pageSize = 10) => {
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
exports.getOneToolId = async (toolId, page = 1, pageSize = 10) => {
  if (!toolId) {
    throw new Error('工具ID不能为空');
  }
  page = parseInt(page);
  pageSize = parseInt(pageSize);
  const skip = (page - 1) * pageSize;

  const list = await ToolBorrowRecord.find({ tool: toolId })
    .populate('tool')
    .populate('lender')
    .populate('borrower')
    .populate('returner')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);
  const total = await ToolBorrowRecord.countDocuments({ tool: toolId });

  // 返回统一分页格式
  return {
    list,
    total,
    page,
    pageSize,
  };
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
