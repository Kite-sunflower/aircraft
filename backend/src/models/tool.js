const mongoose = require("mongoose");
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
      ref: "User",
      default: null,
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    returner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
      enum: ["avaliable", "disable", "borrowed"],
      defaule: "avaliable",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tool", toolSchema);
