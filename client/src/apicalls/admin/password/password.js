import { instance } from '../../instance';

export const changePassword = async (data) => {

    try {
        const response = await instance.post('/admin/change/password', data, {
            ValidateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}