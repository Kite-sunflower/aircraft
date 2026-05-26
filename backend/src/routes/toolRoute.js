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
} = require('../controllers/toolController');

const { protect, admin, toolManager } = require('../middleware/auth');

router.delete('/batch/delete', protect, admin, deleteBatchTool);
router.get('/', protect, getAllTool);
router.get('/:id', protect, getOneTool);
router.post('/create', protect, admin, createTool);
router.put('/:id/update', protect, toolManager, updateTool);
router.delete('/:id/delete', protect, admin, deleteTool);

router.put('/:id/status', protect, toolManager, statusSetupTool);

module.exports = router;
