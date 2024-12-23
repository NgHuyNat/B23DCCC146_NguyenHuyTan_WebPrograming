import React, { useEffect, useState } from 'react';
import './Dispatch.css';
import { getAllOrders, getAllItems, getAllShippers, getAllPaymentTypes, assignShipperToOrder } from '../../configs/ApiConfigs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import avartar from '../../assets/avartar.png';
import PaginatedList from '../../components/paginated/PaginatedList';

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

  const handleAssignOrder = async (order_id, shipper_id) => {
    console.log("SelectedShippers:", selectedShippers);
    console.log('order_id:', order_id, 'shipper_id:', shipper_id);
    if (!shipper_id) {
      toast.warn("Vui lòng chọn một Shipper!");
      return;
    }

    const selectedShipper = shippers.find((shipper) => shipper.shipper_id === Number(shipper_id));

    // Kiểm tra shipper có tồn tại và trạng thái
    if (!selectedShipper || selectedShipper.status === "Busy" || selectedShipper.status === "Offline") {
      toast.warn("Shipper đang bận hoặc offline! Vui lòng chọn Shipper khác.");
      return;
    }

    try {
      // Gửi yêu cầu gán đơn hàng cho shipper
      const response = await assignShipperToOrder({
        order_id: order_id,
        shipper_id: shipper_id,
      });

      if (response.success) {
        // Cập nhật trạng thái đơn hàng và shipper trong state
        setAssignedOrders((prevAssignedOrders) => [
          ...prevAssignedOrders,
          { ...response.order, shipper_id: shipper_id }, // Thêm đơn hàng vào danh sách
        ]);

        // Xóa đơn hàng khỏi danh sách chưa gán
        setNonAssignedOrders((prevNonAssignedOrders) =>
          prevNonAssignedOrders.filter((order) => order.order_id !== order_id)
        );

        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.order_id === order_id ? { ...order, shipper_id: shipper_id } : order
          )
        );

        setShippers((prevShippers) =>
          prevShippers.map((shipper) =>
            shipper.shipper_id === Number(shipper_id) ? { ...shipper, status: "Busy" } : shipper
          )
        );

        toast.success(`Đơn hàng ${order_id} đã được gán cho Shipper ${selectedShipper.fullName}`);
      } else {
        toast.error(`Lỗi khi gán đơn hàng: ${response.message}`);
      }
    } catch (error) {
      toast.error(`Lỗi khi gán đơn hàng: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersResponse = await getAllOrders();
        setOrders(ordersResponse);

        // Phân loại đơn hàng đã gán và chưa gán
        const assigned = ordersResponse.filter((order) => order.shipper_id);
        const nonAssigned = ordersResponse.filter((order) => !order.shipper_id);

        setAssignedOrders(assigned);
        setNonAssignedOrders(nonAssigned);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  // useEffect(() => {
  //   const newOrders = orders.filter(order => !order.shipper_id);
  //   setNonAssignedOrders(newOrders);
  // }, [orders]); 



  const handleShipperChange = (order_id, shipper_id) => {
    console.log('order_id:', order_id, 'shipper_id:', shipper_id);
    setSelectedShippers((prevSelectedShippers) => ({
      ...prevSelectedShippers,
      [order_id]: shipper_id,
    }));
  };



  return (
    <>
      <div className="container-dispatch">
        {/* Danh sách shipper */}
        <div className="shipper-list">
          <h3>Shippers</h3>
          <PaginatedList
            items={shippers}
            itemsPerPage={4} // Hiển thị 2 shipper mỗi trang
            renderItem={(shipper) => (
              <div className="card-shipper" key={shipper.shipper_id}>
                <div className="card-image">
                  <img src={avartar} alt="Avatar" />
                </div>
                <div className="card-content">
                  <p><strong>ID:</strong> {shipper.shipper_id}</p>
                  <p><strong>Name:</strong> {shipper.fullName}</p>
                  <p><strong>Phone:</strong> {shipper.phoneNumber}</p>
                  <p><strong>Status:</strong> {shipper.status}</p>
                </div>
              </div>
            )}
          />
        </div>

        {/* Đơn hàng đã được gán */}
        <div className="list-assigned">
          <h3>Order Assigned</h3>
          <PaginatedList
            items={assignedOrders}
            itemsPerPage={3} // Hiển thị 3 đơn hàng mỗi trang
            renderItem={(order) => {
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
                    <p><strong>Total Fee:</strong> {order.total_fee}</p>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Đơn hàng chưa được gán */}
        <div className="list-non-assigned">
          <h3>Lastest Order</h3>
          <PaginatedList
            items={nonAssignedOrders}
            itemsPerPage={3} // Hiển thị 3 đơn hàng mỗi trang
            renderItem={(order) => {
              const item = items.find((item) => item.item_id === order.item_id) || {};
              const paymentType = paymentTypes.find((type) => type.payment_type_id === order.payment_type_id) || {};
              return (
                <div className="order-assigned-card" key={order.order_id}>
                  <div className="card-content">
                    <p>
                      <strong>ID:</strong> {order.order_id}
                    </p>
                    <p>
                      <strong>Item Name:</strong> {item.item_name}
                    </p>
                    <p>
                      <strong>To Phone:</strong> {order.to_phone}
                    </p>
                    <p>
                      <strong>To Address:</strong> {order.to_address}, {order.to_ward}, {order.to_district},{' '}
                      {order.to_province}
                    </p>
                    <p>
                      <strong>Payment Type:</strong> {paymentType.payment_type_name}
                    </p>
                    <p>
                      <strong>Note:</strong>{' '}
                      {(() => {
                        try {
                          const notes = JSON.parse(order.required_note);
                          return Array.isArray(notes) ? notes.join(', ') : order.required_note;
                        } catch (e) {
                          return order.required_note; // Hiển thị giá trị gốc nếu không parse được
                        }
                      })()}
                    </p>
                    <p>
                      <strong>Total Fee:</strong> {order.total_fee}
                    </p>
                  </div>

                  {/* Dropdown chọn Shipper */}
                  <div className='select-shipper'>
                    <select
                      onChange={(e) => handleShipperChange(order.order_id, e.target.value)}
                      value={selectedShippers[order.order_id] || ''}
                    >
                      <option value="">Chọn Shipper</option>
                      {shippers.map((shipper) => (
                        <option
                          key={shipper.shipper_id}
                          value={shipper.shipper_id}
                          disabled={shipper.status === 'Busy' || shipper.status === 'Offline'} // Disabled nếu Shipper không khả dụng
                        >
                          {shipper.fullName} - {shipper.phoneNumber}{' '}
                          {shipper.status === 'Busy' ? '(Bận)' : shipper.status === 'Offline' ? '(Offline)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Nút nhận đơn */}
                  <div className='assign-button'>
                    <button
                      className="assign-button"
                      onClick={() => handleAssignOrder(order.order_id, selectedShippers[order.order_id])}
                    >
                      Nhận Đơn
                    </button>
                  </div>
                </div>
              );
            }}
          />
        </div>

      </div>
      <ToastContainer />
    </>
  );
}

export default Dispatch;
