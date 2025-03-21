
import {axiosInstance} from "./apiRequest.js";

export const getDoctorList = async () => {
    try {
        const response = await axiosInstance.get("/getAllDoctor");
        return response.data;
    } catch (error) {
        console.error("Error Fetching Doctor List", error);
        return [];
    }
}

export const getdoctorScheduleCenter = async () =>{
    try{
        const response = await axiosInstance.get("/customer/getFreeScheduleWithTime");
        // const response = await axios.get("doctorScheduleCenter.json");
        return response.data;
    }catch(error){
        console.error("Error Fetching Data", error);
        return[];
    }
}

export const getdoctorScheduleHome = async () => {
    try {
        const response = await axiosInstance.get("/customer/getFreeSchedule");
        return response.data
    } catch (error) {
        console.error('Error fetching schedule for home service:', error);
        return [];
    }
};


export const getdoctorScheduleCenterByID = async (doctorId) => {
    try {
        const response = await axiosInstance.get('/customer/getFreeScheduleByDoctorId', {
            params: {
                doctorId: doctorId
            }
        });
            return response.data;
    } catch (error) {
        console.error('Error fetching available times from center:', error);
        return [];
    }
};

export const getDoctorDetail = async (doctorId) => {
    try {
        const response = await axiosInstance.get(`/getDoctorDetail/${doctorId}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin chi tiết bác sĩ", error);
        return null;
    }
}
