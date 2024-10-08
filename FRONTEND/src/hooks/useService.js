// useService.js
import { useState, useEffect } from 'react';
import {ServiceBookingData} from "../services/apiService.js"


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
