const express = require('express');
const router = express.Router();
const WardController = require('../controllers/WardController');

router.get('/', WardController.getAllWards);
router.get('/:id', WardController.getWardById);
router.post('/', WardController.addWard);
router.delete('/:id', WardController.deleteWard);
router.put('/', WardController.updateWard);
router.get('/wardbydistrict/:district_id', WardController.getWardsByDistrictId);

module.exports = router;