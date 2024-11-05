import { axiosInstance } from './apiRequest';

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/login', {
            username,
            password
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
