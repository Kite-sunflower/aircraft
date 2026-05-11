const express = require('express');
const router = express.Router();

const {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  deleteBatchUser,
  roleSetupUser,
} = require('../controllers/userController');

const { protect, admin, onlySelf } = require('../middleware/auth');

router.delete('/batch/delete', protect, admin, deleteBatchUser);
router.get('/', protect, admin, getAllUser);
router.get('/:id', protect, onlySelf, getOneUser);
router.post('/create', protect, admin, createUser);
router.put('/:id/update', protect, onlySelf, updateUser);
router.delete('/:id/delete', protect, admin, deleteUser);

router.put('/:id/updateRole', protect, admin, roleSetupUser);
module.exports = router;
