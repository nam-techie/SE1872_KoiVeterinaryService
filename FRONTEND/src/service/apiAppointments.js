import axios from "axios";
import {axiosInstance} from "./apiRequest.js";

export const postBookingData = async (bookingData) => {
    try {
        // Thêm log để kiểm tra dữ liệu trước khi gửi
        console.log('Dữ liệu gửi đi:', bookingData);
        
        const response = await axios.post('http://localhost:8080/customer/createAppointment', bookingData);
        
        // Thêm log để kiểm tra response
        console.log('Response từ server:', response);
        
        return response;
    } catch (error) {
        console.error("Error posting data: ", error);
        throw error;  // Ném lỗi để có thể bắt ở component
    }
};

export const getAppointmentInformation = async () =>{
    try{
        const response = await axiosInstance.get('');
        return response.data;
    }catch (error) {
        console.error("Error fetching data: ", error)
    }
}
