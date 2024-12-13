import React, { useEffect, useState } from 'react';
import './Dispatch.css';
import { getAllOrders, getAllItems, getAllShippers, getAllPaymentTypes, assignShipperToOrder } from '../../configs/ApiConfigs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dispatch() {
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [shippers, setShippers] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [nonAssignedOrders, setNonAssignedOrders] = useState([]);
  const [assignedOrders, setAssignedOrders] = useState([]);
  const [selectedShippers, setSelectedShippers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await getAllOrders();
        const itemsResponse = await getAllItems();
        const shippersResponse = await getAllShippers();
        const paymentTypesResponse = await getAllPaymentTypes();

        setOrders(ordersResponse);
        setItems(itemsResponse);
        setShippers(shippersResponse);
        setPaymentTypes(paymentTypesResponse);

        const newOrders = ordersResponse.filter(order => !order.shipper_id);
        setNonAssignedOrders(newOrders);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Hàm xử lý nhận đơn của shipper
  const handleAssignOrder = async (orderId) => {
    const selectedShipperId = selectedShippers[orderId];
    if (!selectedShipperId) {
      toast.warn('Vui lòng chọn Shipper!');
      return;
    }

    const selectedShipper = shippers.find(shipper => shipper.shipper_id === selectedShipperId);
    if (selectedShipper && selectedShipper.status === 'Đang bận') {
      toast.warn('Shipper này đang bận! Vui lòng chọn Shipper khác.');
      return;
    }

    try {
      const response = await assignShipperToOrder({ order_id: orderId, shipper_id: selectedShipperId });

      console.log('Response:', response);

      if (response.success) {
        const updatedNonAssignedOrders = nonAssignedOrders.filter(order => order.order_id !== orderId);
        setNonAssignedOrders(updatedNonAssignedOrders);

        const updatedAssignedOrders = [...assignedOrders, response.order];
        setAssignedOrders(updatedAssignedOrders);

        // Cập nhật trạng thái của Shipper
        const updatedShippers = shippers.map(shipper =>
          shipper.shipper_id === selectedShipperId
            ? { ...shipper, status: 'Đang bận' }
            : shipper
        );
        setShippers(updatedShippers);

        toast.warn('Đơn hàng đã được gán cho Shipper:', selectedShipper.fullname);
      } else {
        toast.error('Lỗi khi gán đơn:', response.message);
      }
    } catch (error) {
      toast.error('Lỗi khi gán đơn:', error);
    }
  };

  const handleShipperChange = (orderId, shipperId) => {
    setSelectedShippers((prevSelectedShippers) => ({
      ...prevSelectedShippers,
      [orderId]: shipperId, // Ghi lại Shipper được chọn cho từng đơn hàng
    }));
  };
  


  return (
    <>
      <div className="header">
        <div className="shipper-header">
          <p>Shipper</p>
        </div>
        <div className='order-assigned'>
          <p>Order Assigned</p>
        </div>
        <div className="orders-header">
          <p>Lastest Order</p>
        </div>
      </div>

      <div className="container-dispatch">
        {/* Danh sách shipper */}
        <div className="shipper-list">
          {shippers.map((shipper) => (
            <div className="card" key={shipper.shipper_id}>
              <div className="card-image"></div>
              <div className="card-content">
                <p><strong>ID:</strong> {shipper.shipper_id}</p>
                <p><strong>Name:</strong> {shipper.fullname}</p>
                <p><strong>Phone:</strong> {shipper.phoneNumber}</p>
                <p><strong>Status:</strong> {shipper.status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Đơn hàng đã được gán */}
        <div className="list-assigned">
          {assignedOrders.map((order) => {
            const item = items.find((item) => item.item_id === order.item_id) || {};
            const shipper = shippers.find((shipper) => shipper.shipper_id === order.shipper_id) || {};
            const paymentType = paymentTypes.find((type) => type.payment_type_id === order.payment_type_id) || {};
            return (
              <div className="order-assigned-card" key={order.order_id}>
                <div className="card-content">
                  <p><strong>ID:</strong> {order.order_id}</p>
                  <p><strong>Item Name:</strong> {item.item_name}</p>
                  <p><strong>To Phone:</strong> {order.to_phone}</p>
                  <p><strong>To Address:</strong> {order.to_address}, {order.to_ward}, {order.to_district}, {order.to_province}</p>
                  <p><strong>Payment Type:</strong> {paymentType.name}</p>
                  <p><strong>Note:</strong> {shipper.phoneNumber}</p>
                  <p><strong>Total Fee:</strong> {shipper.status}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Đơn hàng chưa được gán */}
        <div className="list-non-assigned">
          {nonAssignedOrders.map((order) => {
            const item = items.find((item) => item.item_id === order.item_id) || {};
            const paymentType = paymentTypes.find((type) => type.payment_type_id === order.payment_type_id) || {};
            return (
              <div className="order-assigned-card" key={order.order_id}>
                <div className="card-content">
                  <p><strong>ID:</strong> {order.order_id}</p>
                  <p><strong>Item Name:</strong> {item.item_name}</p>
                  <p><strong>To Phone:</strong> {order.to_phone}</p>
                  <p><strong>To Address:</strong> {order.to_address}, {order.to_ward}, {order.to_district}, {order.to_province}</p>
                  <p><strong>Payment Type:</strong> {paymentType.payment_type_name}</p>
                  <p><strong>Note:</strong> {order.required_note}</p>
                  <p><strong>Total Fee:</strong> {order.total_fee}</p>
                </div>

                <div>
                  <select
                    onChange={(e) => handleShipperChange(order.order_id, e.target.value)}
                    value={selectedShippers[order.order_id] || ''}
                  >
                    <option value="">Chọn Shipper</option>
                    {shippers.map((shipper) => (
                      <option
                        key={shipper.shipper_id}
                        value={shipper.shipper_id}
                        disabled={shipper.status === 'Đang bận'}
                      >
                        {shipper.fullname} - {shipper.phoneNumber} {shipper.status === 'Đang bận' ? '(Bận)' : ''}
                      </option>
                    ))}
                  </select>

                </div>
                <div>
                  {/* Nút nhận đơn */}
                  <button
                    className="assign-button"
                    onClick={() => handleAssignOrder(order.order_id)}
                  >
                    Nhận Đơn
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Dispatch;
