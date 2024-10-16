import axios from "axios";
import axiosInstance from "./axiosInstance.js";
// import axiosInstance from "./axiosInstance.js";

export const VeterianList = async () =>{
    try{
        const response = await axios ("http://localhost:8080/api/getAllDoctor");
        // const  response =  await  axios("veterian.json");
        return response.data;
    } catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}

export const VeterianScheduleCenter = async (doctorId) => {
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/getFreeScheduleByDoctorId', {
            params: {
                doctorId: doctorId
            }
        });
        // if (doctorId === "dr1"){
        //     const response = await axios('veterianScheduleCenter.json');
            const data = response.data;
            console.log('Data from JSON:', data);
            console.log('Doctor ID:', doctorId);
            return data;
        // }
    } catch (error) {
        console.error('Error fetching available times from center:', error);
        return [];
    }
};

export  const VeterianScheduleCenterWithoutDoctor = async () => {
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/getFreeScheduleWithTime');

        const data = response.data;
        console.log('Data from JSON:', data);
        return data;

    }catch (error) {
        console.error('Error fetching available times from center:', error);
        return [];
    }
}

export const VeterianScheduleHome = async () => {
    try {
        const response = await axiosInstance.get("http://localhost:8080/api/getFreeSchedule");
        // const response = await axios.get("veterianScheduleHome.json")
        console.log('Data from JSON:', response.data);  // Kiểm tra dữ liệu
        return response.data;
    } catch (error) {
        console.error('Error fetching schedule for home service:', error);
        return [];
    }
};