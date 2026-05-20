const mongoose = require('mongoose');
const toolBorrowRecordSchema = new mongoose.Schema(
  {
    tool: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tool',
      required: true,
    },
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    returner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    borrowAt: {
      type: Date,
      default: Date.now,
    },

    returnAt: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: ['borrowing', 'returned'],
      default: 'borrowing',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('ToolBorrowRecord', toolBorrowRecordSchema);
