import React, { useState } from 'react';
import { FaStar, FaSort, FaSearch } from 'react-icons/fa';
import './styles/FeedbackDashboard.css';

const FeedbackDashboard = () => {
    const [feedbacks, setFeedbacks] = useState([
        { id: 1, appointmentId: 'APT001', rating: 5, comment: 'Dịch vụ rất tốt, bác sĩ rất chuyên nghiệp!', customerName: 'Nguyễn Văn A' },
        { id: 2, appointmentId: 'APT002', rating: 4, comment: 'Hài lòng với dịch vụ, nhưng thời gian chờ hơi lâu.', customerName: 'Trần Thị B' },
        { id: 3, appointmentId: 'APT003', rating: 5, comment: 'Bác sĩ rất tận tâm, giải thích rõ ràng về tình trạng bệnh.', customerName: 'Lê Văn C' },
        { id: 4, appointmentId: 'APT004', rating: 3, comment: 'Dịch vụ ổn, nhưng cần cải thiện thêm về cơ sở vật chất.', customerName: 'Phạm Thị D' },
        { id: 5, appointmentId: 'APT005', rating: 5, comment: 'Rất hài lòng với kết quả điều trị, sẽ giới thiệu cho bạn bè!', customerName: 'Hoàng Văn E' },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('rating');
    const [sortOrder, setSortOrder] = useState('desc');

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

    const sortedFeedbacks = [...feedbacks].sort((a, b) => {
        if (sortBy === 'rating') {
            return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        } else if (sortBy === 'appointmentId') {
            return sortOrder === 'asc' 
                ? a.appointmentId.localeCompare(b.appointmentId)
                : b.appointmentId.localeCompare(a.appointmentId);
        }
        return 0;
    });

    const filteredFeedbacks = sortedFeedbacks.filter(feedback =>
        feedback.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
                        <option value="rating">Sắp xếp theo Đánh giá</option>
                        <option value="appointmentId">Sắp xếp theo Mã cuộc hẹn</option>
                    </select>
                </div>
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="sort-order-btn"
                >
                    {sortOrder === 'asc' ? 'Theo thứ tự từ A - Z' : 'Theo thứ tự từ Z - A'}
                    <FaSort />
                </button>
            </div>
            <div className="feedback-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mã cuộc hẹn</th>
                            <th>Khách hàng</th>
                            <th>Đánh giá</th>
                            <th>Nhận xét</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedbacks.map((feedback) => (
                            <tr key={feedback.id}>
                                <td>{feedback.appointmentId}</td>
                                <td>{feedback.customerName}</td>
                                <td>{renderStars(feedback.rating)}</td>
                                <td>{feedback.comment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FeedbackDashboard;
