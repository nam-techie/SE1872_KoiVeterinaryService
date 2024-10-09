import "../services/axiosInstance.js"
import axios from "axios";

export const ServiceList = async () => {
    try {
        // const response = await axios.get('https://localhost:8080/api/servicesList');
        const response = await axios('service.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};

export  const  ServiceBookingData  = async () => {
    try{
        //const response = await axios('https://localhost:8080/api/servicesBookingData');
        const response = await axios('serviceBookingData.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:',error);
        return [];
    }
}

export  const  getDistrict = async () => {
    try{
        // const response = await axios('http://localhost:8080/api/zone');
        const response = await  axios("district.json")
        return response.data;
    }catch (error) {
        console.error('Error fetching services:',error);
        return [];
    }
}