
import { axiosInstance } from "./apiRequest";

export const login = async (username, password) => {
    try {
        const response = await axiosInstance.post('/login', {
            username,
            password,
        });
        // const response = await  axios.post("accounts.json",{
        //     username,
        //     password,
        // });
        console.log('Response from server:', response.data);
        return response.data;

    } catch (error) {
        if (error.response) {
            const {message, errors} = error.response.data;
            let errorMessage = message;

            if (errors && errors.length > 0) {
                errorMessage += ": " + errors.join(", ");
            }
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('Không thể kết nối đến server. Vui lòng thử lại sau.');
        } else {
            throw new Error('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    }
};
