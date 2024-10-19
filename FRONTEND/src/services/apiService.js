
import axios from "axios";
import {axiosInstance, convertIdsToString} from "./apiRequest.js";



export const getService = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/getAllServiceType');
        // const response = await axios('service.json');
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};

export  const  ServiceBookingData  = async () => {
    try{
        //const response = await axios('http://localhost:8080/api/servicesBookingData');
        const response = await axios('serviceBookingData.json');
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching services:',error);
        return [];
    }
}

export  const  getDistrict = async () => {
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/getAllZone');
        console.log(response.data)
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching district data:', error);
        return [];
    }
}

// export const  FeedbackService = async () =>{
//     try{
//         const reponse = await axios.get("feedback_service.json");
//         return stringifyValues(response.data);
//     }catch (error){
//         console.error("'Error fetching district data:", error);
//         return [];
//     }
// }
export const postBookingData = async (bookingData) =>{
    try{
        const response = await axiosInstance.post('http://localhost:8080/api/...', bookingData);
        return response;
    }catch (error) {
        console,error("Error posting data: ", error);
    }
}