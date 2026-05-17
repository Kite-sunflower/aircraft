const Tool = require('../models/tool');
const pagination = require('../utils/pagination');

exports.getAll = async (page) => {
  return await pagination(Tool, page);
};

exports.getOne = async (id) => {
  const tool = await Tool.findById(id);
  if (!tool) {
    throw new Error('工具不存在');
  }
  return tool;
};
exports.create = async (toolData) => {
  const { name, stock } = toolData;
  if (!name || !stock) {
    throw new Error('名字和库存不能为空');
  }
  const tool = await Tool.findOne({ name });
  if (tool) {
    throw new Error('工具已存在');
  }
  return await Tool.create(toolData);
};
exports.update = async (id, updataDate) => {
  const tool = await Tool.findById(id);
  if (!tool) {
    throw new Error('工具不存在');
  }
  const result = await Tool.findByIdAndUpdate(id, updataDate, {
    new: true,
    runValidators: true,
  });
  return result;
};
exports.deleteId = async (id) => {
  const tool = await Tool.findById(id);
  if (!tool) {
    throw new Error('工具不存在');
  }
  await Tool.findByIdAndDelete(id);
  return true;
};
exports.deleteBatch = async (ids) => {
  console.log(ids);
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择删除的数据');
  }

  const list = await Tool.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }

  await Tool.deleteMany({ _id: { $in: ids } });
  return true;
};

//核心逻辑
//更改工具状态
exports.statusSetup = async (id, status) => {
  const tool = await Tool.findById(id);
  if (!tool) {
    throw new Error('工具不存在');
  }
  if (!['available', 'repair', 'borrowed'].includes(status)) {
    throw new Error('非法状态修改');
  }
  tool.status = status;
  await tool.save();
  return tool;
};

//出借工具
exports.borrow = async (toolId, userId, quantity, distributorId) => {
  const tool = await Tool.findById(toolId);
  if (!tool) {
    throw new Error('工具不存在');
  }
  if (!quantity || quantity <= 0) {
    throw new Error('借出数量非法');
  }
  if (tool.stock < quantity) {
    throw new Error('工具库存不足');
  }
  if (tool.status !== 'available') {
    throw new Error('工具不可借用');
  }

  tool.borrower = userId;
  tool.borrowTime = new Date();
  tool.usedQuantity = quantity;
  tool.stock -= quantity;
  tool.status = 'borrowed';
  tool.distributor = distributorId;

  await tool.save();
  return tool;
};

//归还工具
exports.restore = async (toolId, userId, quantity, collectorId) => {
  const tool = await Tool.findById(toolId);
  if (!tool) {
    throw new Error('工具不存在');
  }
  if (tool.status !== 'borrowed') {
    throw new Error('该工具未被借出');
  }
  if (userId.toString() != tool.borrower.toString()) {
    throw new Error('无法归还，不是借出人');
  }
  if (quantity > tool.usedQuantity) {
    throw new error('归还数量不能大于借出数量');
  }

  tool.returner = userId;
  tool.collector = collectorId;
  tool.returnTime = new Date();
  tool.stock += quantity;
  tool.status = 'available';

  tool.usedQuantity = 0;
  tool.borrower = null;
  tool.borrowTime = null;

  await tool.save();
  return tool;
};
