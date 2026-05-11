const mongoose = require('mongoose');
const toolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 1,
    },
    distributor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    usedQuantity: {
      type: Number,
      default: 0,
    },
    returner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    borrowTime: {
      type: Date,
      default: null,
    },
    returnTime: {
      type: Date,
      default: null,
    },
    status: {
      type: String,
      enum: ['available', 'repair', 'borrowed'],
      default: 'available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tool', toolSchema);
