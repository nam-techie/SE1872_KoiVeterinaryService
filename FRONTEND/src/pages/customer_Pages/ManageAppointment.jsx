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
import {
    Button,
    Card,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Divider,
} from "@mui/material";

const appointmentDetails = {
    id: "5",
    bookingDate: "2024-11-01",
    bookingTime: "17:53",
    customerName: "cus001",
    phone: "0901544718",
    address: "D1HCH FPT",
    consultationDetails: {
        service: "Khảo sát hồ cá tại nhà",
        issue: "Kiểm tra định kỳ",
        consultationDate: "2024-11-05",
        consultationTime: "07:00",
        doctor: "Trần Minh Tâm",
        location: "D1HCH FPT",
    },
    status: "7", // Hoàn thành
    totalCost: 6050000,
    petInfo: {
        petName: "cc",
        species: "Cá Koi",
        breed: "cc",
        age: "4",
        color: "ff",
        weight: "44",
        healthStatus: "dfdf"
    },
    services: [
        { name: "Khảo sát hồ cá tại nhà", unitPrice: 1000000, totalPrice: 1000000 },
        { name: "Tiền phí di chuyển", unitPrice: 150000, totalPrice: 150000 },
        { name: "Kiểm tra và vệ sinh hồ", unitPrice: 700000, totalPrice: 700000 },
        { name: "Cung cấp thức ăn dinh dưỡng", unitPrice: 400000, totalPrice: 400000 },
        { name: "Xử lý nước hồ", unitPrice: 600000, totalPrice: 600000 },
        { name: "Chăm sóc cá stress", unitPrice: 1200000, totalPrice: 1200000 },
        { name: "Tư vấn thiết kế hồ", unitPrice: 2000000, totalPrice: 2000000 }
    ],
    paymentInfo: {
        donePayment: 6050000,
        notDonePayment: 0,
        totalPayment: 6050000,
        transactionMethod: "VNPAY"
    },
    feedback: {
        rate: 0,
        feedback: null
    }
};

const treatmentCosts = {
    items: [
        { name: "Dịch vụ 1", unitPrice: 3000000, totalPrice: 3000000 },
        { name: "Dịch vụ 2", unitPrice: 3000000, totalPrice: 6000000 },
        { name: "Dịch vụ 3", unitPrice: 3000000, totalPrice: 3000000 },
    ],
    subTotal: 12000000,
    tax: 860000,
    grandTotal: 12860000,
};

const medicalRecord = {
    petName: "Max",
    species: "Dog",
    breed: "Golden Retriever",
    diagnosis: "Đang chờ",
    note: "Annual checkup and vaccinations",
};

// Thêm hàm helper để format date và time
const formatDateTime = (dateTimeStr) => {
    if (!dateTimeStr) return '';
    
    try {
        const date = new Date(dateTimeStr);
        
        // Format date: DD/MM/YYYY
        const formattedDate = date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Format time: HH:MM
        const formattedTime = date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        return {
            date: formattedDate,
            time: formattedTime
        };
    } catch (error) {
        console.error('Error formatting date:', error);
        return {
            date: '',
            time: ''
        };
    }
};

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const steps = [
        "Chờ xác nhận",
        "Đã xác nhận",
        "Chờ thanh toán",
        "Thanh toán thành công",
        "Đang thực hiện",
        "Thực hiện xong",
        "Chờ thanh toán phí phát sinh",
        "Hoàn thành"
    ];

    const handleOpenModal = (appointmentId) => {
        console.log('Modal opening with ID:', appointmentId);
        setSelectedAppointmentId(appointmentId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAppointmentId(null);
    };

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
                        <h1>Quản Lý Lịch Hẹn </h1>
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
                            <option value="Thanh toán tiền dịch vụ thành công">Thanh toán tiền dịch vụ thành cng</option>
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
                                        <span className={`${styles.status} ${styles[`status${appointment.status}`]}`}>
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
                                        <button 
                                            className={styles.detailButton}
                                            onClick={() => {
                                                console.log('Button clicked for ID:', appointment.appointmentId);
                                                handleOpenModal(appointment.appointmentId);
                                            }}
                                        >
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

            <Dialog 
                open={isModalOpen} 
                onClose={handleCloseModal}
                maxWidth="xl"
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        overflowX: 'hidden',
                        maxWidth: '90vw',
                        margin: '16px'
                    }
                }}
            >
                <AppointmentModal
                    appointmentID={selectedAppointmentId}
                    steps={steps}
                    open={isModalOpen}
                    onClose={handleCloseModal}
                />
            </Dialog>
            <Footer />

            {showFeedbackForm && (
                <FeedbackForm
                    appointmentId={selectedAppointmentId}
                    onSubmit={handleFeedbackSubmit}
                    onClose={() => setShowFeedbackForm(false)}
                />
            )}
        </>
    );
};

