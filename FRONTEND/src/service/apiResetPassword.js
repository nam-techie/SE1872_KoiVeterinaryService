import axios from "axios";

export const forgotPassword = (email) => {
    return axios.post('https://se1872koiveterinaryservice-production-ee6a.up.railway.app/api/forgot-password', {email});
};

export const validateOtp = (email, otp) => {
    return axios.post('https://se1872koiveterinaryservice-production-ee6a.up.railway.app/api/validate-otp', null, {
        params: {email, otp}
    });
};

export const resetPassword = (data) => {
    return axios.post('https://se1872koiveterinaryservice-production-ee6a.up.railway.app/api/reset-password', data);
};