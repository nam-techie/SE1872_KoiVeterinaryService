// useService.js
import { useState, useEffect } from 'react';
import {ServiceBookingData} from "../services/apiService.js"
import {VeterianList} from "../services/apiVeterian.js";


export const useServiceBookingData = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Bắt đầu fetch dữ liệu từ /serviceBooking.json');

        const getData = async () => {
            try {
                const data = await ServiceBookingData();
                setServices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    return { services, loading, error };
};

export const useVeterianList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const data = await VeterianList(); // Gọi hàm VeterianList để lấy dữ liệu
                setDoctors(data); // Đặt dữ liệu vào state
            } catch (err) {
                setError("Đã xảy ra lỗi khi lấy dữ liệu bác sĩ.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    return { doctors, loading, error };
};


