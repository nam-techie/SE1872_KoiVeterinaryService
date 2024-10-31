import { useState } from 'react';
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

    const cancelAppointment = async (appointmentId) => {
        try {
            await axiosInstance.put(`/admin/cancelAppointmentByAdmin/${appointmentId}`);
            // Cập nhật lại danh sách sau khi hủy thành công
            await fetchAppointments();
            return true;
        } catch (err) {
            console.error('Lỗi khi hủy lịch hẹn:', err);
            throw new Error('Có lỗi xảy ra khi hủy lịch hẹn');
        }
    };

    const confirmPaymentDeposit = async (appointmentId) => {
        try {
            const response = await axiosInstance.post(`/admin/confirmPayment/${appointmentId}`);
            // Cập nhật lại danh sách sau khi xác nhận thanh toán thành công
            await fetchAppointments();
            return response.data;
        } catch (err) {
            console.error('Lỗi khi xác nhận thanh toán:', err);
            throw new Error('Có lỗi xảy ra khi xác nhận thanh toán');
        }
    };

    return {
        appointments,
        loading,
        error,
        refetch: fetchAppointments,
        cancelAppointment,
        confirmPaymentDeposit
    };
};

export default useAppointment;
