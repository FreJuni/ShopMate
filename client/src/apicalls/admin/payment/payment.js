import { instance } from '../../instance';

export const paymentCreate = async (value) => {
    try {
        const response = await instance.post('/admin/create/payment', value, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getPayments = async () => {
    try {
        const response = await instance.get('/admin/get/payments', {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getOldPayment = async (id) => {
    try {
        const response = await instance.get(`/admin/get/old/payment/${id}`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const paymentUpdate = async (value) => {
    try {
        const response = await instance.post('/admin/update/payment', value, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deletePayment = async (id) => {
    try {
        const response = await instance.get(`/admin/delete/payment/${id}`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}