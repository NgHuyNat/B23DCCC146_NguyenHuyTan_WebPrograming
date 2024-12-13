import React, { useState, useEffect } from 'react';
import './ViewOder.css';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getAllItems, getAllShippers, getAllPaymentTypes } from '../../../configs/ApiConfigs';

function ViewOder() {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [shippers, setShippers] = useState([]);
    const [paymentTypes, setPaymentType] = useState([]);

    const linkToAddOrder = useNavigate();

    const handleAddOrder = () => {
        linkToAddOrder('/manager-oder/create-order');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersResponse = await getAllOrders(); // Không cần gọi `.json()` vì `axios` trả về `response.data`
                const itemsResponse = await getAllItems();
                const shippersResponse = await getAllShippers();
                const paymentTypesResponse = await getAllPaymentTypes();
    
                console.log('Orders:', ordersResponse); // Kiểm tra dữ liệu trả về
                console.log('Items:', itemsResponse);
                console.log('Shippers:', shippersResponse);
                console.log('Payment Types:', paymentTypesResponse);
    
                setOrders(ordersResponse); // Sử dụng `response.data` từ API
                setItems(itemsResponse);
                setShippers(shippersResponse);
                setPaymentType(paymentTypesResponse);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);
    

    return (
        <>
            <div className="header">
                <div className="search">
                    <input type="search" placeholder="Search" />
                </div>
                <div className="add" onClick={handleAddOrder}>
                    <button>+ New Order</button>
                </div>
            </div>

            <div>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>Order No.</th>
                            <th>Name</th>
                            <th>From Province</th>
                            <th>To Province</th>
                            <th>Required Note</th>
                            <th>Payment Type</th>
                            <th>Total Fee</th>
                            <th>Cod Amount</th>
                            <th>Shipper</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => {
                            const item = items.find((item) => item.item_id === order.item_id) || {};
                            const shipper = shippers.find((shipper) => shipper.shipper_id === order.shipper_id) || {};
                            const paymentType = paymentTypes.find((type) => type.payment_type_id === order.payment_type_id) || {};

                            return (
                                <tr key={order.order_id}> 
                                    <td>{order.order_id}</td>
                                    <td>{item.item_name || 'N/A'}</td>
                                    <td>{order.from_province}</td>
                                    <td>{order.to_province}</td>
                                    <td>{order.required_note}</td>
                                    <td>{paymentType.payment_type_name || 'N/A'}</td>
                                    <td>{order.total_fee}</td>
                                    <td>{order.cod_amount}</td>
                                    <td>{shipper.fullname || 'N/A'}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ViewOder;
