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
      min: 0,
      default: 0,
    },
    availableStock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ['available', 'repair'],
      default: 'available',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tool', toolSchema);
