const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/userController');
router.get('/', getAll);

module.exports = router;
