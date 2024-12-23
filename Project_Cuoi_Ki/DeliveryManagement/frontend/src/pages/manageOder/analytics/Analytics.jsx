import React, { useState, useEffect } from 'react'
import { getAllOrders, getAllItems, getAllShippers } from '../../../configs/ApiConfigs';
import { GrMoney } from "react-icons/gr";
import { CiShoppingCart } from "react-icons/ci";
import { IoPersonOutline } from "react-icons/io5";
import './Analytics.css';


function Analytics() {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [shippers, setShippers] = useState([]);

    const fetchData = async () => {
        try {
            const ordersResponse = await getAllOrders();
            const itemsResponse = await getAllItems();
            const shippersResponse = await getAllShippers();

            setOrders(ordersResponse);
            setItems(itemsResponse);
            setShippers(shippersResponse);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className='container-analytics'>
                <div className='card-body'>
                    <div className='card-infor'>
                        <GrMoney />
                        <p>Revenue</p>
                    </div>
                    <div className='card-infor'>
                        <CiShoppingCart />
                        <p>Order</p>
                    </div>
                    <div className='card-infor'>
                        <IoPersonOutline />
                        <p>Shipper</p>
                    </div>
                    <div className='card-infor'></div>
                </div>
            </div>
        </>

    )
}

export default Analytics
