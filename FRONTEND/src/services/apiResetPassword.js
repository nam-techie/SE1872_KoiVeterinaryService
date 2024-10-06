import axios from 'axios';

export const sendResetEmail = async (email) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/send-reset-email', { email });
        return response.data;
    } catch (error) {
        throw new Error('Failed to send reset email.');
    }
};

export const verifyOTP = async (otp, email) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/verify-otp', { otp, email });
        return response.data;
    } catch (error) {
        throw new Error('Failed to verify OTP.');
    }
};

export const resetPassword = async (password, email) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/reset-password', { password, email });
        return response.data;
    } catch (error) {
        throw new Error('Failed to reset password.');
    }
};
