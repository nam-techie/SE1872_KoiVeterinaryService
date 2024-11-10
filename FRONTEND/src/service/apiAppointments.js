
import { axiosInstance } from "./apiRequest.js";

export const postBookingData = async (bookingData) => {
    try {
        const response = await axiosInstance.post('/customer/createAppointment', bookingData);
        return response;
    } catch (error) {
        console.error("Error posting data: ", error);
        throw error;  // Ném lỗi để có thể bắt ở component
    }
};

export const getAppointmentInformation = async () => {
    try {
        const response = await axiosInstance.get('');
        return response.data;
    } catch (error) {
        console.error("Error fetching data: ", error)
    }
}
