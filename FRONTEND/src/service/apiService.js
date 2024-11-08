import {axiosInstance, convertIdsToString} from "./apiRequest";

export const getServiceList = async () => {
    try {
        const response = await axiosInstance.get('/getAllServiceType');
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
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};

export const getSupportServiceList = async () => {
    try {
        const response = await axiosInstance.get('/getAllSupportServiceType');
        console.log("Support Service API Response:", response.data);
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching support services:', error);
        return [];
    }
};

export const getZonePriceList = async () => {
    try {
        const response = await axiosInstance.get('/getAllZonePrice');
        console.log("Zone Price API Response:", response.data);
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching zone prices:', error);
        return [];
    }
};

