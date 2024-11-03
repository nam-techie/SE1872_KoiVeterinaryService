import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from '../pages/admin_Pages/styles/FeedbackForm.module.css';
import useFeedback from '../hooks/useFeedback';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

const FeedbackForm = ({ appointmentId, onSubmit, onClose }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const { submitFeedback } = useFeedback();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const feedbackData = {
                rating: rating,
                comment: comment
            };
            
            await submitFeedback(appointmentId, feedbackData);
            toast.success('Gửi đánh giá thành công!');
            onSubmit?.();
            onClose();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className={styles.feedbackOverlay}>
            <div className={styles.feedbackModal}>
                <h2>Đánh Giá Dịch Vụ</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.ratingContainer}>
                        <p className={styles.ratingLabel}>
                            Mức độ hài lòng của bạn: 
                            <span className={styles.ratingText}>
                                {rating === 0 ? "" : ` ${rating}/5 sao`}
                            </span>
                        </p>
                        <div className={styles.starRating}>
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                        />
                                        <FaStar
                                            className={styles.star}
                                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                            size={30}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                        <p className={styles.ratingHint}>
                            {hover === 1 && "Rất không hài lòng"}
                            {hover === 2 && "Không hài lòng"}
                            {hover === 3 && "Bình thường"}
                            {hover === 4 && "Hài lòng"}
                            {hover === 5 && "Rất hài lòng"}
                        </p>
                    </div>
                    <div className={styles.feedbackComment}>
                        <label htmlFor="comment">Nhận xét của bạn:</label>
                        <textarea
                            id="comment"
                            placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="4"
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button 
                            type="button" 
                            className={styles.cancelButton}
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button 
                            type="submit" 
                            className={styles.submitButton}
                            disabled={rating === 0}
                        >
                            Gửi đánh giá
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

FeedbackForm.propTypes = {
    appointmentId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func,
    onClose: PropTypes.func.isRequired
};

export default FeedbackForm; 