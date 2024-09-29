import { instance } from '../instance.js'

export const products = async (page) => {
    try {
        const response = await instance.get(`/user/all/products?page=${page}`);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const categories = async () => {
    try {
        const response = await instance.get('/user/all/category');

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const findByCategory = async (id) => {
    try {
        const response = await instance.get(`/user/category/${id}`);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const search = async (value) => {
    try {
        const response = await instance.get(`/user/search?searchKey=${value}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const searchCategory = async (id) => {
    try {
        const response = await instance.get(`/user/search-by-category/${id}`);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const searchByRange = async (value) => {
    try {
        const response = await instance.get(`/user/search-by-range?searchKey=${value}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const searchByMini = async (value) => {
    try {
        const response = await instance.get(`/user/search-by-mini?searchKey=${value}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const searchByMax = async (value) => {
    try {
        const response = await instance.get(`/user/search-by-max?searchKey=${value}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const productInfo = async (id) => {
    try {
        const response = await instance.get(`/user/single/product/${id}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const addFavorite = async (value) => {
    try {
        const response = await instance.post(`/user/add/favorite`, value, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const removeFavorite = async (id) => {
    try {
        const response = await instance.get(`/user/remove/favorite/${id}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const getAllFavorite = async (id) => {
    try {
        const response = await instance.post(`/user/get/favorites/${id}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const rateProduct = async (value) => {
    try {
        const response = await instance.post(`/user/rate/product`, value, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const getRate = async (id) => {

    try {
        const response = await instance.get(`/user/get/rate/${id}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const reviewProduct = async (value) => {
    try {
        const response = await instance.post(`/user/review/product`, value, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getReviews = async (id) => {

    try {
        const response = await instance.get(`/user/get/reviews/${id}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const addToCart = async (value) => {

    try {
        const response = await instance.post(`/user/add-to-cart`, value, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getCart = async (id) => {

    try {
        const response = await instance.get(`/user/get/cart/${id}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const removeCart = async (id) => {
    try {
        const response = await instance.get(`/user/remove/cart/${id}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const payment = async () => {
    try {
        const response = await instance.get(`/user/get/payment`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}


export const orderProduct = async (value) => {
    try {
        const response = await instance.post(`/user/order/product`, value, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getOrder = async (id) => {
    try {
        const response = await instance.get(`/user/get/order/${id}`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getReview = async () => {
    try {
        const response = await instance.get(`/user/get/all/reviews`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getSBestSell = async () => {
    try {
        const response = await instance.get(`/user/get/best/sell`, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const contact = async (value) => {
    try {
        const response = await instance.post(`/user/contact`, value, {
            validateStatus: () => true
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
