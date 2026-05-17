const Task = require('../models/task');
const User = require('../models/user');
const pagination = require('../utils/pagination');

exports.getAll = async (page) => {
  return await pagination(Task, page);
};

exports.getOne = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new Error('任务不存在');
  }
  return task;
};

exports.create = async (taskData) => {
  const { title, desc } = taskData;
  if (!title || !desc) {
    throw new Error('任务和描述不能为空');
  }
  const task = await Task.findOne({ title });
  if (task) {
    throw new Error('任务已存在');
  }
  return await Task.create(taskData);
};

exports.update = async (id, updataDate) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new Error('任务不存在');
  }
  const result = await Task.findByIdAndUpdate(id, updataDate, {
    new: true,
    runValidators: true,
  });
  return result;
};

exports.deleteId = async (id) => {
  const task = await Task.findById(id);
  if (!task) {
    throw new Error('任务不存在');
  }
  await Task.findByIdAndDelete(id);
  return true;
};

exports.deleteBatch = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择数据');
  }

  const list = await Task.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }

  await Task.deleteMany({ _id: { $in: ids } });
  return true;
};

//核心逻辑
//分配任务
exports.distribute = async (taskId, accepterId, distributorId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('任务不存在');
  }
  const accepter = await User.findById(accepterId);
  console.log('工人ID', accepterId);
  if (!accepter) {
    throw new Error('工人不存在');
  }
  if (task.accepter !== null) {
    throw new Error('此任务已分配');
  }
  if (task.status !== 'pending') {
    throw new Error('非处理任务不能分配');
  }
  task.distributor = distributorId;
  task.accepter = accepterId;
  await task.save();
  return task;
};

//接受任务
exports.accept = async (taskId, accepterId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('任务不存在');
  }
  if (task.accepter == null) {
    throw new Error('任务未分配');
  }
  if (task.accepter.toString() !== accepterId.toString()) {
    throw new Error('该任务未分配给你');
  }
  if (!task.status === 'pending') {
    throw new Error('非处理状态任务不可接受');
  }

  task.status = 'doing';
  task.acceptTime = new Date();

  await task.save();
  return task;
};
//完成任务
exports.finish = async (taskId, accepterId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('任务不存在');
  }
  if (task.accepter.toString() !== accepterId.toString()) {
    throw new Error('该任务未分配给你');
  }
  if (!task.status === 'donging') {
    throw new Error('只能完成进行中的任务');
  }

  task.status = 'finish';
  task.finishTime = new Date();

  await task.save();
  return task;
};
