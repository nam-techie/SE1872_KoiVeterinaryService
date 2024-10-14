import {useState} from 'react';
import {forgotPassword} from '../services/apiForgotPassword.js'; // Import dịch vụ forgotPassword

export const useForgotPassword = () => {
    const [email, setEmail] = useState('');  // Lưu trữ email của người dùng
    const [loading, setLoading] = useState(false);  // Trạng thái loading khi đang xử lý yêu cầu
    const [error, setError] = useState('');  // Lưu trữ lỗi khi có lỗi xảy ra

    // useForgotPassword.js
    const handleSendEmail = async () => {
        setLoading(true);
        setError('');

        try {
            await forgotPassword(email);
            console.log("Email đã được gửi thành công.");
            return true;
        } catch (err) {
            setError(err.response?.data || "Có lỗi xảy ra.");
            return false;
        } finally {
            setLoading(false);
        }
    };


    return {
        email,
        setEmail,
        loading,
        error,
        handleSendEmail,
    };
};