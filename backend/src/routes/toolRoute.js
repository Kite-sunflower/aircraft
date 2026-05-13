const express = require('express');
const router = express.Router();
const {
  getAllTool,
  getOneTool,
  createTool,
  updateTool,
  deleteTool,
  deleteBatchTool,
  statusSetupTool,
  borrowTool,
  returnTool,
} = require('../controllers/toolControlller');

const { protect, admin, toolDist } = require('../middleware/auth');

router.delete('/batch/delete', protect, admin, deleteBatchTool);
router.get('/', protect, getAllTool);
router.get('/:id', protect, getOneTool);
router.post('/create', protect, admin, createTool);
router.put('/:id/update', protect, toolDist, updateTool);
router.delete('/:id/delete', protect, admin, deleteTool);

router.put('/:id/updateStatus', protect, toolDist, statusSetupTool);
router.post('/:id/borrow', protect, toolDist, borrowTool);
router.post('/:id/return', protect, returnTool);

module.exports = router;
