import { useState } from 'react';
import { verifyOTP } from '../services/apiResetPassword.js';

export const useVerifyOTP = () => {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState(''); // Người dùng nhập email
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await verifyOTP(otp, email);
            setLoading(false);
            return true; // Thành công
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false; // Thất bại
        }
    };

    return { otp, setOtp, email, setEmail, loading, error, handleVerifyOTP };
};
