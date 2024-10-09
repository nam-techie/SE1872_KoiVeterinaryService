import { useState } from 'react';
import { resetPassword } from '../services/apiResetPassword.js';

export const useResetPassword = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // Email đã xác thực
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await resetPassword(password, email);
            setLoading(false);
            return true; // Thành công
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false; // Thất bại
        }
    };

    return { password, setPassword, email, setEmail, loading, error, handleResetPassword };
};
