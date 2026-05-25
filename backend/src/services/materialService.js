const Material = require('../models/material');
const pagination = require('../utils/pagination');

exports.getAll = async (page, limit) => {
  return await pagination(Material, page, limit);
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
  const material = await Material.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!material) {
    throw new Error('材料不存在');
  }
  return material;
};

exports.deleteId = async (id) => {
  const material = await Material.findByIdAndDelete(id);

  if (!material) {
    throw new Error('材料不存在');
  }

  return true;
};
exports.deleteBatch = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('选择删除的正确数据');
  }
  const list = await Material.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }
  await Material.deleteMany({ _id: { $in: ids } });
  return true;
};
