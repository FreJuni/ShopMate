import { instance } from '../../instance';

export const getAdminList = async (page) => {
    try {
        const response = await instance.get(`/admin/admin-list?page=${page}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getUserList = async (page) => {
    try {
        const response = await instance.get(`/admin/user-list?page=${page}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const changeToUser = async (id) => {
    try {
        const response = await instance.get(`/admin/change-to-user/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const changeToAdmin = async (id) => {
    try {
        const response = await instance.get(`/admin/change-to-admin/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await instance.get(`/admin/delete/user/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getUsers = async () => {
    try {
        const response = await instance.get(`/admin/get/users`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
