import React, { useState, useEffect } from 'react';
import { CustomerNavBar } from "../../components/Navbar";
import styles from "./styles/ManageAppointment.module.css";
import Footer from "../../components/Footer";
import useManageCus from '../../hooks/useManageCus';
import { FaSearch } from 'react-icons/fa';
import LoadingCat from '../../components/LoadingCat.jsx';
import Pagination from '../../components/Pagination';
import FeedbackForm from '../../components/FeedbackForm';
import { axiosInstance } from '../../service/apiRequest.js';

const ManageAppointment = () => {
    const { getAppointments, cancelAppointment, getPaymentUrl } = useManageCus();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateSearch, setDateSearch] = useState('');
    const [sortBy, setSortBy] = useState('appointmentDate');
    const [sortOrder, setSortOrder] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('all');
    
    // Thêm state cho phân trang
    const [currentPage, setCurrentPage] = useState(1);
    const appointmentsPerPage = 6; // Số lượng lịch hẹn trên mỗi trang

    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

    const fetchAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();

        const interval = setInterval(() => {
            fetchAppointments();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return <LoadingCat />;
    if (error) return <div>Lỗi: {error}</div>;

    const filteredAndSortedAppointments = appointments
        .filter(appointment => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                appointment.appointmentId?.toString().includes(searchLower) ||
                appointment.serviceType?.toLowerCase().includes(searchLower);

            const matchesStatus = statusFilter === 'all' || 
                appointment.appointmentStatus === statusFilter;

            if (dateSearch) {
                return matchesSearch && appointment.appointmentDate.includes(dateSearch) && matchesStatus;
            }
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'appointmentDate') {
                const dateA = new Date(a.appointmentDate);
                const dateB = new Date(b.appointmentDate);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
            if (sortBy === 'status') {
                const statusA = a.appointmentStatus === 'Đã đánh giá' ? 1 : 0;
                const statusB = b.appointmentStatus === 'Đã đánh giá' ? 1 : 0;
                return sortOrder === 'asc' ? statusA - statusB : statusB - statusA;
            }
            return 0;
        });

    // Tính toán tổng số trang
    const totalPages = Math.ceil(filteredAndSortedAppointments.length / appointmentsPerPage);

    // Lấy appointments cho trang hiện tại
    const currentAppointments = filteredAndSortedAppointments.slice(
        (currentPage - 1) * appointmentsPerPage,
        currentPage * appointmentsPerPage
    );

    // Xử lý thay đổi trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRating = (appointmentId) => {
        console.log('handleRating called with ID:', appointmentId);
        setSelectedAppointmentId(appointmentId);
        setShowFeedbackForm(true);
        console.log('showFeedbackForm set to:', true);
    };

    const handleFeedbackSubmit = async (feedbackData) => {
        try {
            // Gọi API để gửi feedback
            await axiosInstance.post('/customer/submitFeedback', feedbackData);
            setShowFeedbackForm(false);
            // Có thể thêm thông báo thành công
        } catch (error) {
            console.error('Error submitting feedback:', error);
            // Xử lý lỗi
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy lịch hẹn này không?')) {
            try {
                await cancelAppointment(appointmentId);
                // Cập nhật lại danh sách lịch hẹn
                fetchAppointments();
                alert('Hủy lịch hẹn thành công');
            } catch (error) {
                alert('Có lỗi xảy ra khi hủy lịch hẹn: ' + error.message);
            }
        }
    };

    const handlePayment = async (appointmentId) => {
        try {
            const paymentUrl = await getPaymentUrl(appointmentId);
            if (paymentUrl) {
                window.location.href = paymentUrl; // Chuyển hướng đến trang thanh toán
            } else {
                throw new Error('Không nhận được URL thanh toán');
            }
        } catch (error) {
            alert('Có lỗi xảy ra khi tạo đường dẫn thanh toán: ' + error.message);
        }
    };

    return (
        <>
            <CustomerNavBar />
            <div className={styles.container}>
                <div className={styles.headerWrapper}>
                    <div className={styles.header}>
                        <h1>Quản lý Lịch hẹn </h1>
                    </div>

                    <div className={styles.searchContainer}>
                        <div className={styles.searchBox}>
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm..." 
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                        </div>
                        
                        <input
                            type="date"
                            className={styles.dateInput}
                            value={dateSearch}
                            onChange={(e) => setDateSearch(e.target.value)}
                        />
                        
                        <select
                            className={styles.statusSelect}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="Chờ bác sĩ xác nhận">Chờ bác sĩ xác nhận</option>
                            <option value="Đã xác nhận">Đã xác nhận</option>
                            <option value="Đang cung cấp dịch vụ">Đang cung cấp dịch vụ</option>
                            <option value="Thực hiện xong dịch vụ">Thực hiện xong dịch vụ</option>
                            <option value="Chờ thanh toán tiền dịch vụ">Chờ thanh toán tiền dịch vụ</option>
                            <option value="Thanh toán tiền dịch vụ thành công">Thanh toán tiền dịch vụ thành công</option>
                            <option value="Hoàn thành">Hoàn thành</option>
                            <option value="Đã đánh giá">Đã đánh giá</option>
                            <option value="Đã hủy lịch">Đã hủy lịch</option>
                        </select>
                        
                        <select
                            className={styles.sortSelect}
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                const [newSortBy, newSortOrder] = e.target.value.split('-');
                                setSortBy(newSortBy);
                                setSortOrder(newSortOrder);
                            }}
                        >
                            <option value="appointmentDate-asc">Sắp xếp theo ngày ↑</option>
                            <option value="appointmentDate-desc">Sắp xếp theo ngày ↓</option>
                            <option value="status-asc">Chưa đánh giá trước</option>
                            <option value="status-desc">Đã đánh giá trước</option>
                        </select>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.appointmentTable}>
                        <thead>
                            <tr>
                                <th>ID lịch hẹn</th>
                                <th>Thời gian</th>
                                <th>Ngày</th>
                                <th>Dịch vụ</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAppointments.map((appointment) => (
                                <tr key={appointment.appointmentId}>
                                    <td>{appointment.appointmentId}</td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.serviceType}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[appointment.appointmentStatus?.replace(/\s+/g, '')] || ''}`}>
                                            {appointment.appointmentStatus}
                                        </span>
                                    </td>
                                    <td>
                                        {(appointment.appointmentStatus === 'Chờ bác sĩ xác nhận' ||
                                          appointment.appointmentStatus === 'Đã xác nhận' ||
                                          appointment.appointmentStatus === 'Chờ thanh toán tiền dịch vụ' ||
                                          appointment.appointmentStatus === 'Thanh toán tiền dịch vụ thành công') && (
                                            <button 
                                                className={styles.cancelButton}
                                                style={{ marginRight: '10px' }}
                                                onClick={() => handleCancelAppointment(appointment.appointmentId)}
                                            >
                                                Hủy lịch
                                            </button>
                                        )}
                                        {(appointment.appointmentStatus === 'Đã xác nhận' || 
                                          appointment.appointmentStatus === 'Thực hiện xong dịch vụ') && (
                                            <button 
                                                className={styles.paymentButton}
                                                style={{ marginRight: '10px' }}
                                                onClick={() => handlePayment(appointment.appointmentId)}
                                            >
                                                Thanh toán
                                            </button>
                                        )}
                                        {appointment.appointmentStatus === 'Hoàn thành' && (
                                            <button 
                                                className={styles.ratingButton}
                                                style={{ marginRight: '10px' }}
                                                onClick={() => handleRating(appointment.appointmentId)}
                                            >
                                                Đánh giá
                                            </button>
                                        )}
                                        <button className={styles.detailButton}>
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Thêm phân trang ở đây */}
                <div className={styles.paginationWrapper}>
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
            <Footer />

            {showFeedbackForm && (
                console.log('Rendering FeedbackForm:', { showFeedbackForm, selectedAppointmentId }),
                <FeedbackForm
                    appointmentId={selectedAppointmentId}
                    onSubmit={handleFeedbackSubmit}
                    onClose={() => setShowFeedbackForm(false)}
                />
            )}
        </>
    );
};

export default ManageAppointment;