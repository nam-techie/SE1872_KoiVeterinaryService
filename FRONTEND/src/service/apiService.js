import axios from "axios";
import {axiosInstance, convertIdsToString} from "./apiRequest";


export const getServiceList = async () => {
    try {
        const response = await axios.get('http://localhost:8080/api/getAllServiceType');
        // const response = await axios('service_types.json');
        console.log("API Response:", response.data);
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};

export const getDistrictList = async () => {
    try {
        const response = await axiosInstance.get('http://localhost:8080/api/getAllZone');
        // const response = await axios('zones.json');
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

