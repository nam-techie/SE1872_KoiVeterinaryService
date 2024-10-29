
import {axiosInstance, convertIdsToString} from "./apiRequest";


export const getServiceList = async () => {
    try {
        const response = await axiosInstance.get('/customer/getAllServiceType');
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
        const response = await axiosInstance.get('/customer/getAllZone');
        // const response = await axios('zones.json');
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

