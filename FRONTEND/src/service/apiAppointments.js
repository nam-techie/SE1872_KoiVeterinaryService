import {axiosInstance} from "./apiRequest.js";

export const postBookingData = async (bookingData) =>{
    try{
        const response = await axiosInstance.post('http://localhost:8080/api/...', bookingData);
        return response.data;
    }catch (error) {
        console.error("Error posting data: ", error);
        return [];
    }
}
export const getAppointmentInformation = async () =>{
    try{
        const response = await axiosInstance.get('');
        return response.data;
    }catch (error) {
        console.error("Error fetching data: ", error)
    }
}