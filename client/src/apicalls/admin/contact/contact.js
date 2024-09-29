import { instance } from "../../instance"

export const getContacts = async () => {
    try {
        const response = await instance.get('admin/get/contact', {
            validateStatus: () => true,
        });

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
