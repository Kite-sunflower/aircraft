const Materials = require('../models/materials');
const pagination = require('../utils/pagination');

exports.getAll = async (page) => {
  return await pagination(Materials, page);
};

exports.getOne = async (id) => {
  const materials = await Materials.findById(id);
  if (!materials) {
    throw new Error('材料不存在');
  }
  return materials;
};
exports.create = async (materialsData) => {
  const { name, stock } = materialsData;
  if (!name || !stock) {
    throw new Error('名字和库存不能为空');
  }
  const materials = await Materials.findOne({ name });
  if (materials) {
    throw new Error('材料已存在');
  }
  return await Materials.create(materialsData);
};
exports.update = async (id, updataDate) => {
  const materials = await Materials.findById(id);
  if (!materials) {
    throw new Error('材料不存在');
  }
  const result = await Materials.findByIdAndUpdate(id, updataDate, {
    new: true,
    runValidators: true,
  });
  return result;
};
exports.deleteId = async (id) => {
  console.log(id);
  const materials = await Materials.findById(id);
  console.log(materials);
  if (!materials) {
    throw new Error('材料不存在');
  }
  await Materials.findByIdAndDelete(id);
  return true;
};
exports.deleteBatch = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('选择删除的正确数据');
  }
  const list = await Materials.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }
  await Materials.deleteMany({ _id: { $in: ids } });
  return true;
};

exports.Info = async (materialsId) => {
  const materials = await Task.findById(materialsId);
  if (!materials) {
    throw new Error('材料不存在');
  }
  return materials;
};

//核心逻辑
//发送材料
exports.deal = async (materialsId, userId, quantity, distributorId) => {
  const materials = await Materials.findById(materialsId);
  if (!materials) {
    throw new Error('材料不存在');
  }
  if (quantity > materials.stock) {
    throw new Error('材料库存不足');
  }
  if (!quantity || quantity <= 0) {
    throw new Error('领取数量非法');
  }

  materials.receiver = userId;
  materials.usedQuantity = quantity;

  materials.receiveTime = new Date();
  materials.stock -= quantity;

  materials.distributor = distributorId;

  await materials.save();
  return materials;
};
