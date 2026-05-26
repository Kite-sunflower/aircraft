const express = require('express');
const router = express.Router();

const {
  distributeMaterial,
  getAllRecords,
  getOneRecords,
  getOneMaterialIdRecords,
  deleteOneRecords,
  deleteBatchRecords,
} = require('../controllers/materialReceiveController');

const { protect, admin, materialManager } = require('../middleware/auth');

router.post('/batch/delete', protect, admin, deleteBatchRecords);
router.get('/', protect, materialManager, getAllRecords);
router.get('/:id', protect, materialManager, getOneRecords);
router.delete('/:id/delete', protect, admin, deleteOneRecords);

router.post('/:materialId/distribute', protect, materialManager, distributeMaterial);
router.get('/:materialId/materialRecord', protect, materialManager, getOneMaterialIdRecords);
module.exports = router;
