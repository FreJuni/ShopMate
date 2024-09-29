import { instance } from '../../instance';

export const getOrders = async (page) => {
    try {
        const response = await instance.get(`/admin/get/all/orders?page=${page}`);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getOrder = async () => {
    try {
        const response = await instance.get(`/admin/get/all/order`);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const changeStatus = async (value) => {
    try {
        const response = await instance.post('/admin/change/status', value, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getOrderByOrderCode = async (id) => {
    try {
        const response = await instance.get(`/admin/get/order/${id}`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getPayInformation = async (id) => {
    try {
        const response = await instance.get(`/admin/get/pay/info/${id}`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getSaleProduct = async (page) => {
    try {
        const response = await instance.get(`/admin/get/sale/product?page=${page}`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const getPendingProduct = async () => {
    try {
        const response = await instance.get(`/admin/get/pending/product`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}




