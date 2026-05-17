const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, '用户名不能为空'],
      minlength: [2, '用户名最少2个字符'],
      maxlength: [6, '用户名最多6个字符'],
      unique: true,
      trim: true,
      // 只允许中文、英文、数字
      match: [/^[\u4e00-\u9fa5a-zA-Z0-9]+$/, '用户名不能包含特殊符号或空格'],
    },
    password: {
      type: String,
      required: [true, '密码不能为空'],
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
      enum: ['admin', 'worker', 'toolDist', 'materialsDist'],
      default: 'worker',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enterPwd) {
  return await bcrypt.compare(enterPwd, this.password);
};

module.exports = mongoose.model('User', userSchema);
