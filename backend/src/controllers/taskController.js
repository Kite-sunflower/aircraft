const {
  getAll,
  getDashboard,
  getOne,
  create,
  update,
  deleteOne,
  deleteBatch,
  distribute,
  finish,
} = require('../services/taskService');

exports.getAllTask = async (req, res) => {
  try {
    const { page = 1, pageSize = 10, title, status } = req.query;
    const taskData = await getAll({ page, pageSize, title, status }, req.user);
    res.sendSuccess(200, taskData, '获取任务列表成功');
  } catch (error) {
    console.log(error);
    res.sendFail(400, null, error.message);
  }
};
exports.getDashboardTask = async (req, res) => {
  try {
    const data = await getDashboard();
    res.sendSuccess(200, data, '获取工作台数据成功');
  } catch (error) {
    console.log(error);
    res.sendFail(400, null, error.message);
  }
};
exports.getOneTask = async (req, res) => {
  try {
    const taskData = await getOne(req.params.id);
    res.sendSuccess(200, taskData, '获取任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.createTask = async (req, res) => {
  try {
    const newTask = await create(req.body, req.user.id);
    res.sendSuccess(201, newTask, '创建任务成功');
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
    const result = await deleteOne(req.params.id);
    res.sendSuccess(200, result, '删除任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};
exports.deleteBatchTask = async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await deleteBatch(ids);
    res.sendSuccess(200, result, '批量删除任务成功');
  } catch (error) {
    res.sendFail(400, null, error.message);
  }
};

//核心逻辑

exports.distributeTask = async (req, res) => {
  try {
    const result = await distribute(req.params.id, req.body.workerId, req.user._id);
    res.sendSuccess(200, result, '分配成功');
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
