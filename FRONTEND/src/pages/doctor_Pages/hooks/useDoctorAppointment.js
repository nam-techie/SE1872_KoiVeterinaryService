import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../service/apiRequest';
import { message } from 'antd';
import moment from 'moment';

const useDoctorAppointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/veterinary/getListAppointmentDoctor');
            
            // Transform backend data to match frontend structure
            const transformedData = response.data.map(appointment => ({
                id: appointment.appointmentId.toString(),
                date: moment(appointment.appointmentDate).format('YYYY-MM-DD'),
                time: moment(appointment.appointmentTime, 'HH:mm:ss').format('HH:mm:ss'),
                service: appointment.serviceType,
                status: appointment.appointmentStatus,
            }));
            console.log(transformedData);

            setAppointments(transformedData);
            setError(null);
        } catch (err) {
            setError('Không thể tải danh sách lịch hẹn');
            message.error('Có lỗi xảy ra khi tải danh sách lịch hẹn');
            console.error('Error fetching appointments:', err);
        } finally {
            setLoading(false);
        }
    };

    const confirmAppointment = async (appointmentId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(
                `/veterinary/isDoctorConfirm/${appointmentId}`);
            
            if (response.data) {
                message.success('Xác nhận lịch hẹn thành công');
                // Refresh the appointments list
                await fetchAppointments();
            }
            return response.data;
        } catch (err) {
            message.error('Có lỗi xảy ra khi xác nhận lịch hẹn');
            console.error('Error confirming appointment:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const startService = async (appointmentId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.put(
                `/veterinary/updateWorkingStatus/${appointmentId}`
            );
            
            if (response.data) {
                message.success('Đã tiếp nhận dịch vụ thành công');
                // Refresh the appointments list
                await fetchAppointments();
            }
            return response.data;
        } catch (err) {
            message.error('Có lỗi xảy ra khi tiếp nhận dịch vụ');
            console.error('Error starting service:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const saveServiceRecord = async (appointmentId, serviceData) => {
        try {
            setLoading(true);
            const response = await axiosInstance.post(
                `/veterinary/saveServiceTypeAdd/${appointmentId}`,
                serviceData
            );
            
            if (response.data) {
                message.success('Đã lưu hồ sơ bệnh nhân thành công');
                // Refresh the appointments list
                await fetchAppointments();
            }
            return response.data;
        } catch (err) {
            message.error('Có lỗi xảy ra khi lưu hồ sơ bệnh nhân');
            console.error('Error saving service record:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchAppointments();
    }, []);

    return {
        appointments,
        loading,
        error,
        refreshAppointments: fetchAppointments,
        confirmAppointment,
        startService,
        saveServiceRecord
    };
};

export default useDoctorAppointment;