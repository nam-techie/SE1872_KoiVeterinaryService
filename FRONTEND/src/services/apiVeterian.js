import axios from "axios";
import axiosInstance from "./axiosInstance.js";

export const VeterianList = async () =>{
    try{
        const response = await axiosInstance.get('/getVeterians');
        // const  response =  await  axios("veterian.json");
        return response.data;
    } catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}

export const VeterianScheduleTimeSlot = async () =>{
    try{
        // const response = await axiosInstance().get("/testFreeScheduleByVeterianId")
        // const response = await  axios("http://localhost:8080/api/VeterianTimeSlot");
        const response = await  axios("timeSlot.json");
        return response.data;
    }catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}

export const VeterianScheduleTimePeriods = async () =>{
    try{
        // const response = await axiosInstance().get("/testFreeSchedule")
        // const response = await  axios("http://localhost:8080/api/VeterianTimePeriods");
        const response = await  axios("timePeriods.json");
        return response.data;
    }catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}
