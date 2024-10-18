// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/apiRequest.js';

export const useAccountInfo = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAllAccounts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/listAccount');
            const data = response.data;
            const formattedAccounts = data.map(account => ({
                ...account,
                status: account.isDeleted ? 'Đã vô hiệu hóa' : 'Đang sử dụng',
                createdAt: new Date(account.createdAt).toISOString().split('T')[0] // Định dạng năm-tháng-ngày
            }));
            setAccounts(formattedAccounts);
            setError(null);
        } catch (err) {
            console.error('Lỗi khi lấy thông tin tài khoản:', err);
            setError('Không thể lấy thông tin tài khoản. Vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const updateAccountStatus = async (accountId, newStatus) => {
        try {
            const response = await axiosInstance.put(`/admin/updateAccountStatus/${accountId}`, {
                is_deleted: newStatus === 'Đã vô hiệu hóa'
            });
            await fetchAllAccounts(); // Refresh account data after update
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái tài khoản:', error);
            throw error;
        }
    };

    return { accounts, loading, error, updateAccountStatus, fetchAllAccounts };
};
