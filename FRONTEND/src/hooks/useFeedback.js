import { useState } from 'react';
import { axiosInstance } from '../service/apiRequest';

const useFeedback = () => {
    const submitFeedback = async (feedbackData) => {
        try {
            const response = await axiosInstance.post(
                '/createFeedback',
                feedbackData
            );

            console.log('Response from API:', response.data);

            if (response.data) {
                return response.data;
            } else {
                throw new Error('Không có dữ liệu trả về');
            }
        } catch (err) {
            console.error('Error submitting feedback:', err);
            throw new Error('Có lỗi xảy ra khi gửi đánh giá');
        }
    };

    return {
        submitFeedback
    };
};

export default useFeedback;
