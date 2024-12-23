const db = require('../configs/database');

const Province = {
    getAllProvinces: (callback) => {
        return db.query("SELECT * FROM province", (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    getProvinceById: (id, callback) => {
        return db.query("SELECT * FROM province WHERE province_id=?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results[0]);
        });
    },

    addProvince: (data, callback) => {
        return db.query(
            "INSERT INTO province(province_name, name_extension ,order_id) VALUES(?, ?, ?)",
            [data.province_name, data.name_extension, data.order_id], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
            });
    },

    deleteProvince: function (id, callback) {
        return db.query("DELETE FROM province WHERE id=?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    updateProvince: function (data, callback) {
        return db.query(
            "UPDATE province SET province_name = ?, name_extension = ? ,order_id = ? WHERE id=?",
            [data.province_name, data.name_extension, data.order_id], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
            });
    }
};

module.exports = Province;