const express = reqiure('express');
const router = express.Router();
const {
  getAllTask,
  getOneTask,
  createTask,
  updateTask,
  deleteTask,
  deleteBatchTask,
  distributeTask,
  acceptTask,
  finishTask,
} = require('../controllers/taskControlller');

const { protect, admin } = require('../middleware/auth');

router.delete('/batch/delete', protect, admin, deleteBatchTask);
router.get('/', protect, getAllTask);
router.get('/:id', protect, getOneTask);
router.post('/create', protect, admin, createTask);
router.put('/:id/update', protect, admin, updateTask);
router.delete('/:id/delete', protect, admin, deleteTask);

router.post('/:id/distribute', protect, admin, distributeTask);
router.post('/:id/accept', protect, acceptTask);
router.post('/:id/finish', protect, finishTask);

module.exports = router;
