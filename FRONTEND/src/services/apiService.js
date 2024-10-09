import axiosInstance from "./axiosInstance.js"; // Sử dụng axiosInstance thay vì axios

export const ServiceList = async () => {
    try {
        // Sử dụng axiosInstance để gọi API
        const response = await axiosInstance.get('/service-types');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
};

export const ServiceBookingData = async () => {
    try {
        const response = await axiosInstance.get('/servicesBookingData');
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export const getDistrict = async () => {
    try {
        const response = await axiosInstance.get('/zones'); // Sử dụng axiosInstance
        return response.data;
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}
