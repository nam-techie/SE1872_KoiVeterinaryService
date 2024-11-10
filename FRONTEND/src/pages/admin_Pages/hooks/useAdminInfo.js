import { useState, useEffect } from 'react';
import {axiosInstance} from "../../../service/apiRequest.js";

export const useAdminInfo = () => {
    const [admin, setAdmin] = useState({
        username: '',
        password: '',  // Thêm trường password
        email: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdminInfo = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/getInfoAdmin');  // API để lấy thông tin admin
            const data = response.data;
            setAdmin({
                username: data.username,
                password: '',  // Không nên lấy password từ server mà chỉ đặt trường trống
                email: data.email
            });
            setError(null);
        } catch (err) {
            console.error('Lỗi khi lấy thông tin admin:', err);
            setError('Không thể lấy thông tin admin. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminInfo();
    }, []);

    const updateAdminInfo = async (formData) => {
        const formDataToSend = new FormData();
        formDataToSend.append('username', formData.username);
        formDataToSend.append('password', formData.password);  // Thêm password
        formDataToSend.append('email', formData.email);

        try {
            const response = await axiosInstance.put('/admin/updateInfoAdmin', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await fetchAdminInfo();  // Refresh admin data after update
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin admin:', error);
            throw error;
        }
    };

    return { admin, loading, error, updateAdminInfo };
};
