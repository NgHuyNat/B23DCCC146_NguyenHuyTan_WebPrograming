const PaymentType = require('../models/PaymentType');

exports.getAllPaymentTypes = (req,res) => {
    PaymentType.getAllPaymentTypes((err, paymentTypes) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving payment types."
            });
        } else {
            res.send(paymentTypes);
        }
    });
}