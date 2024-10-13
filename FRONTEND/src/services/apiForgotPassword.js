import axios from 'axios';

export const forgotPassword = (email) => {
    return axios.post('http://localhost:8080/api/forgot-password', {email});
};

export const validateOtp = (email, otp) => {
    return axios.post('http://localhost:8080/api/validate-otp', null, {
        params: {email, otp}
    });

};

export const resetPassword = (data) => {
    return axios.post('http://localhost:8080/api/reset-password', data);
};
