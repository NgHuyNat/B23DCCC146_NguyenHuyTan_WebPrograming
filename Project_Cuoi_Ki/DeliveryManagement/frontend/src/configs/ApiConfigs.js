import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3010',
});

export const getAllShippers = async () => {
    const response = await instance.get('/shipper');
    return response.data;
};

export const getShipperById = async (id) => {
    const response = await instance.get(`/shipper/${id}`);
    return response.data;
};

export const addShipper = async (shipper) => {
    const response = await instance.post('/shipper', shipper);
    return response.data;
};

export const deleteShipper = async (id) => {
    const response = await instance.delete(`/shipper/${id}`);
    return response.data;
};

export const updateShipper = async (shipper) => {
    const response = await instance.put('/shipper', shipper);
    return response.data;
};

export const getAllOrders = async () => {
    const response = await instance.get('/order');
    return response.data;
}

export const getOrderById = async (id) => {
    const response = await instance.get(`/order/${id}`);
    return response.data;
}

export const addOrder = async (order) => { 
    const response = await instance.post('/order', order);
    return response.data;
}

export const deleteOrder = async (id) => {
    const response = await instance.delete(`/order/${id}`);
    return response.data;
}

export const updateOrder = async (order) => {
    const response = await instance.put('/order', order);
    return response.data;
}

export const getAllItems = async () => {
    const response = await instance.get('/item');
    return response.data;
}

export const getItemById = async (id
    ) => {
    const response = await instance.get(`/item/${id}`);
    return response.data;
}

export const addItem = async (item) => {
    const response = await instance.post('/item', item);
    return response.data;
}

export const deleteItem = async (id) => {
    const response = await instance.delete(`/item/${id}`);
    return response.data;
}

export const updateItem = async (item) => {
    const response = await instance.put('/item', item);
    return response.data
}

export const getAllProvince = async () => {
    const response = await instance.get('/province');
    return response.data;
}

export const getProvinceById = async (id) => {
    const response = await instance.get(`/province/${id}`);
    return response.data;
}

export const getAllDistrict = async () => {
    const response = await instance.get('/district');
    return response.data;
}

export const getDistrictByProvinceId = async (id) => {
    const response = await instance.get(`/districtbyprovince/${id}`);
    return response.data;
}

export const getAllWard = async () => {
    const response = await instance.get('/ward');
    return response.data;
}

export const getWardByDistrictId = async (id) => {
    const response = await instance.get(`/wardbydistrict/${id}`);
    return response.data;
}

export const getAllPaymentTypes = async () => {
    const response = await instance.get('/payment_type');
    return response.data;
}

export const assignShipperToOrder = async (order_id, shipper_id) => {
    const response = await instance.post('/order/assign', { order_id, shipper_id });
    return response.data;
}

export default instance;