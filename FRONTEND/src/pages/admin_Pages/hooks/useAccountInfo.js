// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from 'react';
import {axiosInstance} from "../../../service/apiRequest.js";
export const useAccountInfo = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.warn('Ngày không hợp lệ:', dateString);
            return '';
        }
        return date.toISOString().split('T')[0]; // Định dạng 'YYYY-MM-DD'
    };

    const fetchAllAccounts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/listAccount');
            const data = response.data;
            const formattedAccounts = data.map(account => ({
                ...account,
                status: account.isDeleted ? 'Đã vô hiệu hóa' : 'Đang sử dụng',
                createdAt: formatDate(account.created_at) // Sử dụng tên trường 'created_at'
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

    const getAccountInfo = async (username) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/admin/getInfoAccount/${username}`);
            return response.data;
        } catch (err) {
            console.error('Lỗi khi lấy thông tin tài khoản cụ thể:', err);
            setError('Không thể lấy thông tin tài khoản. Vui lòng thử lại sau.');
            return null;
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

    const createAccount = async (accountData) => {
        try {
            const response = await axiosInstance.post('/admin/createAccount', accountData);
            console.log('API Response:', response.data);
            await fetchAllAccounts();
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản:', error);
            if (error.response && error.response.data) {
                throw new Error(error.response.data);
            } else {
                throw new Error('Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.');
            }
        }
    };

    const createVeterinaryAccount = async (accountData) => {
        try {
            const response = await axiosInstance.post('/admin/createAccountVeterinary', accountData);
            await fetchAllAccounts();
            return response.data;
        } catch (error) {
            console.error('Lỗi khi tạo tài khoản bác sĩ:', error);
            throw error;
        }
    };

    const deleteAccount = async (email) => {
        try {
            await axiosInstance.delete(`/admin/deleteAccount?email=${email}`);
            await fetchAllAccounts(); // Cập nhật lại danh sách sau khi xóa
        } catch (error) {
            console.error('Lỗi khi xóa tài khoản:', error);
            throw error;
        }
    };

    const restoreAccount = async (email) => {
        try {
            await axiosInstance.put(`/admin/restoreAccount/${email}`);
            await fetchAllAccounts(); // Cập nhật lại danh sách sau khi khôi phục
        } catch (error) {
            console.error('Lỗi khi khôi phục tài khoản:', error);
            throw error;
        }
    };

    const updateAccountRole = async (email, newRole) => {
        try {
            await axiosInstance.put(`/admin/updateAccountRole/${email}/${newRole}`);
            await fetchAllAccounts(); // Cập nhật lại danh sách sau khi thay đổi role
        } catch (error) {
            console.error('Lỗi khi cập nhật role tài khoản:', error);
            throw error;
        }
    };

    const updateAccount = async (id, updatedData) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(`/admin/updateAccount/${id}`, updatedData);
            setAccounts(accounts.map(account => account.id === id ? response.data : account));
            return response.data;
        } catch (err) {
            console.error('Lỗi khi cập nhật tài khoản:', err);
            setError('Không thể cập nhật tài khoản. Vui lòng thử lại sau.');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const updateAccountInfo = async (accountData) => {
        try {
            const response = await axiosInstance.put('/admin/updateInfoAccount', {
                originalUsername: accountData.originalUsername,
                username: accountData.username,
                email: accountData.email,
                role: accountData.role
            });
            await fetchAllAccounts(); // Cập nhật lại danh sách tài khoản sau khi cập nhật
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin tài khoản:', error);
            throw error;
        }
    };

    return { 
        accounts, 
        loading, 
        error, 
        updateAccountStatus, 
        fetchAllAccounts, 
        createAccount, 
        createVeterinaryAccount,
        deleteAccount,
        restoreAccount,
        updateAccountRole,
        getAccountInfo,
        updateAccount,
        updateAccountInfo
    };
};
