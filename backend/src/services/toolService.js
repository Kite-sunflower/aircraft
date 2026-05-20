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
  if (!name?.trim() || stock == null) {
    throw new Error('名字和库存不能为空');
  }
  const tool = await Tool.findOne({ name });
  if (tool) {
    throw new Error('工具已存在');
  }
  return Tool.create({
    ...toolData,
    availableStock: stock,
  });
};
exports.update = async (id, updateData) => {
  const tool = await Tool.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!tool) throw new Error('工具不存在');

  return tool;
};
exports.deleteOne = async (id) => {
  const tool = await Tool.findByIdAndDelete(id);

  if (!tool) throw new Error('工具不存在');

  return true;
};
exports.deleteBatch = async (ids) => {
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
exports.statusSetup = async (id, status) => {
  const tool = await Tool.findById(id);
  if (!tool) {
    throw new Error('工具不存在');
  }
  if (!['available', 'repair'].includes(status)) {
    throw new Error('非法状态修改');
  }
  if (tool.status === status) {
    return tool;
  }

  tool.status = status;
  await tool.save();
  return tool;
};
