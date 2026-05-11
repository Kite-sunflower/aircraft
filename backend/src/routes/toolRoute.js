const express = reqiure('express');
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
router.post('/create', admin, createTool);
router.put('/:id/update', toolDist, updateTool);
router.delete('/:id/delete', admin, deleteTool);

router.put('/:id/update', toolDist, statusSetupTool);
router.post('/:id/borrow', toolDist, borrowTool);
router.post('/:id/return', prodect, returnTool);

module.exports = router;
