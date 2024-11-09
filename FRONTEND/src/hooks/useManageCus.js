import { axiosInstance } from '../service/apiRequest';
import moment from 'moment';

const useManageCus = () => {
    const getAppointments = async () => {
        try {
            const response = await axiosInstance.get(
                `/customer/listAppointmentUser`
            );

            const transformedData = response.data.map(appointment => ({
                appointmentId: appointment.appointmentId,
                appointmentDate: moment(appointment.appointmentDate).format('DD/MM/YYYY'),
                time: appointment.timestamp,
                serviceType: appointment.serviceType,
                appointmentStatus: appointment.appointmentStatus,
                ...appointment
            }));

            return transformedData;
        } catch (err) {
            console.error('Error fetching appointments:', err);
            throw new Error('Có lỗi xảy ra khi tải dữ liệu');
        }
    };

    const cancelAppointment = async (appointmentId, data) => {
        try {
            const response = await axiosInstance.put(
                `/customer/cancelAppointmentByCustomer`,
                {
                    appointmentId: appointmentId,
                    notes: data.notes
                }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi hủy lịch hẹn');
        }
    };

    const getPaymentUrl = async (appointmentId) => {
        try {
            const response = await axiosInstance.post(
                `/customer/sendUrlPayment/${appointmentId}`
            );
            return response.data;
        } catch (err) {
            console.error('Error getting payment URL:', err);
            throw new Error('Có lỗi xảy ra khi tạo đường dẫn thanh toán');
        }
    };

    const submitFeedback = async (appointmentId, feedbackData) => {
        try {
            const response = await axiosInstance.post(
                `/customer/createFeedback/${appointmentId}`,
                feedbackData
            );
            return response.data;
        } catch (err) {
            console.error('Error submitting feedback:', err);
            throw new Error('Có lỗi xảy ra khi gửi đánh giá');
        }
    };

    const getAppointmentDetail = async (appointmentId) => {
        try {
            const response = await axiosInstance.get(
                `/customer/getFullInfoCustomer/${appointmentId}`
            );
            
            if (response.data) {
                console.log('Appointment detail:', response.data);
                return response.data;
            } else {
                throw new Error('Không có dữ liệu chi tiết lịch hẹn');
            }
        } catch (err) {
            console.error('Error fetching appointment detail:', err);
            if (err.response) {
                throw new Error(err.response.data || 'Có lỗi xảy ra khi tải chi tiết lịch hẹn');
            } else {
                throw new Error('Không thể kết nối đến server');
            }
        }
    };

    const changePassword = async (passwordData) => {
        try {
            const response = await axiosInstance.post(
                '/customer/changePasswordCustomer',
                passwordData
            );
            return response.data;
        } catch (err) {
            if (err.response) {
                throw new Error(err.response.data || 'Có lỗi xảy ra khi đổi mật khẩu');
            }
            throw new Error('Không thể kết nối đến server');
        }
    };

    return {
        getAppointments,
        cancelAppointment,
        getPaymentUrl,
        submitFeedback,
        getAppointmentDetail,
        changePassword,
    };
};

export default useManageCus; 