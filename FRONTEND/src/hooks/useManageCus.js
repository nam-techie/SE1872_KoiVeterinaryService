import { useState, useEffect } from 'react';
import axios from 'axios';
import { axiosInstance } from '../service/apiRequest';

const useManageCus = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const username = localStorage.getItem('username');
                if (!username) {
                    throw new Error('Không tìm thấy thông tin người dùng');
                }

                const response = await axiosInstance.get(
                    `/customer/listAppointment/${username}`
                );

                console.log('Response from API:', response.data);

                if (response.data) {
                    setAppointments(response.data);
                    setLoading(false);
                } else {
                    throw new Error('Không có dữ liệu trả về');
                }
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return {
        appointments,
        loading,
        error
    };
};

export default useManageCus; 