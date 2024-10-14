import axiosInstance from "./axiosInstance.js";

export const getCustomerInf = async () =>{
    try{
        const response = await axiosInstance("http://localhost:8080/api/userInf");
        return response.data;
    }catch (error){
        console.error("Error fetching data: ", error);
        return [];
    }
}

export const getVeterianInf = async () =>{
    try{
        const response = await axiosInstance("http://localhost:8080/api/veterianInf")
        return response.data;
    }catch (error){
        console.error("Error fetching data: ", error);
        return [];
    }
}

export const getStaffInf = async () =>{
    try{
        const response = await axiosInstance("http://localhost:8080/api/staffInf")
        return response.data;
    }catch (error){
        console.error("Error fetching data: ", error);
        return [];
    }
}
