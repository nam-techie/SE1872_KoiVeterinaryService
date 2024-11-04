
import { axiosInstance } from './apiRequest';
import axios from "axios";

export const register = async (username, email, password, confirmPassword) => {
    try {
        const response = await axios.post('https://se1872koiveterinaryservice-production-deb1.up.railway.app/api/register', { // Sử dụng đường dẫn proxy
            username,
            email,
            password,
            confirmPassword
        });
        return response.data; // Trả về dữ liệu response
    } catch (error) {
        if (error.response) {
            const {message, errors} = error.response.data; // Lấy message và errors từ backend
            let errorMessage = message;

            // Nếu có danh sách lỗi chi tiết (errors), nối thêm thông tin
            if (errors && errors.length > 0) {
                errorMessage += ": " + errors.join(", ");
            }
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng thử lại sau.');
        } else {
            throw new Error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    }
};
