import axios from "axios";

export const VeterianList = async () =>{
    try{
        // const response = await axios("http://localhost:8080/api/VeterianList");
        const  response =  await  axios("veterian.json");
        return response.data;
    } catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}

export const VeterianScheduleTimeSlot = async () =>{
    try{
        // const response = await  axios("https://localhost:8080/api/VeterianTimeSlot");
        const response = await  axios("timeSlot.json");
        return response.data;
    }catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}

export const VeterianScheduleTimePeriods = async () =>{
    try{
        // const response = await  axios("https://localhost:8080/api/VeterianTimePeriods");
        const response = await  axios("timePeriods.json");
        return response.data;
    }catch (error){
        console.error('Error fetching veterian list:', error);
        return [];
    }
}
