import { useState, useEffect } from 'react';
import { axiosInstance } from '../service/apiRequest';

export const useCustomerInfo = () => {
    const [user, setUser] = useState({
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
            const response = await axiosInstance.get('/customer/getInfoCustomer');
            const data = response.data;
            setUser({
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

    const updateCustomerInfo = async (formData) => {
        try {
            const response = await axiosInstance.put('/customer/updateInfoCustomer', {
                fullName: formData.fullName,
                phoneNumber: formData.phoneNumber,
                address: formData.address,
                email: formData.email
            });
            await fetchCustomerInfo(); // Refresh user data after update
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data;
            throw errorMessage;
        }
    };

    useEffect(() => {
        fetchCustomerInfo();
    }, []);

    return { user, loading, error, updateCustomerInfo };
};
