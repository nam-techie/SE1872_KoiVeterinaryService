// import {axiosInstance} from "./apiRequest.js";
import axios from "axios";
import {convertIdsToString} from "./apiRequest.js";



export const getService = async () => {
    try {
        // const response = await axios.get('http://localhost:8080/api/servicesList');
        const response = await axios('service.json');
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
        // Đường dẫn tới file JSON trong thư mục public
        //const response = await axios('/api/zone');
        const response = await axios.get("/district.json");
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