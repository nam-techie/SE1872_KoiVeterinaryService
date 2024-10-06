import axios from 'axios';

export const register = async (username, email, password) => {
  try {
    const response = await axios.post('http://localhost:8080/api/register', { // Sử dụng đường dẫn proxy
      username,
      email,
      password,
    });


    return response.data; // Trả về dữ liệu response
  } catch (error) {
    if (error.response) {
      // Xử lý lỗi khi nhận được phản hồi từ server
      console.error('Error response:', error.response.data);
      throw new Error(error.response.data.message || 'Đăng ký thất bại');
    } else if (error.request) {
      // Xử lý lỗi khi không nhận được phản hồi từ server
      console.error('Error request:', error.request);
      throw new Error('Không thể kết nối đến server. Vui lòng thử lại sau.');
    } else {
      // Xử lý các lỗi khác
      console.error('Error:', error.message);
      throw new Error('Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  }
};
