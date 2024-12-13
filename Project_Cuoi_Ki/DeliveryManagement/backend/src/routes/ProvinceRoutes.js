const express = require('express');
const router = express.Router();
const ProvinceController = require('../controllers/ProvinceController');

router.get('/', ProvinceController.getAllProvinces);
router.get('/:id', ProvinceController.getProvinceById);
router.post('/', ProvinceController.addProvince);
router.delete('/:id', ProvinceController.deleteProvince);
router.put('/', ProvinceController.updateProvince);

module.exports = router;