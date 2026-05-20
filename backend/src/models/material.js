const mongoose = require('mongoose');

const materialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
    availableStock: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Material', materialSchema);
