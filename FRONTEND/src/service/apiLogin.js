import { axiosInstance } from './apiRequest';

export const login = async (username, password) => {
    // eslint-disable-next-line no-useless-catch
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
