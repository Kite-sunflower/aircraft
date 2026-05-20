const { distribute } = require('../services/materialReceiveService');

// 发放物料
exports.distributeMaterial = async (req, res) => {
  try {
    const result = await distribute(
      req.params.id,
      req.body.receiverId,
      req.body.quantity,
      req.user._id
    );

    res.sendSuccess(200, result, '发放物料成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
