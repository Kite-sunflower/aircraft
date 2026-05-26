const express = require('express');
const router = express.Router();

const {
  getAllMaterial,
  getOneMaterial,
  createMaterial,
  updateMaterial,
  deleteMaterial,
  deleteBatchMaterial,
} = require('../controllers/materalController');

const { protect, admin, materialManager } = require('../middleware/auth');

router.post('/batch/delete', protect, admin, deleteBatchMaterial);
router.get('/', protect, getAllMaterial);
router.get('/:id', protect, getOneMaterial);
router.post('/create', protect, admin, createMaterial);
router.put('/:id/update', protect, materialManager, updateMaterial);
router.delete('/:id/delete', protect, admin, deleteMaterial);

module.exports = router;
