const express = require('express');
const router = express.Router();
const DistrictController = require('../controllers/DistrictController');

router.get('/', DistrictController.getAllDistricts);
router.post('/', DistrictController.addDistrict);
router.put('/:id', DistrictController.updateDistrict);
router.delete('/:id', DistrictController.deleteDistrict);
router.get('/districtbyprovince/:province_id', DistrictController.getDistrictsByProvinceId);

module.exports = router;