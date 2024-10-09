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
        const autoken = localStorage.getItem('authToken');
        console.log("Token from localStorage:", autoken); // Kiểm tra token
        if (autoken) {
            config.headers.autoken = `Bearer ${autoken}`;
            console.log("autoken Header Set:", config.headers.autoken); // Kiểm tra header
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
