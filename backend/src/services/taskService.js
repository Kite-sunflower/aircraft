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

exports.create = async (taskData, creatorId) => {
  const { title, description } = taskData;
  if (!title?.trim() || !description?.trim()) {
    throw new Error('任务和描述不能为空');
  }
  const task = await Task.findOne({ title });
  if (task) {
    throw new Error('任务已存在');
  }
  return await Task.create({
    ...taskData,
    creator: creatorId,
  });
};

exports.update = async (id, updateData) => {
  // 只允许修改的字段
  const allowFields = ['title', 'description'];

  // 过滤后的数据
  const filteredData = {};

  Object.keys(updateData).forEach((key) => {
    if (allowFields.includes(key)) {
      filteredData[key] = updateData[key];
    }
  });

  const result = await Task.findByIdAndUpdate(id, filteredData, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new Error('任务不存在');
  }

  return result;
};

exports.deleteOne = async (id) => {
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
exports.distribute = async (taskId, workerId, managerId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error('任务不存在');
  }
  const worker = await User.findById(workerId);

  if (!worker) {
    throw new Error('员工不存在');
  }
  if (task.worker) {
    throw new Error('任务已分配，请勿重复操作');
  }
  if (task.status !== 'pending') {
    throw new Error('只有待处理任务才能分配');
  }
  task.manager = managerId;
  task.worker = workerId;

  task.assignedAt = new Date();

  task.status = 'doing';

  await task.save();
  return task;
};

//完成任务
exports.finish = async (taskId, workerId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error('任务不存在');
  }
  if (!task.worker) {
    throw new Error('任务未分配员工');
  }
  if (task.worker.toString() !== workerId.toString()) {
    throw new Error('该任务未分配给你');
  }

  if (task.status !== 'doing') {
    throw new Error('只能完成进行中的任务');
  }

  task.status = 'finished';

  task.finishedAt = new Date();

  await task.save();

  return task;
};
