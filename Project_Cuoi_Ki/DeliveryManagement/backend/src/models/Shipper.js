const db = require('../configs/database');

const Shipper = {
    getAllShippers:(callback) => {
        return db.query("SELECT * FROM shippers", (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    getShipperById: (shipper_id) => {
        return new Promise((resolve, reject) => {
          db.query("SELECT * FROM shippers WHERE shipper_id = ?", [shipper_id], (err, results) => {
            if (err) {
              return reject(err);
            }
            resolve(results[0]); // Trả về thông tin shipper đầu tiên hoặc `null`
          });
        });
      },
      

    addShipper: (data, callback)  => {
        return db.query(
            "INSERT INTO shippers(fullName, phoneNumber, email, address, status, vehicleType, licensePlate) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [data.fullName, data.phoneNumber, data.email, data.address, data.status, data.vehicleType, data.licensePlate], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
             });
    },

    deleteShipper: function(id, callback) {
        return db.query("DELETE FROM shippers WHERE id=?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    updateShipper: function(data, callback) {
        return db.query(
            "UPDATE shippers SET fullName=?, phoneNumber=?, email=?, address=?, status=?, vehicleType=?, licensePlate=? WHERE id=?",
            [data.fullName, data.phoneNumber, data.email, data.address, data.status, data.vehicleType, data.licensePlate], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
            });
    }
};

module.exports = Shipper;