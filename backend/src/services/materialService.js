const Material = require('../models/material');
const pagination = require('../utils/pagination');
const buildQuery = require('../utils/buildQuery');

exports.getAll = async (params) => {
  const query = buildQuery(
    {
      name: 'fuzzy',
    },
    params
  );

  return await pagination({
    Model: Material,

    page: params.page,
    pageSize: params.pageSize,

    query,
  });
};

exports.getOne = async (id) => {
  const material = await Material.findById(id);
  if (!material) {
    throw new Error('材料不存在');
  }
  return material;
};

exports.create = async (materialsData) => {
  const { name, stock } = materialsData;
  if (!name?.trim() || stock == null) {
    throw new Error('名字和库存不能为空');
  }
  const material = await Material.findOne({ name });
  if (material) {
    throw new Error('材料已存在');
  }
  return await Material.create({
    ...materialsData,
    availableStock: stock,
  });
};
exports.update = async (id, updateData) => {
  const material = await Material.findById(id);

  if (!material) {
    throw new Error('材料不存在');
  }

  // 只处理库存变更逻辑
  if (updateData.stock !== undefined) {
    const oldStock = material.stock;
    const oldAvailable = material.availableStock;

    // 已占用数量 = 已借走的
    const used = oldStock - oldAvailable;

    const newStock = updateData.stock;

    // 新可用库存 = 新库存 - 已占用
    const newAvailable = newStock - used;

    if (newAvailable < 0) {
      throw new Error('库存不足，无法满足当前已占用数量');
    }

    material.stock = newStock;
    material.availableStock = newAvailable;
  }

  // 其他字段正常更新
  if (updateData.name !== undefined) {
    material.name = updateData.name;
  }

  const result = await material.save();

  return result;
};

exports.deleteId = async (id) => {
  const material = await Material.findByIdAndDelete(id);

  if (!material) {
    throw new Error('材料不存在');
  }

  return {
    deletedCount: 1,
  };
};
exports.deleteBatch = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('选择删除的正确数据');
  }
  const list = await Material.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }
  const result = await Material.deleteMany({ _id: { $in: ids } });
  return {
    deletedCount: result.deletedCount,
  };
};
