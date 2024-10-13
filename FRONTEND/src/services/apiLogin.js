import axios from 'axios';

export const login = async (username, password) => {
    try {
        const response = await axios.post('/api/login', { // Sử dụng đường dẫn proxy
            username,
            password,
        });
        console.log('Response from server:', response.data);  // Log phản hồi từ server
        return response.data; // Trả về dữ liệu phản hồi

    } catch (error) {
        if (error.response) {
            const {message, errors} = error.response.data; // Lấy message và errors từ backend
            let errorMessage = message;

            // Nếu có danh sách lỗi chi tiết thì nối thêm vào thông báo lỗi
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
