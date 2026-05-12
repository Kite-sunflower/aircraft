const express = require('express');
const router = express.Router();

const {
  register,
  login,
  logout,
  updatePassword,
  getInfo,
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/profile', protect, getInfo);
router.post('/updatePwd', protect, updatePassword);

module.exports = router;
