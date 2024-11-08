import React, {useState, useEffect} from 'react';
import {CustomerNavBar} from '../components/Navbar';
import styles from '../styles/FindDoctor.module.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { getDoctorList, getDoctorDetail } from '../service/apiDoctor';
import Footer from "../components/Footer.jsx";
import ContactButton from "../components/ContactButton.jsx";

function FindDoctor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [experience, setExperience] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const feedbacksPerPage = 1;
    const [doctorDetail, setDoctorDetail] = useState(null);

    // Fetch danh sách bác sĩ khi component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            const data = await getDoctorList();
            setDoctors(data);
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter(doctorData =>
        (doctorData.doctor?.fullName?.toLowerCase() || '').includes(searchTerm.toLowerCase()) &&
        (specialty === '' || doctorData.doctor?.specialty === specialty) &&
        (experience === '' || doctorData.doctor?.experience >= parseInt(experience))
    );

    const handleDoctorClick = async (doctor) => {
        try {
            const details = await getDoctorDetail(doctor.id);
            if (details) {
                setDoctorDetail(details);
                setCurrentPage(1);
            }
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết bác sĩ:", error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderStars = (rating) => {
        // Nếu rating là null, undefined, 0 hoặc NaN
        if (!rating || isNaN(rating)) {
            return <span className={styles.noRating}>Chưa có đánh giá</span>;
        }

        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        // Thêm sao đầy
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`star-${i}`} className={styles.starIcon} />);
        }

        // Thêm nửa sao nếu có
        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half-star" className={styles.starIcon} />);
        }

        // Thêm sao rỗng cho đủ 5 sao
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<AiOutlineStar key={`empty-star-${i}`} className={styles.starIcon} />);
        }

        return (
            <div className={styles.ratingContainer}>
                {stars}
                <span className={styles.ratingText}>({rating})</span>
            </div>
        );
    };

    const renderFeedbackSection = () => {
        if (!doctorDetail?.feedback || doctorDetail.feedback.length === 0) {
            return (
                <div className={styles.feedbackSection}>
                    <h3>Đánh giá từ khách hàng</h3>
                    <p className={styles.noFeedback}>Chưa có đánh giá nào</p>
                </div>
            );
        }

        const indexOfLastFeedback = currentPage * feedbacksPerPage;
        const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
        const currentFeedbacks = doctorDetail.feedback.slice(indexOfFirstFeedback, indexOfLastFeedback);
        const totalPages = Math.ceil(doctorDetail.feedback.length / feedbacksPerPage);

        return (
            <div className={styles.feedbackSection}>
                <h3>Đánh giá từ khách hàng</h3>
                {currentFeedbacks.map(feedback => (
                    <div key={feedback.id} className={styles.feedbackItem}>
                        <div className={styles.feedbackHeader}>
                            <div className={styles.customerInfo}>
                                <span className={styles.customerName}>{feedback.username}</span>
                                <span className={styles.feedbackTime}>{feedback.createdDate}</span>
                            </div>
                            <div className={styles.ratingContainer}>
                                {renderStars(feedback.rating)}
                            </div>
                        </div>
                        <div className={styles.serviceName}>
                            Dịch vụ: {feedback.serviceName}
                        </div>
                        <div className={styles.feedbackComment}>
                            {feedback.comments}
                        </div>
                    </div>
                ))}

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button 
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        <span className={styles.pageInfo}>
                            {currentPage}/{totalPages}
                        </span>
                        <button 
                            className={styles.pageButton}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
        <CustomerNavBar/>
        <div>
            
            <div className={styles.findDoctorContainer}>
                <h1>Tìm Bác sĩ</h1>
                <div className={styles.searchBarContainer}>
                    <div className={styles.filterWrapper}>
                        <select
                            className={styles.experienceSelect}
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        >
                            <option value="">Kinh nghiệm</option>
                            <option value="5">5 năm trở lên</option>
                            <option value="10">10 năm trở lên</option>
                            <option value="15">15 năm trở lên</option>
                        </select>
                    </div>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            placeholder="Nhập tên bác sĩ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={styles.doctorSearchInput}
                        />
                    </div>
                </div>

                <h2>Danh sách Bác sĩ</h2>
                <div className={styles.doctorGrid}>
                    {filteredDoctors.map(doctorData => (
                        <div key={doctorData.doctor.id} className={styles.doctorCard}>
                            <div className={styles.doctorImageContainer}>
                                <img 
                                    src={doctorData.doctor.imageUrl}
                                    alt={doctorData.doctor.fullName}
                                    className={styles.doctorImage}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctorData.doctor.fullName)}&background=random`;
                                    }}
                                />
                            </div>
                            <h3 className={styles.doctorName}>{doctorData.doctor.fullName}</h3>
                            <p className={styles.doctorExperience}>Kinh nghiệm: {doctorData.doctor.experience} năm</p>
                            <p className={styles.doctorPhone}>Bằng cấp: {doctorData.qualification}</p>
                            <div className={styles.doctorRating}>
                                {renderStars(doctorData.rateAverage)}
                            </div>
                            <button 
                                className={styles.detailButton}
                                onClick={() => handleDoctorClick(doctorData.doctor)}
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </div>

                {doctorDetail && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <h2>{doctorDetail.doctorInfo.fullName}</h2>
                            <p><strong>Kinh nghiệm:</strong> {doctorDetail.doctorInfo.experience} năm</p>
                            <p><strong>Chuyên khoa:</strong> {doctorDetail.doctorInfo.specialty}</p>
                            <p><strong>Mô tả:</strong> {doctorDetail.doctorInfo.description}</p>
                            <p><strong>Bằng cấp:</strong> {doctorDetail.doctorInfo.qualification}</p>
                            
                            {renderFeedbackSection()}
                            
                            <button onClick={() => {
                                setDoctorDetail(null);
                                setCurrentPage(1);
                            }}>
                                Đóng
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
                    <ContactButton/>
                    <Footer/>
                    </>
    );
}

export default FindDoctor;