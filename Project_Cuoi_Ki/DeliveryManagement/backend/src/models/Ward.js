const db = require('../configs/database');

const Ward = {
    getAllWards:(callback) => {
        return db.query("SELECT * FROM ward", (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    getWardById: (ward_id, callback) => {
        return db.query("SELECT * FROM ward WHERE ward_id=?", [ward_id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results[0]);
        });
    },

    addWard: (data, callback)  => {
        return db.query(
            "INSERT INTO ward(district_id, ward_name, name_extension, support_type, order_id) VALUES(?, ?, ?, ?, ?)",
            [data.district_id, data.ward_name, data.name_extension, data.support_type, data.order_id], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
             });
    },

    deleteWard: function(id, callback) {
        return db.query("DELETE FROM ward WHERE id=?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    updateWard: function(data, callback) {
        return db.query(
            "UPDATE ward SET district_id = ?, ward_name = ?, name_extension = ?, support_type = ?, order_id = ? WHERE id=?",
            [data.district_id, data.ward_name, data.name_extension, data.support_type, data.order_id], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
            });
    },

    getWardsByDistrictId: (district_id, callback) => {
        const query = "SELECT * FROM ward WHERE district_id = ?";
        db.query(query, [district_id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    }
};

module.exports = Ward;