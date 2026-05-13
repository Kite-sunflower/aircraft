const express = require('express');
const router = express.Router();
const {
  getAllMaterials,
  getOneMaterials,
  createMaterials,
  updateMaterials,
  deleteMaterials,
  deleteBatchMaterials,
  dealMaterials,
} = require('../controllers/materalsController');

const { protect, admin, materialsDist } = require('../middleware/auth');

router.delete('/batch/delete', protect, admin, deleteBatchMaterials);
router.get('/', protect, getAllMaterials);
router.get('/:id', protect, getOneMaterials);
router.post('/create', protect, admin, createMaterials);
router.put('/:id/update', protect, materialsDist, updateMaterials);
router.delete('/:id/delete', protect, admin, deleteMaterials);

router.post('/:id/deal', protect, dealMaterials);

module.exports = router;
