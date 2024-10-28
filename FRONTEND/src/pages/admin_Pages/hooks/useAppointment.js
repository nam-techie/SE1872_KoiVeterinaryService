import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../service/apiRequest';

const useAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axiosInstance.get('/admin/listAppointment');
            setAppointments(response.data);
        } catch (err) {
            setError('Có lỗi xảy ra khi tải danh sách lịch hẹn');
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return {
        appointments,
        loading,
        error,
        refetch: fetchAppointments
    };
};

export default useAppointment;