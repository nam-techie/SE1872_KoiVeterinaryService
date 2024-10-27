import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../service/apiRequest';

export const useFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeedbacks = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/listAllFeedback');
            setFeedbacks(response.data);
            setError(null);
        } catch (err) {
            setError('Có lỗi xảy ra khi tải dữ liệu đánh giá');
            console.error('Lỗi khi tải dữ liệu đánh giá:', err);
        } finally {
            setLoading(false);
        }
    };

    const deleteFeedback = async (id) => {
        try {
            await axiosInstance.delete(`/admin/deleteFeedback/${id}`);
            await fetchFeedbacks(); // Cập nhật lại danh sách sau khi xóa
        } catch (error) {
            console.error('Lỗi khi xóa đánh giá:', error);
            throw error;
        }
    };

    const restoreFeedback = async (id) => {
        try {
            await axiosInstance.put(`/admin/restoreFeedback/${id}`);
            await fetchFeedbacks(); // Cập nhật lại danh sách sau khi khôi phục
        } catch (error) {
            console.error('Lỗi khi khôi phục đánh giá:', error);
            throw error;
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    return { feedbacks, loading, error, fetchFeedbacks, deleteFeedback, restoreFeedback };
};
