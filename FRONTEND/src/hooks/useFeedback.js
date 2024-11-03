import { useState } from 'react';
import { axiosInstance } from '../service/apiRequest';

const useFeedback = () => {
    const submitFeedback = async (appointmentId, feedbackData) => {
        try {
            const response = await axiosInstance.post(
                `/customer/createFeedback/${appointmentId}`,
                feedbackData
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá');
        }
    };

    return { submitFeedback };
};

export default useFeedback;
