const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, '用户名不能为空'],
      minlength: [2, '用户名最少2个字符'],
      maxlength: [15, '用户名最多6个字符'],
      unique: true,
      trim: true,
      // 只允许中文、英文、数字
      match: [/^[\u4e00-\u9fa5a-zA-Z0-9]+$/, '用户名不能包含特殊符号或空格'],
    },
    password: {
      type: String,
      required: [true, '密码不能为空'],
      minlength: [6, '密码至少6位'],
      validate: {
        validator: function (v) {
          return /^(?=.*[A-Za-z])(?=.*\d)/.test(v);
        },
        message: '密码必须包含字母和数字',
      },
      select: false,
    },
    role: {
      type: String,
      enum: ['admin', 'worker', 'toolManager', 'materialManager'],
      default: 'worker',
    },
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enterPwd) {
  return await bcrypt.compare(enterPwd, this.password);
};

module.exports = mongoose.model('User', userSchema);
