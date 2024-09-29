import { instance } from "../instance"

export const register = async (value) => {
    try {
        const response = await instance.post('register', value, {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const login = async (value) => {
    try {
        const response = await instance.post('login', value, {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const checkLoginOrNot = async () => {
    try {
        const response = await instance.get('/check-login-or-not', {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const checkUserOrNot = async () => {
    try {
        const response = await instance.get('/check-user-or-not', {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const checkAdminOrNot = async () => {
    try {
        const response = await instance.get('/check-admin-or-not', {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}