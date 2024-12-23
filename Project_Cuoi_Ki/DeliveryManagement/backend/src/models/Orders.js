const db = require('../configs/database');
const { updateShipper } = require('./Shipper');

const Order = {
  getAllOrders: (callback) => {
    return db.query("SELECT * FROM orders", (err, results) => {
      if (err) {
        console.log(err);
        return callback(err, null);
      }
      return callback(null, results);
    });
  },

  getOrderById: (id, callback) => {
    return db.query("SELECT * FROM orders WHERE order_id=?", [id], (err, results) => {
        if (err) {
            console.log(err);
            return callback(err, null);
        }
        return callback(null, results[0]);
    });
},


  addOrder: (data, callback) => {
    const required_note_json = Array.isArray(data.required_note)
      ? JSON.stringify(data.required_note) // Nếu là mảng, stringify
      : data.required_note; // Nếu đã là chuỗi JSON, giữ nguyên
    return db.query(
      "INSERT INTO orders(note, from_name, from_phone, from_address, from_ward, from_district, from_province, return_phone, return_address, return_ward, return_district, return_province, to_name, to_phone, to_address, to_ward, to_district, to_province, required_note, cod_amount, total_fee, content, weight, height, pick_station_id, deliver_station_id, payment_type_id, item_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        data.note, data.from_name, data.from_phone, data.from_address, data.from_ward, data.from_district, data.from_province,
        data.return_phone, data.return_address, data.return_ward, data.return_district, data.return_province,
        data.to_name, data.to_phone, data.to_address, data.to_ward, data.to_district, data.to_province,
        required_note_json, data.cod_amount, data.total_fee, data.content, data.weight, data.height,
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
        data.payment_type_id, data.item_id, data.shipper_id, data.note, data.total_fee, id
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

  updateShipperToOrder: (order_id, shipper_id, callback) => {
    db.query(
        "UPDATE orders SET shipper_id = ? WHERE order_id = ?",
        [shipper_id, order_id],
        (err, results) => {
            if (err) {
                console.log("Lỗi khi cập nhật đơn hàng:", err);
                return callback(err, null); // Gọi callback với lỗi
            }
            callback(null, results); // Gọi callback với kết quả
        }
    );
},


};

module.exports = Order;