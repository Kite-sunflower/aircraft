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
const {
  borrowToolRecord,
  returnToolRecord,
  getRecordsTool,
} = require('../controllers/toolBorrowController');
const { protect, admin, toolManager } = require('../middleware/auth');

router.delete('/batch/delete', protect, admin, deleteBatchTool);
router.get('/', protect, getAllTool);
router.get('/:id', protect, getOneTool);
router.post('/create', protect, admin, createTool);
router.put('/:id/update', protect, toolManager, updateTool);
router.delete('/:id/delete', protect, admin, deleteTool);

router.put('/:id/status', protect, toolManager, statusSetupTool);

router.post('/:id/borrow', protect, toolManager, borrowToolRecord);
router.post('/:id/return', protect, returnToolRecord);
router.get('/:id/toolRecord', protect, getRecordsTool);

module.exports = router;
