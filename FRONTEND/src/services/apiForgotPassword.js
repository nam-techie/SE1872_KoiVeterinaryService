import axios from 'axios';

export const forgotPassword = (email) => {
    return axios.post('/api/forgot-password', {email});
};

export const validateOtp = (email, otp) => {
    return axios.post('/api/validate-otp', null, {
        params: {email, otp}
    });

};

export const resetPassword = (data) => {
    return axios.post('/api/reset-password', data);
};
