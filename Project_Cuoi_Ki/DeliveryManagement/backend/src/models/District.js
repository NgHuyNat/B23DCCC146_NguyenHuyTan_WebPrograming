const db = require('../configs/database');

const District = {
    getAllDistricts:(callback) => {
        return db.query("SELECT * FROM district", (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    getDistrictById: (id, callback) => {
        return db.query("SELECT * FROM district WHERE district_id=?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results[0]);
        });
    },

    getDistrictsByProvinceId: (province_id, callback) => {
        const query = "SELECT * FROM district WHERE province_id = ?";
        db.query(query, [province_id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    addDistrict: (data, callback)  => {
        return db.query(
            "INSERT INTO district(province_id, district_name, code, type, support_type, name_extension, order_id) VALUES(?, ?, ?, ?, ?, ?, ?)",
            [data.province_id, data.district_name, data.code, data.type, data.support_type, data.name_extension, data.order_id], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
             });
    },

    deleteDistrict: function(id, callback) {
        return db.query("DELETE FROM district WHERE id=?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    updateDistrict: function(data, callback) {
        return db.query(
            "UPDATE district SET province_id = ?, district_name = ?, code = ?, type = ?, support_type = ?, name_extension = ?, order_id = ?   WHERE id=?",
            [data.province_id, data.district_name, data.code, data.type, data.support_type, data.name_extension, data.order_id], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
            });
    }
};

module.exports = District;