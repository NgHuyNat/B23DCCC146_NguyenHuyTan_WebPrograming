const db = require('../configs/database');

const PaymentType = {
    getAllPaymentTypes:(callback) => {
        return db.query("SELECT * FROM payment_type", (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    }
}

module.exports = PaymentType;