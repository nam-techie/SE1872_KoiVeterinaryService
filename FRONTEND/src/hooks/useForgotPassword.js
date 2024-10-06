import { useState } from 'react';
import { sendResetEmail } from '../services/apiResetPassword.js';

export const useForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await sendResetEmail(email);
            setLoading(false);
            return true; // Thành công
        } catch (error) {
            setError(error.message);
            setLoading(false);
            return false; // Thất bại
        }
    };

    return { email, setEmail, loading, error, handleSendEmail };
};
