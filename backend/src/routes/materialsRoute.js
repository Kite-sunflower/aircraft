const express = reqiure('express');
const router = express.Router();
const {
  getAllMaterials,
  getOneMaterials,
  createMaterials,
  updateMaterials,
  deleteMaterials,
  deleteBatchMaterials,
  receiveMaterials,
  statusMaterials,
} = require('../controllers/materialsControlller');

const { protect, admin, materialsDist } = require('../middleware/auth');

router.delete('/batch/delete', protect, admin, deleteBatchMaterials);
router.get('/', protect, getAllMaterials);
router.get('/:id', protect, getOneMaterials);
router.post('/create', protect, materialsDist, createMaterials);
router.put('/:id/update', protect, materialsDist, updateMaterials);
router.delete('/:id/delete', protect, admin, deleteMaterials);

router.post('/:id', protect, receiveMaterials);
router.post('/:id/update', materialsDist, statusMaterials);

module.exports = router;
