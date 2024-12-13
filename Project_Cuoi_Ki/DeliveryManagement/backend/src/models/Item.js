const db = require('../configs/database');

const Item = {
    getAllItems:(callback) => {
        return db.query("SELECT * FROM item", (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    getItemById: (id, callback) => {
        return db.query("SELECT * FROM item WHERE id=?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results[0]);
        });
    },

    addItem: (data, callback)  => {
        return db.query(
            "INSERT INTO item(item_name, length, width, height, weight, item_order_code) VALUES(?, ?, ?, ?, ?, ?)",
            [data.item_name, data.length, data.width, data.height, data.weight, data.item_order_code], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
             });
    },

    deleteItem: function(id, callback) {
        return db.query("DELETE FROM item WHERE id=?", [id], (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    updateItem: function(data, callback) {
        return db.query(
            "UPDATE item SET item_name=?, length=?, width=?, height=?, weight=?, item_order_code=? WHERE id=?",
            [data.item_name, data.length, data.width, data.height, data.weight, data.item_order_code], (err, results) => {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, results);
            });
    }
};

module.exports = Item;