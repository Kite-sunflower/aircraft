const express = require('express');
const router = express.Router();

const {
  borrowToolRecord,
  returnToolRecord,
  getAllRecord,
  getOneRecord,
  getOneToolIdRecord,
  createRecord,
  updateRecord,
  deleteOneRecord,
  batchDeleteRecord,
} = require('../controllers/toolBorrowController');

const { protect, admin, toolManager } = require('../middleware/auth');

router.delete('/batch/delete', protect, admin, batchDeleteRecord);
router.get('/', protect, getAllRecord);
router.get('/:id', protect, getOneRecord);
router.post('/create', protect, admin, createRecord);
router.put('/:id/update', protect, toolManager, updateRecord);
router.delete('/:id/delete', protect, admin, deleteOneRecord);

router.post('/:id/borrow', protect, toolManager, borrowToolRecord);
router.post('/:id/return', protect, returnToolRecord);
router.get('/:toolId/toolRecord', protect, getOneToolIdRecord);

module.exports = router;
