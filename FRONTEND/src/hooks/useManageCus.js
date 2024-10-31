import { useState, useEffect } from 'react';
import {axiosInstance} from "../service/apiRequest.js";

const useManageCus = () => {
    const getAppointments = async () => {
        try {
            const response = await axiosInstance.get(
                `/customer/listAppointmentUser`
            );
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const username = localStorage.getItem('username');
                console.log(username);
                if (!username) {
                    throw new Error('Không tìm thấy thông tin người dùng');
                }

                const response = await axiosInstance.get(
                    `/customer/listAppointmentByUsername`
                );

            console.log('Response from API:', response.data);

            if (response.data) {
                return response.data;
            } else {
                throw new Error('Không có dữ liệu trả về');
            }
        } catch (err) {
            console.error('Error fetching appointments:', err);
            throw new Error('Có lỗi xảy ra khi tải dữ liệu');
        }
    };

    return {
        getAppointments,
    };
};

export default useManageCus; 