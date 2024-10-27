import { useState, useEffect } from 'react';
import {axiosInstance} from '../services/apiRequest.js';



export const useCustomerInfo = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        address: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCustomerInfo = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/getInfoCustomer');
            const data = response.data;
            setUser({
                username: data.username,
                email: data.email,
                fullName: data.fullName,
                phoneNumber: data.phone,
                address: data.address
            });
            setError(null);
        } catch (err) {
            console.error('Lỗi khi lấy thông tin khách hàng:', err);
            setError('Không thể lấy thông tin khách hàng. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomerInfo();
    }, []);

    const updateCustomerInfo = async (formData) => {
        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('address', formData.address);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await axiosInstance.put('/updateInfoCustomer', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await fetchCustomerInfo(); // Refresh user data after update
            console.log(response);
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
            throw error;
        }
    };


    return { user, loading, error, updateCustomerInfo };
};
