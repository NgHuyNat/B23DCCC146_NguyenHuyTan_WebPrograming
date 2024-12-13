const express = require('express');
const router = express.Router();
const ShipperController = require('../controllers/ShipperController');

router.get('/', ShipperController.getAllShippers);
router.get('/:id', ShipperController.getShipperById);
router.post('/', ShipperController.addShipper);
router.delete('/:id', ShipperController.deleteShipper);
router.put('/', ShipperController.updateShipper);

module.exports = router;