const getStepStatus = (currentStatus, stepIndex) => {
    // Mapping của status với index trong timeline
    const statusMapping = {
        "1": 1,  // Chờ xác nhận
        "2": 2,  // Đã xác nhận
        "3": 3,  // Chờ thanh toán
        "4": 4,  // Thanh toán thành công
        "5": 5,  // Đang thực hiện
        "6": 6,  // Thực hiện xong
        "7": 7,  // Chờ thanh toán phí phát sinh
        "8": 8,  // Hoàn thành
    };

    const currentStepNumber = statusMapping[currentStatus] || 0;
    const stepNumber = stepIndex + 1;

    if (currentStepNumber > stepNumber) return 'completed';
    if (currentStepNumber === stepNumber) return 'active';
    return '';
};

const AppointmentModal = ({ appointmentID, steps, open, onClose }) => {
    const [appointmentData, setAppointmentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { getAppointmentDetail } = useManageCus();

    useEffect(() => {
        const fetchAppointmentDetail = async () => {
            if (appointmentID) {
                try {
                    setLoading(true);
                    const data = await getAppointmentDetail(appointmentID);
                    setAppointmentData(data);
                } catch (error) {
                    console.error('Error fetching appointment detail:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchAppointmentDetail();
    }, [appointmentID]);

    if (loading) return <LoadingCat />;
    if (!appointmentData) return null;

    return (
        <>
            <DialogTitle sx={{ 
                borderBottom: '1px solid #e0e0e0',
                bgcolor: '#f5f5f5',
                fontWeight: 'bold'
            }}>
                Mã Lịch Hẹn: {appointmentData.appointmentId}
            </DialogTitle>
            <DialogContent sx={{ p: 3 }}>
                {/* Stepper */}
                <Box sx={{ mb: 4 }}>
                    <div className={styles.statusTimeline}>
                        {steps.map((label, index) => {
                            const stepStatus = getStepStatus(Number(appointmentData.status), index);
                            return (
                                <div 
                                    key={label} 
                                    className={`${styles.statusStep} ${styles[stepStatus]}`}
                                >
                                    <div className={styles.statusDot}></div>
                                    <span className={styles.statusLabel}>{label}</span>
                                </div>
                            );
                        })}
                    </div>
                </Box>

                {/* Thông tin cơ bản */}
                <Card sx={{ mb: 3, p: 2, boxShadow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Ngày đặt:</strong> {formatDateTime(appointmentData.infoAppointmentResponse?.appointmentTime).date}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Họ tên KH:</strong> {appointmentData.infoCusResponse?.fullName}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>SĐT:</strong> {appointmentData.infoCusResponse?.phone}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>

                {/* Chi tiết lịch hẹn */}
                <Card sx={{ mb: 3, p: 2, boxShadow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                        Chi tiết lịch hẹn
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Dịch vụ:</strong> {appointmentData.infoAppointmentResponse?.serviceType}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Địa chỉ:</strong> {appointmentData.infoAppointmentResponse?.address}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Ngày khám:</strong> {appointmentData.infoAppointmentResponse?.appointmentDate}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Giờ khám:</strong> {appointmentData.infoAppointmentResponse?.time}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Bác sĩ:</strong> {appointmentData.infoAppointmentResponse?.doctorName}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>

                {/* Thông tin dịch vụ và thanh toán */}
                <Card sx={{ mb: 3, p: 2, boxShadow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                        Chi phí dịch vụ
                    </Typography>
                    {appointmentData.infoServiceTypeResponse?.map((service, index) => (
                        <Box 
                            key={index}
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                mb: 1,
                                p: 1,
                                '&:nth-of-type(odd)': { bgcolor: '#f5f5f5' }
                            }}
                        >
                            <Typography>{service.serviceTypeName}</Typography>
                            <Typography>{service.serviceTypePrice.toLocaleString('vi-VN')}đ</Typography>
                        </Box>
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        p: 1,
                        bgcolor: '#e3f2fd'
                    }}>
                        <Typography variant="h6">Tổng cộng:</Typography>
                        <Typography variant="h6" color="primary">
                            {appointmentData.totalPayment?.toLocaleString('vi-VN')}đ
                        </Typography>
                    </Box>
                </Card>

                {/* Thông tin thú cưng */}
                <Card sx={{ p: 2, boxShadow: 1 }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1976d2' }}>
                        Thông tin thú cưng
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Tên thú cưng:</strong> {appointmentData.infoKoiResponse?.name}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Giống:</strong> {appointmentData.infoKoiResponse?.breed}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Tuổi:</strong> {appointmentData.infoKoiResponse?.age}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Màu sắc:</strong> {appointmentData.infoKoiResponse?.color}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Cân nặng:</strong> {appointmentData.infoKoiResponse?.weight}
                            </Typography>
                            <Typography sx={{ mb: 1 }}>
                                <strong>Tình trạng sức khỏe:</strong> {appointmentData.infoKoiResponse?.healthStatus}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid #e0e0e0' }}>
                <Button 
                    onClick={onClose} 
                    variant="contained"
                    sx={{ minWidth: 100 }}
                >
                    Đóng
                </Button>
            </DialogActions>
        </>
    );
};

export default ManageAppointment;