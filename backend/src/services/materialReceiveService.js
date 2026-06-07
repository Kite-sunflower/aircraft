const Material = require('../models/material');
const MaterialReceiveRecord = require('../models/materialReceiveRecord');

// 发放物料
exports.distribute = async (materialId, receiverId, quantity, distributor) => {
  if (!materialId) {
    throw new Error('材料ID不能为空');
  }
  if (!receiverId) {
    throw new Error('领取人不能为空');
  }
  if (!distributor) {
    throw new Error('发放人不能为空');
  }
  if (!quantity || quantity <= 0) {
    throw new Error('领取数量非法');
  }

  const material = await Material.findOneAndUpdate(
    {
      _id: materialId,
      availableStock: { $gte: quantity }, // 库存必须足够才允许发放
    },
    {
      $inc: { availableStock: -quantity }, // 原子扣减（并发安全）
    },
    { new: true } // 返回更新后的物料数据
  );

  // 如果 material = null → 材料不存在 或 库存不足
  if (!material) {
    throw new Error('材料库存不足或不存在');
  }
  const record = await MaterialReceiveRecord.create({
    material: materialId,
    distributor: distributor,
    receiver: receiverId,
    quantity,
  });

  return record;
};

// 获取全部记录（分页）
exports.getAll = async (page = 1, pageSize = 10) => {
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
exports.getOneMaterialId = async (materialId, page = 1, pageSize = 10) => {
  if (!materialId) {
    throw new Error('材料ID不能为空');
  }

  page = parseInt(page);
  pageSize = parseInt(pageSize);
  const skip = (page - 1) * pageSize;

  const list = await MaterialReceiveRecord.find({
    material: materialId,
  })
    .populate('material')
    .populate('distributor')
    .populate('receiver')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(pageSize);

  // 查询总条数
  const total = await MaterialReceiveRecord.countDocuments({ material: materialId });

  // 返回统一分页结构
  return {
    list,
    total,
    page,
    pageSize,
  };
};

// 删除记录
exports.deleteOne = async (id) => {
  const record = await MaterialReceiveRecord.findByIdAndDelete(id);

  if (!record) {
    throw new Error('记录不存在');
  }
  return {
    deletedCount: 1,
  };
};

// 批量删除
exports.deleteBatch = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('ids不能为空');
  }
  const list = await MaterialReceiveRecord.find({ _id: { $in: ids } });

  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }
  const result = await MaterialReceiveRecord.deleteMany({
    _id: { $in: ids },
  });
  return {
    deletedCount: result.deletedCount,
  };
};
