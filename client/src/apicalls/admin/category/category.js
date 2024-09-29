import { instance } from "../../instance"


export const addCategory = async (value) => {
    try {
        const response = await instance.post('admin/add/category', value, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const Categories = async (page) => {
    try {
        const response = await instance.get(`admin/category?page=${page}`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const editCategory = async (id) => {
    try {
        const response = await instance.get(`admin/edit/category/${id}`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateCategory = async (value) => {
    try {
        const response = await instance.post(`admin/update/category`, value, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteCategory = async (id) => {
    try {
        const response = await instance.get(`admin/delete/category/${id}`, {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}