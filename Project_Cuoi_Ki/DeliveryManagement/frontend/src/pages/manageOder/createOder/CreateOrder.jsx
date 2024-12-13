import React, { useState, useEffect } from 'react';
import './CreateOrder.css';
import Select from 'react-select';
import instance from '../../../configs/ApiConfigs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateOrder() {
    const [provinces, setProvinces] = useState([]); // Danh sách tỉnh/thành phố
    const [districts, setDistricts] = useState([]); // Danh sách quận/huyện
    const [wards, setWards] = useState([]);
    const [loadingDistricts, setLoadingDistricts] = useState(false); // Loading quận/huyện
    const [loadingWards, setLoadingWards] = useState(false); //
    const [senderProvince, setSenderProvince] = useState(null);
    const [senderDistricts, setSenderDistricts] = useState([]);
    const [senderDistrict, setSenderDistrict] = useState(null);
    const [senderWards, setSenderWards] = useState([]);
    const [senderWard, setSenderWard] = useState(null);

    const [receiverProvince, setReceiverProvince] = useState(null);
    const [receiverDistricts, setReceiverDistricts] = useState([]);
    const [receiverDistrict, setReceiverDistrict] = useState(null);
    const [receiverWards, setReceiverWards] = useState([]);
    const [receiverWard, setReceiverWard] = useState(null);

    const [returnProvince, setReturnProvince] = useState(null);
    const [returnDistricts, setReturnDistricts] = useState([]);
    const [returnDistrict, setReturnDistrict] = useState(null);
    const [returnWards, setReturnWards] = useState([]);
    const [returnWard, setReturnWard] = useState(null);

    const [newItem, setNewItem] = useState({
        item_name: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        item_order_code: "",
    });

    const [newOders, setNewOders] = useState({
        from_name: "",
        from_phone: "",
        from_address: "",
        from_district: "",
        from_province: "",
        from_ward: "",
        return_phone: "",
        return_address: "",
        return_ward: "",
        return_district: "",
        return_province: "",
        to_name: "",
        to_phone: "",
        to_address: "",
        to_ward: "",
        to_district: "",
        to_province: "",
        required_note: "",
        note: "",
        cod_amount: "",
        total_fee: "",
        content: "",
        weight: "",
        height: "",
        pick_station_id: "",
        deliver_station_id: "",
        payment_type_id: "",
        item_id: "",
        shipper_id: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOders({
            ...newOders,
            [name]: value,
        });
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem({
            ...newItem,
            [name]: value,
        });
    };

    const fetchProvinces = async () => {
        try {
            // Gọi API lấy tất cả các tỉnh
            console.log("Fetching provinces...");
            const response = await instance.get("/province/");
            console.log("Fetched provinces:", response.data);
            setProvinces(response.data.map((item) => ({
                value: item.province_id, // Sử dụng `province_id` từ dữ liệu
                label: item.province_name, // Sử dụng `province_name` từ dữ liệu
            })));
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };

    const fetchDistricts = async (province_id) => {
        setLoadingDistricts(true);
        try {
            console.log("Fetching districts for province_id:", province_id);
            const response = await instance.get(`/district/districtbyprovince/${province_id}`);
            const districtsData = response.data.map((item) => ({
                value: item.district_id,
                label: item.district_name,
            }));
            console.log("Fetched districts:", districtsData);
            setSenderDistricts(districtsData); // Set các quận huyện khác cho các bên gửi, nhận và trả hàng để không lặp form
            setReceiverDistricts(districtsData);
            setReturnDistricts(districtsData);
        } catch (error) {
            console.error("Error fetching districts:", error);
        } finally {
            setLoadingDistricts(false);
        }
    };


    const fetchWards = async (district_id) => {
        setLoadingWards(true);
        try {
            const response = await instance.get(`/ward/wardbydistrict/${district_id}`);
            const wardsData = response.data.map((item) => ({
                value: item.ward_id,
                label: item.ward_name,
            }));
            console.log("Fetched wards:", wardsData);
            setSenderWards(wardsData);
            setReceiverWards(wardsData);
            setReturnWards(wardsData);
        } catch (error) {
            console.error("Error fetching wards:", error);
        } finally {
            setLoadingWards(false);
        }
    };



    useEffect(() => {
        fetchProvinces();
    }, []);

    const handleAddOrder = async () => {
        if (!newOders.from_name || !newOders.from_phone || !newOders.from_address || !newOders.from_ward || !newOders.from_district || !newOders.from_province) {
            toast.warn("Please fill in sender information!");
            return;
        } if (!newOders.to_name || !newOders.to_phone || !newOders.to_address || !newOders.to_ward || !newOders.to_district || !newOders.to_province) {
            toast.warn("Please fill in receiver information!");
            return;
        } if (!newOders.return_phone || !newOders.return_address || !newOders.return_ward || !newOders.return_district || !newOders.return_province) {
            toast.warn("Please fill in return information!");
            return;
        } if (!newOders.weight || !newOders.height || !newOders.pick_station_id || !newOders.deliver_station_id || !newOders.payment_type_id) {
            toast.warn("Please fill in product information!");
            return;
        } 
        // if (!newItem.item_name || !newItem.length || !newItem.width || !newItem.height || !newItem.weight || !newItem.item_order_code) {
        //     toast.warn("Please fill in item information!");
        //     return;
        // }
        try {
            // Gửi dữ liệu sản phẩm
            let createdItem = null;
            try {
                const itemResponse = await instance.post(
                    "/item",
                    newItem,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                createdItem = itemResponse.data;
                toast.success("Created Item successfully!");
            } catch (itemError) {
                console.error("Error creating item:", itemError);
                toast.error("Failed to create item!");
                return; // Nếu không tạo được item thì không tiếp tục
            }
        
            try {
                const updatedOrder = {
                    ...newOders,
                    item_id: createdItem.item_id, // Sử dụng item_id từ kết quả trả về
                };
        
                const orderResponse = await instance.post(
                    "/order",
                    updatedOrder,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                const createdOrder = orderResponse.data;
                toast.success(`Created Order: ${JSON.stringify(createdOrder)}`);
            } catch (orderError) {
                console.error("Error creating order:", orderError);
                toast.error("Failed to create order!");
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred!");
        }
        
    };


    return (
        <>
            <h2>Create Order</h2>
            <div className='form-orders'>
                <div className='infor-address-from-to'>
                    {/* Form đơn hàng */}
                    <h3>Bên gửi</h3>
                    <input
                        type="text"
                        name="from_name"
                        placeholder="From Name"
                        value={newOders.from_name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="from_phone"
                        placeholder="Số người gửi"
                        value={newOders.from_phone}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="from_address"
                        placeholder="Địa chỉ người gửi"
                        value={newOders.from_address}
                        onChange={handleInputChange}
                    />
                    <p>Tỉnh - Thành phố</p>
                    <Select
                        options={provinces}
                        value={senderProvince}
                        onChange={(selectedOption) => {
                            setSenderProvince(selectedOption);
                            setSenderDistrict(null);
                            setSenderWard(null);
                            setSenderDistricts([]);
                            setSenderWards([]);
                            fetchDistricts(selectedOption.value, setSenderDistricts);
                            setNewOders((prev) => ({
                                ...prev,
                                from_province: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Tỉnh/Thành phố"
                    />
                    <p>Quận - Huyện</p>
                    <Select
                        options={senderDistricts}
                        value={senderDistrict}
                        onChange={(selectedOption) => {
                            setSenderDistrict(selectedOption);
                            setSenderWard(null);
                            setSenderWards([]);
                            fetchWards(selectedOption.value, setSenderWards);
                            setNewOders((prev) => ({
                                ...prev,
                                from_district: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Quận/Huyện"
                        isDisabled={!senderProvince}
                    />

                    <p>Phường - Xã</p>
                    <Select
                        options={senderWards}
                        value={senderWard}
                        onChange={(selectedOption) => {
                            setSenderWard(selectedOption);
                            setNewOders((prev) => ({
                                ...prev,
                                from_ward: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Phường/Xã"
                        isDisabled={!senderDistrict}
                    />

                    <h3>Bên nhận</h3>
                    <input
                        type="text"
                        name="to_name"
                        placeholder="To Name"
                        value={newOders.to_name}
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        name='to_phone'
                        placeholder='Số điện thoại người nhận'
                        value={newOders.to_phone}
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        name='to_address'
                        placeholder='Địa chỉ người nhận'
                        value={newOders.to_address}
                        onChange={handleInputChange}
                    />
                    <p>Tỉnh - Thành phố</p>
                    <Select
                        options={provinces}
                        value={receiverProvince}
                        onChange={(selectedOption) => {
                            setReceiverProvince(selectedOption);
                            setReceiverDistrict(null);
                            setReceiverWard(null);
                            setReceiverDistricts([]);
                            setReceiverWards([]);
                            fetchDistricts(selectedOption.value, setReceiverDistricts);
                            setNewOders((prev) => ({
                                ...prev,
                                to_province: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Tỉnh/Thành phố"
                    />
                    <p>Quận - Huyện</p>
                    <Select
                        options={receiverDistricts}
                        value={receiverDistrict}
                        onChange={(selectedOption) => {
                            setReceiverDistrict(selectedOption);
                            setReceiverWard(null);
                            setReceiverWards([]);
                            fetchWards(selectedOption.value, setReceiverWards);
                            setNewOders((prev) => ({
                                ...prev,
                                to_district: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Quận/Huyện"
                        isDisabled={!receiverProvince}
                    />

                    <p>Phường - Xã</p>
                    <Select
                        options={receiverWards}
                        value={receiverWard}
                        onChange={(selectedOption) => {
                            setReceiverWard(selectedOption);
                            setNewOders((prev) => ({
                                ...prev,
                                to_ward: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Phường/Xã"
                        isDisabled={!receiverDistrict}
                    />
                    <h3>Trả hàng</h3>
                    <input
                        type='text'
                        name='return_phone'
                        placeholder='Số điện thoại trả hàng'
                        value={newOders.return_phone}
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        name='return_address'
                        placeholder='Địa chỉ trả hàng'
                        value={newOders.return_address}
                        onChange={handleInputChange}
                    />
                    <p>Tỉnh - Thành phố</p>
                    <Select
                        options={provinces}
                        value={returnProvince}
                        onChange={(selectedOption) => {
                            setReturnProvince(selectedOption);
                            setReturnDistrict(null);
                            setReturnWard(null);
                            setReturnDistricts([]);
                            setReturnWards([]);
                            fetchDistricts(selectedOption.value, setReturnDistricts);
                            setNewOders((prev) => ({
                                ...prev,
                                return_province: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Tỉnh/Thành phố"
                    />
                    <p>Quận - Huyện</p>
                    <Select
                        options={returnDistricts}
                        value={returnDistrict}
                        onChange={(selectedOption) => {
                            setReturnDistrict(selectedOption);
                            setReturnWard(null);
                            setReturnWards([]);
                            fetchWards(selectedOption.value, setReturnWards);
                            setNewOders((prev) => ({
                                ...prev,
                                return_district: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Quận/Huyện"
                        isDisabled={!receiverProvince}
                    />

                    <p>Phường - Xã</p>
                    <Select
                        options={returnWards}
                        value={returnWard}
                        onChange={(selectedOption) => {
                            setReturnWard(selectedOption);
                            setNewOders((prev) => ({
                                ...prev,
                                return_ward: selectedOption.label
                            }));
                        }}
                        placeholder="Chọn Phường/Xã"
                        isDisabled={!receiverDistrict}
                    />

                    <h3>Thông tin sản phẩm</h3>
                    <input
                        type='text'
                        name='weight'
                        placeholder='Cân nặng'
                        value={newOders.weight}
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        name='height'
                        placeholder='Chiều cao'
                        value={newOders.height}
                        onChange={handleInputChange}
                    />
                    <input
                        type='number'
                        name='pick_station_id'
                        placeholder='ID bưu cục gửi'
                        value={newOders.pick_station_id}
                        onChange={handleInputChange}
                    />
                    <input
                        type='number'
                        name='deliver_station_id'
                        placeholder='ID bưu cục nhận'
                        value={newOders.deliver_station_id}
                        onChange={handleInputChange}
                    />
                    <input
                        type='number'
                        name='payment_type_id'
                        placeholder='ID loại thanh toán'
                        value={newOders.payment_type_id}
                        onChange={handleInputChange}
                    />
                    <h3>Thông tin đơn hàng</h3>
                    <input
                        type="text"
                        name="item_name"
                        placeholder="Item Name"
                        value={newItem.item_name}
                        onChange={handleItemChange}
                    />
                    <input
                        type="number"
                        name="length"
                        placeholder="Length"
                        value={newItem.length}
                        onChange={handleItemChange}
                    />
                    <input
                        type="number"
                        name="width"
                        placeholder="Width"
                        value={newItem.width}
                        onChange={handleItemChange}
                    />
                    <input
                        type="number"
                        name="height"
                        placeholder="Height"
                        value={newItem.height}
                        onChange={handleItemChange}
                    />
                    <input
                        type="number"
                        name="weight"
                        placeholder="Weight"
                        value={newItem.weight}
                        onChange={handleItemChange}
                    />
                    <input
                        type="text"
                        name="item_order_code"
                        placeholder="Order Code"
                        value={newItem.item_order_code}
                        onChange={handleItemChange}
                    />
                    <h3>Lưu ý - Ghi chú</h3>
                    <input
                        type='text'
                        name='required_note'
                        placeholder='Lưu ý khi giao hàng'
                        value={newOders.required_note}
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        name='note'
                        placeholder='Ghi chú'
                        value={newOders.note}
                        onChange={handleInputChange}
                    />
                    <input
                        type='text'
                        name='content'
                        placeholder='Nội dung'
                        value={newOders.content}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='right-infor'>
                    <div className='total-fee'>
                        <h3>Phí vận chuyển</h3>
                        <input
                            type='text'
                            name='total_fee'
                            placeholder='Phí vận chuyển'
                            value={newOders.total_fee}
                            onChange={handleInputChange}
                        />
                        <input
                        type='text'
                        name='cod_amount'
                        placeholder='Số tiền thu hộ'
                        value={newOders.cod_amount}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className='payment_type'>


                    </div>
                </div>

            </div>

            <button type="button" onClick={handleAddOrder}>
                Create Order
            </button>

            <ToastContainer />
        </>

    );
}

export default CreateOrder;
