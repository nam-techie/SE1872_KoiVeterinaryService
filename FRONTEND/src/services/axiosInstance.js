import axios from "axios";

// Tạo một instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
    // URL gốc cho tất cả các API của bạn
    // baseURL: "http://localhost:8080/api",
});

// Thêm một interceptor để tự động thêm token vào tất cả các yêu cầu
axiosInstance.interceptors.request.use(
    (config) => {
        // Kiểm tra nếu URL là file JSON, bỏ qua việc thêm token
        if (!config.url.endsWith('.json')) {
            // Lấy token từ localStorage
            const token = localStorage.getItem('authToken');
            console.log("Token from localStorage:", token); // Kiểm tra token
            if (token) {
                config.headers.AuthenticationToken = `Bearer ${token}`;
                console.log("AuthenticationToken Header Set:", config.headers.AuthenticationToken); // Kiểm tra header
            }
        }
        return config;
    },
    (error) => {
        console.error("Interceptor Error:", error);
        return Promise.reject(error);
    }
);

// Xuất `axiosInstance` để sử dụng ở các file khác
export default axiosInstance;
