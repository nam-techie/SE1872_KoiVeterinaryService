import { useState } from 'react';
import { resetPassword } from '../services/apiForgotPassword.js';

export const useResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  // Thêm confirmPassword
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleResetPassword = async (email) => {
        setLoading(true);
        setError('');
        try {
            // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không trước khi gửi
            if (password.length <= 5) {
                setError('Mật khẩu phải trên 6 kí tự!');
                return false;
            }
            if (password !== confirmPassword) {
                setError('Mật khẩu và xác nhận mật khẩu không khớp!');
                return false;
            }

            await resetPassword({ email, password, confirmPassword});
            return true;
        } catch (err) {
            setError(err.response?.data || 'Có lỗi xảy ra khi đặt lại mật khẩu.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        password,
        setPassword,
        confirmPassword,  // Trả về confirmPassword
        setConfirmPassword,  // Trả về setConfirmPassword
        loading,
        error,
        handleResetPassword
    };
};
