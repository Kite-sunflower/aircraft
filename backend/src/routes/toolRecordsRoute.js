const express = require('express');
const router = express.Router();

const {
  borrowToolRecord,
  returnToolRecord,
  getAllRecord,
  getOneRecord,
  getOneToolIdRecord,
  deleteOneRecord,
  deleteBatchRecord,
} = require('../controllers/toolBorrowController');

const { protect, admin, toolManager } = require('../middleware/auth');

router.post('/batch/delete', protect, admin, deleteBatchRecord);
router.get('/', protect, toolManager, getAllRecord);
router.get('/:id', protect, toolManager, getOneRecord);
router.delete('/:id/delete', protect, admin, deleteOneRecord);

router.post('/:toolId/borrow', protect, toolManager, borrowToolRecord);
router.put('/:toolId/return', protect, toolManager, returnToolRecord);
router.get('/:toolId/toolRecord', protect, toolManager, getOneToolIdRecord);

module.exports = router;
