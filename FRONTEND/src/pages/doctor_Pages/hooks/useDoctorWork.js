import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../service/apiRequest';

const useDoctorWork = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axiosInstance.get('/veterinary/getListDoctorWork');
                
                // Đảm bảo response.data là một mảng
                const appointmentList = Array.isArray(response.data) ? response.data : [];
                
                const formattedAppointments = appointmentList.map(appointment => {
                    // Tạo đối tượng Date cho start time
                    const startDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTimeStart}`);
                    // Tạo đối tượng Date cho end time
                    const endDateTime = new Date(`${appointment.appointmentDate}T${appointment.appointmentTimeEnd}`);

                    return {
                        id: appointment.appointmentId,
                        title: `${appointment.serviceType} - ${appointment.appointmentStatus}`,
                        start: startDateTime,
                        end: endDateTime,
                        status: appointment.appointmentStatus,
                        serviceType: appointment.serviceType
                    };
                });

                console.log('Formatted Appointments:', formattedAppointments); // Log để debug
                setAppointments(formattedAppointments);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching appointments:', err);
                setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    return { appointments, loading, error };
};

export default useDoctorWork;