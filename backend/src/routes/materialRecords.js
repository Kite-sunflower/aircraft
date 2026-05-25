const express = require('express');
const router = express.Router();

const {
  distributeMaterial,
  getAllRecords,
  getOneRecords,
  getOneMaterialIdRecords,
  createRecords,
  updateRecords,
  deleteOneRecords,
  batchDeleteRecords,
} = require('../controllers/materalReceiveController');

const { protect, admin, materialManager } = require('../middleware/auth');

router.post('/batch/delete', protect, admin, batchDeleteRecords);
router.get('/', protect, getAllRecords);
router.get('/:id', protect, getOneRecords);
router.post('/create', protect, admin, createRecords);
router.put('/:id/update', protect, materialManager, updateRecords);
router.delete('/:id/delete', protect, admin, deleteOneRecords);

router.post('/:id/distribute', protect, distributeMaterial);
router.get('/:materialId/materialRecord', protect, getOneMaterialIdRecords);
module.exports = router;
