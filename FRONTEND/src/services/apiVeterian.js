
import {convertIdsToString,axiosInstance} from "./apiRequest.js";

export const VeterianList = async () =>{
    try{
        const response = await axiosInstance.get("http://localhost:8080/api/getAllDoctor");
        // const  response =  await  axios("veterian.json");
        return convertIdsToString(response.data);
    } catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}

export const VeterianScheduleCenterByID = async (doctorId) => {
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/getFreeScheduleByDoctorId', {
            params: {
                doctorId: doctorId
            }
        });
        // if (doctorId === "1"){
        //     const response = await axios('veterianScheduleCenterByDoctorID.json');
        //     const data = response.data;
            console.log('Data from JSON:', response.data);
            console.log('Doctor ID:', doctorId);
            return response.data;
        // }
    } catch (error) {
        console.error('Error fetching available times from center:', error);
        return [];
    }
};

export const VeterianScheduleHome = async () => {
    try {
        const response = await axiosInstance.get("http://localhost:8080/api/getFreeSchedule");
        // const response = await axios.get("veterianScheduleHome.json")
        console.log('Data from JSON:', response.data);  // Kiểm tra dữ liệu
        return response.data
    } catch (error) {
        console.error('Error fetching schedule for home service:', error);
        return [];
    }
};

export const VeterianScheduleCenter = async () => {
    try{
        const  response = await axiosInstance.get("http://localhost:8080/api/getFreeScheduleWithTime")
        // const  response  = await axios.get('veterianScheduleCenter.json');
        console.log('Data from JSON:', response.data);  // Kiểm tra dữ liệu
        return response.data;
    } catch (error) {
        console.error('Error fetching schedule for home service:', error);
        return [];
    }
}