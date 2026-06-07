const Tool = require('../models/tool');
const pagination = require('../utils/pagination');
const buildQuery = require('../utils/buildQuery');

exports.getAll = async (params) => {
  const query = buildQuery(
    {
      name: 'fuzzy',
      status: 'exact',
    },
    params
  );
  return await pagination({
    Model: Tool,

    page: params.page,
    pageSize: params.pageSize,

    query,
  });
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
  const tool = await Tool.findById(id);

  if (!tool) {
    throw new Error('工具不存在');
  }

  // 处理库存逻辑
  if (updateData.stock !== undefined) {
    const oldStock = tool.stock;
    const oldAvailable = tool.availableStock;

    // 已借出数量
    const used = oldStock - oldAvailable;

    const newStock = updateData.stock;

    // 新可用库存
    const newAvailable = newStock - used;

    // 防止库存小于已借出数量
    if (newAvailable < 0) {
      throw new Error('库存不足，无法满足当前已借出数量');
    }

    tool.stock = newStock;
    tool.availableStock = newAvailable;
  }

  // 更新工具名称
  if (updateData.name !== undefined) {
    tool.name = updateData.name;
  }

  // 更新状态
  if (updateData.status !== undefined) {
    tool.status = updateData.status;
  }

  const result = await tool.save();

  return result;
};
exports.deleteOne = async (id) => {
  const tool = await Tool.findByIdAndDelete(id);

  if (!tool) throw new Error('工具不存在');

  return {
    deletedCount: 1,
  };
};
exports.deleteBatch = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择删除的数据');
  }

  const list = await Tool.find({ _id: { $in: ids } });

  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }

  const result = await Tool.deleteMany({ _id: { $in: ids } });
  return {
    deletedCount: result.deletedCount,
  };
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
