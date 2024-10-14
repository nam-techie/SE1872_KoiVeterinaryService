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

export const VeterianScheduleTimeSlot = async () =>{
    try{
        // const response = await  axios("/api/VeterianTimeSlot");
        const response = await  axios("timeSlot.json");
        return response.data;
    }catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}
//api để lấy thoi gian sang chieu cho cac ca lam viec
export const VeterianScheduleTimePeriods = async () =>{
    try{
        // const response = await  axios("/api/VeterianTimePeriods");
        const response = await  axios("timePeriods.json");
        return response.data;
    }catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}
//api de lay ngay lam viec cua bac si
export const VeterianScheduleAvailableDay = async (doctorId) =>{
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/getFreeScheduleByDoctorId');
        // const response = await axios('/dataDemo.json');
        const data = response.data;
        console.log('Data from JSON:', data);  // Log toàn bộ dữ liệu để xem có dữ liệu không

        // Kiểm tra doctorId
        console.log('Doctor ID:', doctorId);

        // Kiểm tra availableTimes cho doctorId
        const availableDays = data.availableTimes[doctorId] ? Object.keys(data.availableTimes[doctorId]) : [];

        return availableDays;
    } catch (error) {
        console.error('Error fetching available days:', error);
        return [];
    }
}
//Ham Lay cac gio giac cu the cua dat lich tai trung tam
export const VeterianScheduleAvailableSlots = async (doctorId, selectedDay) =>{
    try {
        //const response = await axiosInstance().get('/api/doctorslot');
        const response = await axios('/dataDemo.json');
        const data = response.data;
        console.log('Data from JSON:', data);  // Kiểm tra toàn bộ dữ liệu

        console.log('Doctor ID:', doctorId);
        console.log('Selected Day:', selectedDay);

        const availableTimes = data.availableTimes[doctorId]?.[selectedDay] || [];
        console.log('Available times:', availableTimes);  // Log danh sách thời gian

        return availableTimes;
    } catch (error) {
        console.error('Error fetching available times:', error);
        return [];
    }
}
