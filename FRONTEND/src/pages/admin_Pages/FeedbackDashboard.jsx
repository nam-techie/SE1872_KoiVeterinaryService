import React, { useState, useEffect } from 'react';
import { FaStar, FaSort, FaSearch, FaTrash, FaUndo } from 'react-icons/fa';
import './styles/FeedbackDashboard.css';
import LoadingCat from '../../components/LoadingCat.jsx';
import { useFeedback } from './hooks/useFeedback';

const FeedbackDashboard = () => {
    const { feedbacks, loading, error, fetchFeedbacks, deleteFeedback, restoreFeedback, setFeedbacks } = useFeedback();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('created_date');
    const [sortOrder, setSortOrder] = useState('desc');

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchFeedbacks();
            setFeedbacks(data.map(feedback => ({
                ...feedback,
                deleted: feedback.deleted || false // Đảm bảo isDeleted luôn có giá trị
            })));
        };
        fetchData();
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((star, index) => (
            <FaStar key={index} color={index < rating ? "#ffc107" : "#e4e5e9"} />
        ));
    };

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
            try {
                await deleteFeedback(id);
                setFeedbacks(prevFeedbacks => 
                    prevFeedbacks.map(feedback => 
                        feedback.id === id ? {...feedback, deleted: true} : feedback
                    )
                );
                alert('Đánh giá đã được xóa thành công.');
            } catch (err) {
                console.error('Lỗi khi xóa đánh giá:', err);
            
            }
        }
    };

    const handleRestore = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn khôi phục đánh giá này?')) {
            try {
                await restoreFeedback(id);
                setFeedbacks(prevFeedbacks => 
                    prevFeedbacks.map(feedback => 
                        feedback.id === id ? {...feedback, deleted: false} : feedback
                    )
                );
                alert('Đánh giá đã được khôi phục thành công.');
            } catch (err) {
                console.error('Lỗi khi khôi phục đánh giá:', err);
            }
        }
    };

    if (loading) return <LoadingCat />;
    if (error) return <div className="error-message">{error}</div>;

    const sortedFeedbacks = [...feedbacks].sort((a, b) => {
        if (sortBy === 'rating') {
            return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        } else if (sortBy === 'appointmentId') {
            return sortOrder === 'asc' 
                ? a.appointment.id - b.appointment.id
                : b.appointment.id - a.appointment.id;
        } else if (sortBy === 'created_date') {
            return sortOrder === 'asc' 
                ? new Date(a.created_date) - new Date(b.created_date)
                : new Date(b.created_date) - new Date(a.created_date);
        } else if (sortBy === 'status') {
            // Sắp xếp theo trạng thái
            const statusA = a.deleted ? 'deleted' : 'active';
            const statusB = b.deleted ? 'deleted' : 'active';
            return sortOrder === 'asc' 
                ? statusA.localeCompare(statusB)
                : statusB.localeCompare(statusA);
        }
        return 0;
    });

    const filteredFeedbacks = sortedFeedbacks.filter(feedback =>
        feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="feedback-dashboard">
            <div className="dashboard-header">
                <h2>Quản Lý Đánh Giá</h2>
            </div>
            <div className="search-sort-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <FaSearch className="search-icon" />
                </div>
                <div className="sort-box">
                    <select
                        onChange={(e) => handleSort(e.target.value)}
                        value={sortBy}
                        className="sort-select"
                    >
                        <option value="created_date">Sắp xếp theo Ngày tạo</option>
                        <option value="rating">Sắp xếp theo Đánh giá</option>
                        <option value="appointmentId">Sắp xếp theo Mã cuộc hẹn</option>
                        <option value="status">Sắp xếp theo Trạng thái</option>
                    </select>
                </div>
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="sort-order-btn"
                >
                    {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
                    <FaSort />
                </button>
            </div>
            <div className="feedback-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mã cuộc hẹn</th>
                            <th>Đánh giá</th>
                            <th>Nhận xét</th>
                            <th>Ngày tạo</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedbacks.map((feedback) => (
                            <tr key={feedback.id}>
                                <td>{feedback.appointment.id}</td>
                                <td>{renderStars(feedback.rating)}</td>
                                <td>{feedback.comment}</td>
                                <td>{new Date(feedback.created_date).toLocaleDateString()}</td>
                                <td>
                                    <span className={`status-badge ${feedback.deleted ? 'inactive' : 'active'}`}>
                                        {feedback.deleted ? 'Đã xóa' : 'Đang hiển thị'}
                                    </span>
                                </td>
                                <td>
                                    {feedback.deleted ? (
                                        <button 
                                            className="restore-btn" 
                                            onClick={() => handleRestore(feedback.id)}
                                        >
                                            <FaUndo />
                                        </button>
                                    ) : (
                                        <button 
                                            className="delete-btn" 
                                            onClick={() => handleDelete(feedback.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedbackDashboard;