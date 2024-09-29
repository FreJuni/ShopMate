import { instance } from "../../instance"

export const createProduct = async (value) => {
    try {
        const response = await instance.post('/admin/create/product', value, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateProduct = async (value) => {
    try {
        const response = await instance.post('/admin/update/product', value, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const getAllCategory = async () => {
    try {
        const response = await instance.get('/admin/get/category', {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getProducts = async (page) => {

    try {
        const response = await instance.get(`/admin/get/products?page=${page}`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getDetails = async (id) => {
    try {
        const response = await instance.get(`/admin/product/details/${id}`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const oldProduct = async (id) => {
    try {
        const response = await instance.get(`/admin/old/product/${id}`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await instance.get(`/admin/delete/product/${id}`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getTotalPrice = async () => {
    try {
        const response = await instance.get(`/admin/get/total/price`, {
            validateStatus: () => true
        })
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}