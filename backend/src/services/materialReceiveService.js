const Material = require('../models/material');
const MaterialReceiveRecord = require('../models/materialReceiveRecord');

// 核心逻辑
// 发放物料
exports.distribute = async (materialId, receiverId, quantity, distributorId) => {
  // 查找物料
  const material = await Material.findById(materialId);

  if (!material) {
    throw new Error('材料不存在');
  }

  // 校验数量
  if (!quantity || quantity <= 0) {
    throw new Error('领取数量非法');
  }

  // 校验库存
  if (quantity > material.availableStock) {
    throw new Error('材料库存不足');
  }

  // 扣减可用库存
  material.availableStock -= quantity;

  await material.save();

  // 创建领取记录
  const record = await MaterialReceiveRecord.create({
    material: materialId,
    distributor: distributorId,
    receiver: receiverId,
    quantity,
  });

  return record;
};
