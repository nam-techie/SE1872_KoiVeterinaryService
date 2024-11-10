import {axiosInstance, convertIdsToString} from "./apiRequest";

export const getServiceList = async () => {
    try {
        const response = await axiosInstance.get('/getAllServiceType');
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
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching support services:', error);
        return [];
    }
};

export const getZonePriceList = async () => {
    try {
        const response = await axiosInstance.get('/getAllZonePrice');
        return convertIdsToString(response.data);
    } catch (error) {
        console.error('Error fetching zone prices:', error);
        return [];
    }
};

