import React, { useState, useEffect } from 'react';
import './CreateOrder.css';
import Select from 'react-select';
import instance from '../../../configs/ApiConfigs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Modal from '../../../components/modal/Modal';
import phong_bi from '../../../assets/phongbi.png';

function CreateOrder() {
    const [provinces, setProvinces] = useState([]); // Danh sách tỉnh/thành phố
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

    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Quản lý modal
    const [senderInfo, setSenderInfo] = useState({
        full_name: '',
        phone_number: '',
        address: '',
        province: '',
        district: '',
        ward: '',
    });



    const [requiredNotes, setRequiredNotes] = useState([
        { value: 'Fragile', label: 'Hàng dễ vỡ' },
        { value: 'Heavy', label: 'Hàng nặng' },
        { value: 'Liquid', label: 'Hàng chứa chất lỏng' },
        { value: 'Standard', label: 'Hàng tiêu chuẩn' },
        { value: 'Fast', label: 'Giao hàng hỏa tốc' },
        { value: 'Standard', label: 'Giao hàng tiêu chuẩn' },
        { value: '!Check', label: 'Không cho kiểm tra' },
        { value: 'Check', label: 'Cho kiểm tra' },
        { value: '!Test', label: 'Không cho thử' },
        { value: 'Test', label: 'Cho thử' },
    ]); // Đây là danh sách required note

    const [selectedRequiredNote, setSelectedRequiredNote] = useState(null); // Giá trị đã chọn

    const [user, setUser] = useState({
        full_name: '',
        email: '',
        phone_number: '',
        address: '',
        ward: '',
        district: '',
        province: '',
    });

    const [newItem, setNewItem] = useState({
        item_name: "",
        length: "",
        width: "",
        height: "",
        weight: "",
        item_order_code: "",
    });

    const resetForm = () => {
        setNewOders({
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

        setNewItem({
            item_name: "",
            length: "",
            width: "",
            height: "",
            weight: "",
            item_order_code: "",
        });

        setSelectedRequiredNote([]);
        setReceiverProvince(null);
        setReceiverDistrict(null);
        setReceiverWard(null);
        setReturnProvince(null);
        setReturnDistrict(null);
        setReturnWard(null);
        setSenderProvince(null);
        setSenderDistrict(null);
        setSenderWard(null);

    };


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


    const handleSaveSenderInfo = () => {
        if (!senderInfo.full_name || !senderInfo.phone_number || !senderInfo.address || !senderInfo.province || !senderInfo.district || !senderInfo.ward) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const newAddress = senderInfo.address;

        const updatedSenderInfo = {
            ...senderInfo,
            address: newAddress, // Chỉ cập nhật 1 địa chỉ
        };

        setSenderInfo(updatedSenderInfo);

        console.log('Updated Sender Info:', updatedSenderInfo);

        // Gọi `saveToBackend` để gửi thông tin
        saveToBackend(updatedSenderInfo);

        setIsEditModalOpen(false); // Đóng modal
    };

    const saveToBackend = async (senderInfo) => {
        const payload = {
            full_name: senderInfo.full_name,
            phone_number: senderInfo.phone_number,
            address: senderInfo.address,
            province: provinces.find((p) => p.value === senderInfo.province)?.label,
            district: senderDistricts.find((d) => d.value === senderInfo.district)?.label,
            ward: senderWards.find((w) => w.value === senderInfo.ward)?.label,
        };

        console.log('Payload gửi lên backend:', payload);

        try {
            const token = localStorage.getItem('token'); // Lấy token từ localStorage
            const response = await axios.put('http://localhost:3010/auth/profile', payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Gửi token trong header
                },
            });

            // Cập nhật lại user với dữ liệu trả về
            setUser({
                full_name: payload.full_name,
                phone_number: payload.phone_number,
                address: payload.address,
                province: payload.province,
                district: payload.district,
                ward: payload.ward,
            });

            toast.success('Cập nhật thành công!');
        } catch (error) {
            console.error('Lỗi khi cập nhật:', error.response?.data || error.message);
            toast.error('Có lỗi xảy ra khi cập nhật!');
        }
    };

    const handleEditSenderInfo = () => {
        setSenderInfo({
            full_name: user.full_name,
            phone_number: user.phone_number,
            address: user.address || '',
            province: user.province || '',
            district: user.district || '',
            ward: user.ward || '',
        });
        setIsEditModalOpen(true); // Mở modal
    };



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

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3010/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNewOders((prev) => ({
                    ...prev,
                    from_name: response.data.full_name,
                    from_phone: response.data.phone_number,
                    from_address: response.data.address,
                    from_province: response.data.province,
                    from_district: response.data.district,
                    from_ward: response.data.ward,
                }));
                console.log('Profile:', response.data);
                setUser(response.data);
                console.log('User:', user);
            } catch (error) {
                console.error('Error fetching profile:', error.response?.data || error.message);
            }
        };
        fetchProfile();
    }, []);

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
        }
    };


    const fetchWards = async (district_id) => {
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
        if (!newItem.item_name || !newItem.length || !newItem.width || !newItem.height || !newItem.weight || !newItem.item_order_code) {
            toast.warn("Please fill in item information!");
            return;
        }
        try {
            // Gửi dữ liệu sản phẩm
            const itemResponse = await instance.post("/item", newItem, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Item Response:", itemResponse.data);

            // Kiểm tra nếu có insertId
            if (!itemResponse.data || !itemResponse.data.insertId) {
                toast.error("Failed to retrieve item_id!");
                return;
            }

            // Sử dụng insertId làm item_id
            const createdItemId = itemResponse.data.insertId;

            const updatedOrder = {
                ...newOders,
                item_id: createdItemId, // Gắn insertId vào item_id
                required_note: JSON.stringify(newOders.required_note || []), // Chuyển thành JSON nếu cần
            };

            const orderResponse = await instance.post("/order", updatedOrder, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Order Response:", orderResponse.data);
            toast.success("Created Order successfully!");
            resetForm();
        } catch (error) {
            console.error("Error creating item or order:", error.response?.data || error.message);
            toast.error("Failed to create item or order!");
        }
    };

    return (
        <>
            <div className='create-container'>
                {isEditModalOpen && (
                    <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                        <div className="edit-sender-info">
                            <h2 className='edit-sender-h2'>Thêm địa chỉ gửi hàng</h2>
                            {/* Họ tên */}
                            <div className='edit-sender-info-list'>
                                <div className='edit-sender-info-item1'>
                                    <input
                                        type="text"
                                        name="full_name"
                                        placeholder="Họ tên"
                                        value={senderInfo.full_name}
                                        onChange={(e) =>
                                            setSenderInfo((prev) => ({
                                                ...prev,
                                                full_name: e.target.value,
                                            }))
                                        }
                                    />
                                    {/* Số điện thoại */}
                                    <input
                                        type="text"
                                        name="phone_number"
                                        placeholder="Số điện thoại"
                                        value={senderInfo.phone_number}
                                        onChange={(e) =>
                                            setSenderInfo((prev) => ({
                                                ...prev,
                                                phone_number: e.target.value,
                                            }))
                                        }
                                    />
                                    {/* Địa chỉ chi tiết */}
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Địa chỉ chi tiết"
                                        value={senderInfo.address}
                                        onChange={(e) =>
                                            setSenderInfo((prev) => ({
                                                ...prev,
                                                address: e.target.value,
                                            }))
                                        }
                                    />

                                    {/* Tỉnh - Thành phố */}
                                    <p>Tỉnh - Thành phố</p>
                                    <Select
                                        options={provinces}
                                        value={provinces.find((p) => p.value === senderInfo.province)} // Tìm đối tượng dựa trên `value`
                                        onChange={(selectedOption) => {
                                            setSenderInfo((prev) => ({
                                                ...prev,
                                                province: selectedOption.value, // Lưu `value` để gửi API
                                                provinceLabel: selectedOption.label, // Lưu `label` nếu cần hiển thị
                                                district: '', // Reset quận khi tỉnh thay đổi
                                                ward: '', // Reset phường khi tỉnh thay đổi
                                            }));
                                            setSenderDistricts([]);
                                            setSenderWards([]);
                                            fetchDistricts(selectedOption.value); // Gọi API lấy danh sách quận
                                        }}
                                        placeholder="Chọn Tỉnh/Thành phố"
                                    />
                                    {/* Quận - Huyện */}
                                    <p>Quận - Huyện</p>
                                    <Select
                                        options={senderDistricts}
                                        value={senderDistricts.find((d) => d.value === senderInfo.district)}
                                        onChange={(selectedOption) => {
                                            setSenderInfo((prev) => ({
                                                ...prev,
                                                district: selectedOption.value, // Lưu mã quận
                                                ward: '', // Xóa phường/xã khi quận thay đổi
                                            }));
                                            setSenderWards([]); // Reset phường/xã
                                            fetchWards(selectedOption.value, setSenderWards); // Gọi API tải phường/xã
                                        }}
                                        placeholder="Chọn Quận/Huyện"
                                        isDisabled={!senderInfo.province} // Chỉ cho phép chọn nếu đã chọn tỉnh
                                    />
                                    {/* Phường - Xã */}
                                    <p>Phường - Xã</p>
                                    <Select
                                        options={senderWards}
                                        value={senderWards.find((w) => w.value === senderInfo.ward)}
                                        onChange={(selectedOption) =>
                                            setSenderInfo((prev) => ({
                                                ...prev,
                                                ward: selectedOption.value, // Lưu mã phường
                                            }))
                                        }
                                        placeholder="Chọn Phường/Xã"
                                        isDisabled={!senderInfo.district} // Chỉ cho phép chọn nếu đã chọn quận
                                    />
                                </div>
                            </div>
                            {/* Nút hành động */}
                            <div className="modal-buttons">
                                <button className='btn-item' onClick={() => setIsEditModalOpen(false)}>Hủy</button>
                                <button className='btn-item' onClick={handleSaveSenderInfo}>Cập nhật</button>
                            </div>
                        </div>
                    </Modal>
                )}
                <h2 className='title'>Create Order</h2>
                <div className='form-orders'>
                    <div className='phongbi-container'>
                        {/* Form đơn hàng */}
                        <img src={phong_bi} alt="" className='phongbi_img' />
                        <div className='phongbi-item'>
                            <h3>Bên gửi</h3>
                            {user && (
                                <div className='sender-info'>
                                    <div className='sender-info-item'>
                                        <p><strong>{user.full_name}</strong></p>
                                        <p>{user.phone_number}</p>
                                    </div>
                                    <p>
                                        {`${user.address}, ${user.ward}, ${user.district}, ${user.province}`}
                                    </p>
                                </div>
                            )}
                            <button className='sender-info-btn' onClick={handleEditSenderInfo}>Sửa địa chỉ gửi hàng</button>

                            <h3 className='ben_nhan-h3'>Bên nhận</h3>
                            <div className='ben_nhan-list'>
                                <div className='ben_nhan-item1'>
                                    <input
                                        type="text"
                                        name="to_name"
                                        placeholder="Tên người nhận"
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
                                </div>
                                <div className='ben_nhan-item2'>
                                    <p>Tỉnh - Thành phố</p>
                                    <Select
                                        options={provinces}
                                        value={receiverProvince}
                                        isSearchable={true}
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
                                        isSearchable={true}
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
                                        isSearchable={true}
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
                                </div>
                            </div>
                            <h3 className='ben_nhan-h3' >Trả hàng</h3>
                            <div className='ben_nhan-list'>
                                <div className='ben_nhan-item1'>
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
                                </div>
                                <div className='ben_nhan-item2'>
                                    <p>Tỉnh - Thành phố</p>
                                    <Select
                                        options={provinces}
                                        value={returnProvince}
                                        isSearchable={true}
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
                                        isSearchable={true}
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
                                        isSearchable={true}
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
                                </div>
                            </div>
                            <h3 className='ben_nhan-h3'></h3>
                            <div className='ben_nhan-list'>
                                <div className='ben_nhan-item3'>
                                    <h3 className='benh_nhan-item3-title'>Thông tin sản phẩm</h3>
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
                                </div>
                                <div className='ben_nhan-item4'>
                                    <h3 className='benh_nhan-item3-title'>Thông tin đơn hàng</h3>
                                    <input
                                        type="text"
                                        name="item_name"
                                        placeholder="Tên vật phẩm"
                                        value={newItem.item_name}
                                        onChange={handleItemChange}
                                    />
                                    <input
                                        type="text"
                                        name="length"
                                        placeholder="Chiều dài"
                                        value={newItem.length}
                                        onChange={handleItemChange}
                                    />
                                    <input
                                        type="text"
                                        name="width"
                                        placeholder="Chiều rộng"
                                        value={newItem.width}
                                        onChange={handleItemChange}
                                    />
                                    <input
                                        type="text"
                                        name="height"
                                        placeholder="Chiều cao"
                                        value={newItem.height}
                                        onChange={handleItemChange}
                                    />
                                    <input
                                        type="text"
                                        name="weight"
                                        placeholder="Cân nặng"
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
                                </div>
                            </div>
                            <h3 className='luu_y-h3' >Lưu ý - Ghi chú</h3>
                            <Select
                                options={requiredNotes}
                                value={selectedRequiredNote}
                                isSearchable={true}
                                isMulti={true}
                                onChange={(selectedOption) => {
                                    setSelectedRequiredNote(selectedOption);
                                    setNewOders((prev) => ({
                                        ...prev,
                                        required_note: selectedOption ? selectedOption.map(option => option.label) : [], // Gửi mảng JSON
                                    }));
                                }}
                                placeholder="Required Note"
                            />

                            <div className='luu_y-list'>
                                <input
                                    className='luu_y-item'
                                    type='text'
                                    name='note'
                                    placeholder='Ghi chú'
                                    value={newOders.note}
                                    onChange={handleInputChange}
                                />
                                <input
                                    className='luu_y-item'
                                    type='text'
                                    name='content'
                                    placeholder='Nội dung'
                                    value={newOders.content}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className='create_od-btn-container'>
                                <button className='create_od-btn' type="button" onClick={handleAddOrder}>
                                    Create Order
                                </button>
                            </div>

                        </div>
                    </div>

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
                </div>

            </div>


            <ToastContainer />
        </>

    );
}

export default CreateOrder;
