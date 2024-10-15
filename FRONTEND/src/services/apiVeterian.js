import axios from "axios";
import axiosInstance from "./axiosInstance.js";
// import axiosInstance from "./axiosInstance.js";

export const VeterianList = async () =>{
    try{
        const response = await axiosInstance.get("http://localhost:8080/api/getAllDoctor");
        // const  response =  await  axios("veterian.json");
        return response.data;
    } catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}

export const VeterianScheduleCenter = async (doctorId) => {
    try {
        // const response = await axios("http://localhost:8080/api/VeterianScheduleCenter");
        // const response = await axios(`/veterianScheduleCenter.json`); // Giả sử đây là dữ liệu từ backend hoặc file JSON
        const response = await axiosInstance.get('http://localhost:8080/api/getFreeScheduleByDoctorId');
        // const response = await axios('/dataDemo.json');
        const data = response.data;

        console.log('Doctor ID:', doctorId);
        console.log('Data from JSON:', data);  // Kiểm tra dữ liệu

        // Trả về dữ liệu cần thiết dựa trên ID bác sĩ
        return data.availableTimes[doctorId] || [];
    } catch (error) {
        console.error('Error fetching available times from center:', error);
        return [];
    }
};

export const VeterianScheduleHome = async () => {
    try {
        const response = await axios("http://localhost:8080/api/VeterianScheduleHome");
        // const response =await axios(`/veterianScheduleHome.json`); //
        return response.data;
    } catch (error) {
        console.error('Error fetching schedule for home service:', error);
        return [];
    }
};