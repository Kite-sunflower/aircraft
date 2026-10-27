const mongoose = require('mongoose');
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

  const amount = Number(quantity);

  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error('借用数量必须是正整数');
  }

  // 开启事务
  const session = await mongoose.startSession();

  try {
    let record;

    await session.withTransaction(async () => {
      // 1. 原子扣减库存
      const tool = await Tool.findOneAndUpdate(
        {
          _id: toolId,
          status: 'available',
          availableStock: { $gte: amount },
          stock: { $gte: amount },
        },
        {
          $inc: { availableStock: -amount },
        },
        {
          new: true,
          session,
        }
      );

      if (!tool) {
        throw new Error('库存不足或工具不可用');
      }

      // 2. 创建借用记录
      const records = await ToolBorrowRecord.create(
        [
          {
            tool: toolId,
            borrower,
            lender,
            quantity: amount,
            status: 'borrowing',
          },
        ],
        { session }
      );

      record = records[0];
    });

    return record;
  } finally {
    await session.endSession();
  }
};

// 归还工具
exports.returnTool = async ({ recordId, returner }) => {
  // 参数校验
  if (!recordId) {
    throw new Error('借用记录ID不能为空');
  }

  if (!returner) {
    throw new Error('归还人不能为空');
  }

  // 开启事务
  const session = await mongoose.startSession();

  try {
    let result;

    await session.withTransaction(async () => {
      // 1. 原子地将指定借用记录标记为已归还
      // 只有仍在借用中的记录才能更新，避免重复归还
      const record = await ToolBorrowRecord.findOneAndUpdate(
        {
          _id: recordId,
          status: 'borrowing',
        },
        {
          $set: {
            status: 'returned',
            returnAt: new Date(),
            returner,
          },
        },
        {
          new: true,
          session,
        }
      );

      if (!record) {
        throw new Error('借用记录不存在或已经归还');
      }

      // 2. 在同一事务中恢复库存，并检查库存上限
      const tool = await Tool.findOneAndUpdate(
        {
          _id: record.tool,
          $expr: {
            $lte: [{ $add: ['$availableStock', record.quantity] }, '$stock'],
          },
        },
        {
          $inc: { availableStock: record.quantity },
        },
        {
          new: true,
          session,
        }
      );

      if (!tool) {
        throw new Error('归还失败：库存异常，操作已回滚');
      }

      result = record;
    });

    return result;
  } finally {
    await session.endSession();
  }
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
