const User = require('../models/user');

exports.getAllUser = async () => {
  return await User.find().sort({ createdAt: -1 });
};
