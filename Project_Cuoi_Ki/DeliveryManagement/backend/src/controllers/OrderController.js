const Order = require('../models/Orders');
const Shipper = require('../models/Shipper');
const Item = require('../models/Item');

exports.getAllOrders = (req, res) => {
    Order.getAllOrders((err, orders) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        } else {
            res.send(orders);
        }
    });
}

exports.addOrder = (req, res) => {
    const order = req.body;
    Order.addOrder(order, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        } else {
            res.send(data);
        }
    });
}

exports.updateOrder = (req, res) => {
    const id = req.params.id;
    const order = req.body;
    Order.updateOrder(id, order, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while updating the Order."
            });
        } else {
            res.send(data);
        }
    });
}

exports.deleteOrder = (req, res) => {
    const id = req.params.id;
    Order.deleteOrder(id, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the Order."
            });
        } else {
            res.send(data);
        }
    });
}


exports.assignShipperToOrder = async (req, res) => {
    const { order_id, shipper_id } = req.body;
  
    // Kiểm tra đầu vào
    if (!order_id || !shipper_id) {
      return res.status(400).json({ success: false, message: 'Order ID và Shipper ID là bắt buộc' });
    }
  
    try {
      // Lấy thông tin đơn hàng
      const order = await Order.getOrderById(order_id);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
      }
  
      // Kiểm tra nếu đơn hàng đã được gán shipper
      if (order.shipper_id) {
        return res.status(400).json({ success: false, message: 'Đơn hàng đã được gán shipper' });
      }
  
      // Cập nhật shipper cho đơn hàng
      const updateResult = await Order.updateShipperToOrder(order_id, shipper_id);
      if (updateResult.affectedRows === 0) {
        return res.status(400).json({ success: false, message: 'Không có đơn hàng nào được cập nhật' });
      }
  
      return res.status(200).json({
        success: true,
        message: 'Đơn hàng đã được gán cho shipper',
        order: {
          ...order,
          shipper_id,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Lỗi hệ thống', error: err.message });
    }
  };
  