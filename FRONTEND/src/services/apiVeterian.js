import axios from "axios";
import axiosInstance from "./axiosInstance.js";

export const VeterianList = async () => {
    try {
        const response = await axios("veterian.json");
        return response.data;
    } catch (error) {
        console.error('Error fetching veterian list:', error);
        return [];
    }
}

export const VeterianScheduleInCenter = async (doctorId) => {
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/VeterianScheduleInCenter', {
        doctorId: doctorId
        });
        // const response = await axios('/veterianSchedule.json');
        return  response.data;
    } catch (error) {
        console.error('Error fetching available days:', error);
        return [];
    }
};

export const  VeterianScheduleAtHome = async () =>{
    try {
        // const response = await  axiosInstance.get('http://localhost:8080/api/VeterianScheduleInHome');
        const response = await axios('/veterianScheduleHome.json');
        return  response.data;
    } catch (error) {
        console.error('Error fetching available days:', error);
        return [];
    }
};


