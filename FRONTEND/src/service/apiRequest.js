import axios from "axios";

// Tạo một Axios instance với URL gốc cho tất cả các API
export const axiosInstance = axios.create({
    baseURL: "https://se1872koiveterinaryservice-production-deb1.up.railway.app/api",
});

// Thêm một interceptor để tự động thêm token vào tất cả các yêu cầu
axiosInstance.interceptors.request.use(
    (config) => {
        // Nếu URL không kết thúc bằng '.json', thêm token vào headers
        if (!config.url.endsWith('.json')) {
            const token = localStorage.getItem('authToken');
            // console.log("Token from localStorage:", token);  // Kiểm tra token

            // Nếu token tồn tại, thêm vào header
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                // console.log("Authorization Header Set:", config.headers.Authorization);  // Kiểm tra header Authorization
            }
        }
        return config;  // Trả về config đã cập nhật để tiếp tục request
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

