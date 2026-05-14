const {
  getAll,
  getOne,
  create,
  update,
  deleteId,
  deleteBatch,
  distribute,
  accept,
  finish,
} = require('../services/taskService');

exports.getAllTask = async (req, res) => {
  try {
    const toolData = await getAll();
    res.sendSuccess(200, toolData, '获取任务列表成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.getOneTask = async (req, res) => {
  try {
    const toolData = await getOne(req.params.id);
    res.sendSuccess(200, toolData, '获取任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.createTask = async (req, res) => {
  try {
    const newTask = await create(req.body);
    res.sendSuccess(200, newTask, '创建任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.updateTask = async (req, res) => {
  try {
    const updateData = await update(req.params.id, req.body);
    res.sendSuccess(200, updateData, '更新任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteTask = async (req, res) => {
  try {
    await deleteId(req.params.id);
    res.sendSuccess(200, null, '删除任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteBatchTask = async (req, res) => {
  try {
    const { ids } = req.body;
    await deleteBatch(ids);
    res.sendSuccess(200, null, '批量删除任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

//核心逻辑

exports.distributeTask = async (req, res) => {
  try {
    const result = await distribute(req.params.id, req.body.accepterId, req.user._id);
    res.sendSuccess(200, result, '分配成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.acceptTask = async (req, res) => {
  try {
    const result = await accept(req.params.id, req.user._id);
    res.sendSuccess(200, result, '接受任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.finishTask = async (req, res) => {
  try {
    const result = await finish(req.params.id, req.user._id);
    res.sendSuccess(200, result, '任务已完成');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
