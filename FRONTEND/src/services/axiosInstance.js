// src/api/axiosInstance.js
import axios from "axios";

// Tạo một instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // URL gốc cho tất cả các API của bạn
});

// Thêm một interceptor để tự động thêm token vào tất cả các yêu cầu
axiosInstance.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
