const express = require('express');
const router = express.Router();
const PaymentTypeController = require('../controllers/PaymentTypeController');

router.get('/', PaymentTypeController.getAllPaymentTypes);

module.exports = router;