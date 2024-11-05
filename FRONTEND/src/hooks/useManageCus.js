import { useState, useEffect } from 'react';
import { axiosInstance } from '../service/apiRequest';

const useManageCus = () => {
    const getAppointments = async () => {
        try {
            const response = await axiosInstance.get(
                `/customer/listAppointmentUser`
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

    const cancelAppointment = async (appointmentId) => {
        try {
            const response = await axiosInstance.put(
                `/customer/cancelAppointmentByCustomer/${appointmentId}`
            );
            return response.data;
        } catch (err) {
            console.error('Error canceling appointment:', err);
            throw new Error('Có lỗi xảy ra khi hủy lịch hẹn');
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
            return response.data;
        } catch (err) {
            console.error('Error fetching appointment detail:', err);
            throw new Error('Có lỗi xảy ra khi tải chi tiết lịch hẹn');
        }
    };

    return {
        getAppointments,
        cancelAppointment,
        getPaymentUrl,
        submitFeedback,
        getAppointmentDetail,
    };
};

export default useManageCus; 