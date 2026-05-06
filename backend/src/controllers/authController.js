const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isExit = await User.findOne({ username });
    if (isExit) {
      return res.status(400).json({ message: "账号已存在" });
    }
  } catch (error) {}
};
