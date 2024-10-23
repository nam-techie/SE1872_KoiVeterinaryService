import axios from "axios";

// Tạo instance của axios
export const axiosInstance = axios.create({
});

// Thêm một interceptor để tự động thêm token vào tất cả các yêu cầu
axiosInstance.interceptors.request.use(
    (config) => {
        // Lấy token từ localStorage
        const token = localStorage.getItem('authToken');
        console.log("Token from localStorage:", token);  // Kiểm tra token

        // Nếu token tồn tại, thêm vào header Authorization
        if (token) {
            config.headers.AuthenticationToken = `Bearer ${token}`;
            console.log("Authorization Header Set:", config.headers.AuthenticationToken);  // Kiểm tra header Authorization
        }

        // Trả về config đã cập nhật để tiếp tục request
        return config;
    },
    (error) => {
        // Xử lý lỗi trong interceptor
        console.error("Interceptor Error:", error);
        return Promise.reject(error);  // Trả về lỗi nếu có vấn đề
    }
);

// Hàm chuyển đổi tất cả các id trong mảng thành chuỗi
export const convertIdsToString = (data) => {
    if (Array.isArray(data)) {
        return data.map(item => ({
            ...item,
            id: String(item.id)  // Ép id thành chuỗi
        }));
    }
    return data;
};
