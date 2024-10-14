import "../services/axiosInstance.js"
import axios from "axios";
import axiosInstance from "./axiosInstance.js";

export const ServiceList = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/getAllServiceType');
        // const response = await axios('service.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};

export  const  ServiceBookingData  = async () => {
    try{
        //const response = await axios('/api/servicesBookingData');
        const response = await axios('serviceBookingData.json');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:',error);
        return [];
    }
}

export  const  getDistrict = async () => {
    try {
        // Đường dẫn tới file JSON trong thư mục public
        const response = await axiosInstance.get('http://localhost:8080/api/getAllZone');
        // const response = await axiosInstance.get("/district.json");
        return response.data;
    } catch (error) {
        console.error('Error fetching district data:', error);
        return [];
    }
}