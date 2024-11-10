import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../service/apiRequest';

const useDoctorWork = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDoctorWork = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/manageDoctorWork');
            
            const formattedAppointments = response.data.map(appointment => ({
                id: Math.random().toString(),
                title: `${appointment.serviceType} - ${appointment.doctorWorkName}\nTrạng thái: ${appointment.appointmentStatus}`,
                start: new Date(`${appointment.appointmentDate}T${appointment.appointmentTimeStart}`),
                end: new Date(`${appointment.appointmentDate}T${appointment.appointmentTimeEnd}`),
                doctorName: appointment.doctorWorkName,
                serviceType: appointment.serviceType,
                status: appointment.appointmentStatus,
                resourceId: appointment.doctorWorkName
            }));

            setAppointments(formattedAppointments);
            setLoading(false);
        } catch (err) {
            setError('Có lỗi xảy ra khi tải lịch làm việc của bác sĩ');
            setLoading(false);
            console.error('Error fetching doctor work:', err);
        }
    };

    useEffect(() => {
        fetchDoctorWork();
    }, []);

    return {
        appointments,
        loading,
        error,
        refetch: fetchDoctorWork
    };
};

export default useDoctorWork; 