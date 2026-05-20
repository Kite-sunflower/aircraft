const express = require('express');
const router = express.Router();
const {
  getAllTask,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
  deleteBatchTask,
  distributeTask,
  finishTask,
} = require('../controllers/taskController');

const { protect, admin } = require('../middleware/auth');

router.post('/batch/delete', protect, admin, deleteBatchTask);
router.get('/', protect, getAllTask);
router.get('/:id', protect, getOneTask);
router.post('/create', protect, admin, createTask);
router.put('/:id/update', protect, admin, updateTask);
router.delete('/:id/delete', protect, admin, deleteTask);

router.put('/:id/distribute', protect, admin, distributeTask);
router.put('/:id/finish', protect, finishTask);

module.exports = router;
