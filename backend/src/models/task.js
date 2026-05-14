const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    distributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    accepter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    acceptTime: {
      type: Date,
      default: null,
    },
    finishTime: {
      type: Date,
      dafault: null,
    },
    status: {
      type: String,
      enum: ['pending', 'doing', 'finish'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
