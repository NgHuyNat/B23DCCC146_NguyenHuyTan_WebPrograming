const db = require('../configs/database');
const Order = require('../models/Orders');

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

exports.getOrderById = (req, res) => {
    Order.getOrderById(req.params.id, (err, order) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving order."
            });
        } else {
            res.send(order);
        }
    });
}

exports.addOrder = (req, res) => {
    const order = req.body;

    if (!order.item_id) {
        return res.status(400).send({
            message: "Vui lòng cung cấp item_id."
        });
    }

    // Kiểm tra xem item_id có tồn tại trong bảng `item` không
    const checkItemQuery = "SELECT * FROM item WHERE item_id = ?";
    db.query(checkItemQuery, [order.item_id], (err, itemResults) => {
        if (err) {
            console.error(err);
            return res.status(500).send({
                message: "Lỗi server khi kiểm tra item_id."
            });
        }

        if (itemResults.length === 0) {
            return res.status(404).send({
                message: `item_id ${order.item_id} không tồn tại.`
            });
        }

        // Gọi model để thêm đơn hàng
        Order.addOrder(order, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "Đã xảy ra lỗi khi tạo đơn hàng."
                });
            }
            res.status(201).send({
                message: "Tạo đơn hàng thành công.",
                data
            });
        });
    });
};


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


exports.assignShipperToOrder = (req, res) => {
    const { order_id, shipper_id } = req.body;

    // Kiểm tra đầu vào
    if (!order_id || !shipper_id) {
        return res.status(400).json({ success: false, message: 'Order ID và Shipper ID là bắt buộc' });
    }

    // Lấy thông tin đơn hàng
    Order.getOrderById(order_id, (err, order) => {
        if (err) {
            console.error('Lỗi khi lấy đơn hàng:', err);
            return res.status(500).json({ success: false, message: 'Lỗi hệ thống' });
        }

        if (!order) {
            return res.status(404).json({ success: false, message: 'Không tìm thấy đơn hàng' });
        }

        // Kiểm tra nếu đơn hàng đã được gán shipper
        if (order.shipper_id) {
            return res.status(400).json({ success: false, message: 'Đơn hàng đã được gán shipper' });
        }

        // Cập nhật shipper cho đơn hàng
        Order.updateShipperToOrder(order_id, shipper_id, (err, updateResult) => {
            if (err) {
                console.error('Lỗi khi cập nhật shipper:', err);
                return res.status(500).json({ success: false, message: 'Lỗi hệ thống' });
            }

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
        });
    });
};

