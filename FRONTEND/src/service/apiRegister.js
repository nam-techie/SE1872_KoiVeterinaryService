import { axiosInstance } from './apiRequest';


export const register = async (username, email, password, confirmPassword) => {
    try {
        const response = await axiosInstance.post('/register', {
            username,
            email,
            password,
            confirmPassword
        });
        return response.data;
    } catch (error) {
        // Ném lỗi để component xử lý
        throw error;
    }
};
