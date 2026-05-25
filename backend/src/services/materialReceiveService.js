const Material = require('../models/material');
const MaterialReceiveRecord = require('../models/materialReceiveRecord');

// 发放物料
exports.distribute = async (materialId, receiverId, quantity, distributorId) => {
  const material = await Material.findById(materialId);

  if (!material) {
    throw new Error('材料不存在');
  }

  if (!quantity || quantity <= 0) {
    throw new Error('领取数量非法');
  }

  if (material.availableStock < quantity) {
    throw new Error('材料库存不足');
  }

  material.availableStock -= quantity;
  await material.save();

  const record = await MaterialReceiveRecord.create({
    material: materialId,
    distributor: distributorId,
    receiver: receiverId,
    quantity,
  });

  return record;
};

// 获取全部记录（分页）
exports.getAll = async (page, pageSize) => {
  page = parseInt(page);
  pageSize = parseInt(pageSize);

  const skip = (page - 1) * pageSize;

  const list = await MaterialReceiveRecord.find()
    .populate('material')
    .populate('distributor')
    .populate('receiver')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  const total = await MaterialReceiveRecord.countDocuments();

  return {
    list,
    total,
    page,
    pageSize,
  };
};

// 查询单条
exports.getOne = async (id) => {
  const record = await MaterialReceiveRecord.findById(id)
    .populate('material')
    .populate('distributor')
    .populate('receiver');

  if (!record) {
    throw new Error('记录不存在');
  }

  return record;
};

// 根据材料ID查询记录
exports.getOneMaterialId = async (materialId) => {
  const list = await MaterialReceiveRecord.find({
    material: materialId,
  })
    .populate('material')
    .populate('distributor')
    .populate('receiver')
    .sort({ createdAt: -1 });

  return list;
};

// 创建记录
exports.create = async (data) => {
  return await MaterialReceiveRecord.create(data);
};

// 更新记录
exports.update = async (id, data) => {
  const record = await MaterialReceiveRecord.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!record) {
    throw new Error('记录不存在');
  }

  return record;
};

// 删除记录
exports.deleteOne = async (id) => {
  const record = await MaterialReceiveRecord.findByIdAndDelete(id);

  if (!record) {
    throw new Error('记录不存在');
  }

  return record;
};

// 批量删除
exports.batchDelete = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('ids不能为空');
  }

  return await MaterialReceiveRecord.deleteMany({
    _id: { $in: ids },
  });
};
