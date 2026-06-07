const Task = require('../models/task');
const User = require('../models/user');
const pagination = require('../utils/pagination');
const buildQuery = require('../utils/buildQuery');

exports.getAll = async (params, user) => {
  const query = buildQuery(
    {
      title: 'fuzzy',
      status: 'exact',
    },
    params
  );
  if (user.role === 'worker') {
    query.worker = user._id;
  }
  return await pagination({
    Model: Task,

    page: params.page,
    pageSize: params.pageSize,

    query,
  });
};
//给工作台单独使用
exports.getDashboard = async (params) => {
  return await pagination({
    Model: Task,
    page: 1,
    pageSize: 10,
    query: {}, // 不做任何角色过滤
  });
};

exports.getOne = async (id) => {
  const task = await Task.findById(id).populate('worker').populate('manager').populate('creator');
  if (!task) {
    throw new Error('任务不存在');
  }
  return task;
};

exports.create = async (taskData, creator) => {
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
    creator: creator,
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
  return {
    deletedCount: 1,
  };
};

exports.deleteBatch = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('请选择数据');
  }

  const list = await Task.find({ _id: { $in: ids } });
  if (list.length !== ids.length) {
    throw new Error('部分数据不存在');
  }

  const result = await Task.deleteMany({ _id: { $in: ids } });
  return {
    deletedCount: result.deletedCount,
  };
};

//核心逻辑
//分配任务
exports.distribute = async (taskId, workerId, manager) => {
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
  task.manager = manager;
  task.worker = worker;

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
