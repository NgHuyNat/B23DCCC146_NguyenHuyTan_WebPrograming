const db = require('../configs/database');
const { updateShipper } = require('./Shipper');

const Order = {
    getAllOrders:(callback) => {
        return db.query("SELECT * FROM orders", (err, results) => {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            return callback(null, results);
        });
    },

    getOrderById: (order_id) => {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM orders WHERE order_id = ?", [order_id], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results[0]); // Trả về đơn hàng đầu tiên hoặc `null`
        });
      });
    },
    

    addOrder: (data, callback) => {
        return db.query(
          "INSERT INTO orders(note, from_name, from_phone, from_address, from_ward, from_district, from_province, return_phone, return_address, return_ward, return_district, return_province, to_name, to_phone, to_address, to_ward, to_district, to_province, required_note, cod_amount, total_fee, content, weight, height, pick_station_id, deliver_station_id, payment_type_id, item_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            data.note, data.from_name, data.from_phone, data.from_address, data.from_ward, data.from_district, data.from_province,
            data.return_phone, data.return_address, data.return_ward, data.return_district, data.return_province,
            data.to_name, data.to_phone, data.to_address, data.to_ward, data.to_district, data.to_province,
            data.required_note, data.cod_amount, data.total_fee, data.content, data.weight, data.height,
            data.pick_station_id, data.deliver_station_id, data.payment_type_id, data.item_id
          ], 
          (err, results) => {
            if (err) {
              console.log(err);
              return callback(err, null);
            }
            return callback(null, results);
          });
      },
    
      updateOrder: (id, data, callback) => {
        return db.query(
          "UPDATE orders SET note = ?, from_name=?, from_phone=?, from_address=?, from_ward=?, from_district=?, from_province=?, return_phone=?, return_address=?, return_ward=?, return_district=?, return_province=?, to_name=?, to_phone=?, to_address=?, to_ward=?, to_district=?, to_province = ?, required_note=?, cod_amount=?, total_fee = ?, content=?, weight=?, height=?, pick_station_id=?, deliver_station_id=?, payment_type_id=?, item_id=?, shipper_id=? WHERE order_id=?",
          [
            data.from_name, data.from_phone, data.from_address, data.from_ward, data.from_district, data.from_province, 
            data.return_phone, data.return_address, data.return_ward, data.return_district, 
            data.return_province, data.to_name, data.to_phone, data.to_address, data.to_ward, 
            data.to_district, data.to_province, data.required_note, data.cod_amount, data.content, data.weight, 
            data.height, data.pick_station_id, data.deliver_station_id,
            data.payment_type_id, data.item_id, data.shipper_id, data.note,  data.total_fee, id
          ], 
          (err, results) => {
            if (err) {
              console.log(err);
              return callback(err, null);
            }
            return callback(null, results);
          });
      },
    
      deleteOrder: (id, callback) => {
        return db.query("DELETE FROM orders WHERE order_id=?", [id], (err, results) => {
          if (err) {
            console.log(err);
            return callback(err, null);
          }
          return callback(null, results);
        });
      },

      updateShipperToOrder: (order_id, shipper_id) => {
        return new Promise((resolve, reject) => {
          db.query(
            "UPDATE orders SET shipper_id = ? WHERE order_id = ?",
            [shipper_id, order_id],
            (err, results) => {
              if (err) {
                console.log(err);
                return reject(err); // Trả về lỗi nếu có
              }
              resolve(results); // Trả về kết quả nếu thành công
            }
          );
        });
      },
      
    };

module.exports = Order;