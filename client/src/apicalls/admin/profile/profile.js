
import { instance } from '../../instance';

export const getUserInformation = async (id) => {
    try {
        const response = await instance.get(`/admin/user/info/${id}`, {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateProfile = async (value) => {
    try {
        const response = await instance.post('/admin/update/profile', value, {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const addNewAdmin = async (value) => {
    try {
        const response = await instance.post('/admin/new/admin', value, {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}