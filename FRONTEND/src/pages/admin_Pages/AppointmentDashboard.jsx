import React, { useState, useEffect } from 'react';
import './styles/AppointmentDashboard.css';
import useAppointment from './hooks/useAppointment';
import { FaSearch, FaSort } from 'react-icons/fa';
import LoadingCat from '../../components/LoadingCat';

const AppointmentDashboard = () => {
    const ITEMS_PER_PAGE = 10;

    const { appointments, loading, error, refetch, cancelAppointment, confirmPaymentDeposit, getAppointmentDetails } = useAppointment();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    const [dateSearch, setDateSearch] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [cancelError, setCancelError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [showViewModal, setShowViewModal] = useState(false);
    const [statusFilter, setStatusFilter] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentError, setPaymentError] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [detailsError, setDetailsError] = useState(null);

    useEffect(() => {
        // Fetch lần đầu khi component mount
        refetch();

        // Set interval để fetch mỗi 30 giây
        const interval = setInterval(() => {
            refetch();
        }, 20000);

        // Cleanup function
        return () => clearInterval(interval);
    }, []); // Empty dependency array

    const statusOptions = [
        { value: '', label: 'Tất cả trạng thái' },
        { value: 'Chờ bác sĩ xác nhận', label: 'Chờ bác sĩ xác nhận' },
        { value: 'Đã xác nhận', label: 'Đã xác nhận' },
        { value: 'Chờ thanh toán tiền dịch vụ', label: 'Chờ thanh toán tiền dịch vụ' },
        { value: 'Thanh toán tiền dịch vụ thành công', label: 'Thanh toán tiền dịch vụ thành công' },
        { value: 'Thực hiện xong dịch vụ', label: 'Thực hiện xong dịch vụ' },
        { value: 'Hoàn thành', label: 'Hoàn thành' },
        { value: 'Đã hủy lịch', label: 'Đã hủy lịch' }
    ];

    // Thêm dữ liệu demo
    const demoAppointmentDetails = {
        id: "LH001",
        fullNameCustomer: "Kiều Trọng Khánh",
        phoneNumber: "0123456789",
        addressDetails: "D1, FPT",
        nameService: "Khám tại nhà",
        appointmentBookingDate: "30/10/2024",
        appointmentBookingTime: "16:00",
        isRequestDoctor: true,
        description: "Nổi bị đau",
        petInfo: {
            name: "Mèo con",
            breed: "Mèo Anh lông ngắn",
            age: 2,
            color: "Trắng xám",
            weight: 3.5,
            healthStatus: "Tiền sử khe me mạnh, đã tiêm vaccine đầy đủ"
        },
        createdDate: "27/10/2024 - 14:00",
        doctorInfo: {
            name: "BS. Nguyễn Văn A",
            specialization: "Chuyên khoa thú y nội khoa"
        },
        // Hoặc có thể là null để test trường hợp chưa có bác sĩ
        // doctorInfo: null,
    };

    if (loading) return <LoadingCat />;
    if (error) return <div>{error}</div>;

    // Hàm tìm kiếm
    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    // Hàm sắp xếp
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    // Lọc và sắp xếp dữ liệu
    const filteredAndSortedAppointments = [...appointments]
        .filter(appointment => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                appointment.id?.toString().toLowerCase().includes(searchLower) ||
                appointment.fullNameCustomer?.toLowerCase().includes(searchLower) ||
                appointment.nameService?.toLowerCase().includes(searchLower) ||
                appointment.nameZone?.toLowerCase().includes(searchLower);

            // Thêm điều kiện lọc theo trạng thái
            const matchesStatus = statusFilter ? appointment.appointmentStatus === statusFilter : true;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'id') {
                return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
            } else if (sortBy === 'fullNameCustomer') {
                return sortOrder === 'asc' 
                    ? a.fullNameCustomer.localeCompare(b.fullNameCustomer)
                    : b.fullNameCustomer.localeCompare(a.fullNameCustomer);
            } else if (sortBy === 'appointmentBookingDate') {
                const dateA = a.appointmentBookingDate || '';
                const dateB = b.appointmentBookingDate || '';
                return sortOrder === 'asc' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
            } else if (sortBy === 'appointmentBookingTime') {
                const timeA = a.appointmentBookingTime || '';
                const timeB = b.appointmentBookingTime || '';
                return sortOrder === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
            }
            return 0;
        });

    // Tính toán số trang
    const totalPages = Math.ceil(filteredAndSortedAppointments.length / ITEMS_PER_PAGE);
    const currentTableData = filteredAndSortedAppointments.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const sortOptions = [
        { value: 'id', label: 'Sắp xếp theo ID' },
        { value: 'fullNameCustomer', label: 'Sắp xếp theo tên' },
        { value: 'appointmentBookingTime', label: 'Sắp xếp theo thời gian' },
        { value: 'appointmentBookingDate', label: 'Sắp xếp theo Ngày thực hiện' },
    ];

    // Thêm hàm xử lý hiển thị modal
    const handleShowDeleteModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShowDeleteModal(true);
    };

    // Cập nhật hàm handleConfirmDelete
    const handleConfirmDelete = async () => {
        try {
            await cancelAppointment(selectedAppointment.id);
            setShowDeleteModal(false);
            setSelectedAppointment(null);
            setSuccessMessage('Đã hủy lịch hẹn thành công!');
            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            setCancelError(error.message);
        }
    };

    // Thêm hiển thị lỗi vào modal

    // Hàm kiểm tra trạng thái cho phép hủy
    const canCancel = (status) => {
        const allowedStatuses = [
            'Chờ bác sĩ xác nhận',
            'Đã xác nhận'
        ];
        return allowedStatuses.includes(status);
    };

    // Hàm kiểm tra trạng thái cho phép sửa
    const canEdit = (status) => {
        return status === 'Hoàn thành';
    };

    // Thêm hàm xử lý hiển thị modal thanh toán
    const handleShowPaymentModal = (appointment) => {
        setSelectedAppointment(appointment);
        setShowPaymentModal(true);
    };

    // Thêm hàm xử lý xác nhận thanh toán
    const handleConfirmPayment = async (appointment) => {
        try {
            await confirmPaymentDeposit(appointment.id);
            setSuccessMessage('Xác nhận thanh toán thành công!');
            setShowPaymentModal(false);
            // Tự động ẩn thông báo sau 3 giây
            setTimeout(() => {
                setSuccessMessage(null);
            }, 3000);
        } catch (error) {
            setPaymentError(error.message);
        }
    };

    // Thêm hàm xử lý lấy chi tiết
    const handleViewDetails = async (appointment) => {
        try {
            setLoadingDetails(true);
            setDetailsError(null);
            const details = await getAppointmentDetails(appointment.id);
            setAppointmentDetails(details);
            setShowViewModal(true);
        } catch (error) {
            setDetailsError('Không thể lấy thông tin chi tiết lịch hẹn');
            console.error(error);
        } finally {
            setLoadingDetails(false);
        }
    };

    return (
        <div className="appointment-dashboard">
            {/* Thêm thông báo thành công */}
            {successMessage && (
                <div className="success-message">
                    {successMessage}
                </div>
            )}
            
            <div className="content-header">
                <h2>Quản lý lịch hẹn</h2>
                <div className="search-sort-container">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    { }
                    <div className="date-search-box">
                        <input
                            type="date"
                            className="date-input"
                            value={dateSearch}
                            onChange={(e) => setDateSearch(e.target.value)}
                        />
                    </div>
                    <div className="status-filter">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="status-select-appointment"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="sort-box">
                        <select
                            onChange={(e) => handleSort(e.target.value)}
                            value={sortBy}
                            className="sort-select-appointment"
                        >
                            <option value="id">Sắp xếp theo ID</option>
                            <option value="fullNameCustomer">Sắp xếp theo Tên</option>
                            <option value="appointmentBookingDate">Sắp xếp theo Ngày thực hiện</option>
                            <option value="appointmentBookingTime">Sắp xếp theo Thời gian</option>

                        </select>
                    </div>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="sort-order-btn"
                    >
                        {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
                        <FaSort className='sort-icon'/>
                    </button>
                </div>
            </div>

            <div className="appointment-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mã lịch hẹn</th>
                            <th>Tên khách hàng</th>
                            <th>Trạng thái</th>
                            <th>Tên dịch vụ</th>
                            <th>Địa chỉ</th>
                            <th className='action-column'>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTableData.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>#{appointment.id}</td>
                                <td>{appointment.fullNameCustomer}</td>
                                <td>
                                    <span 
                                        className="status" 
                                        data-status={appointment.appointmentStatus}
                                    >
                                        {appointment.appointmentStatus}
                                    </span>
                                </td>
                                <td>{appointment.nameService}</td>
                                <td>{appointment.nameZone}</td>
                                <td>
                                    <div className="action-buttons">
                                        {/* Kiểm tra nếu trạng thái là chờ thanh toán hoặc thực hiện xong dịch vụ */}
                                        {(appointment.appointmentStatus === 'Chờ thanh toán tiền dịch vụ' || 
                                          appointment.appointmentStatus === 'Chờ thanh toán tổng tiền') ? (
                                            // Chỉ hiển thị nút xác nhận thanh toán
                                            <button 
                                                className="action-btn payment"
                                                onClick={() => handleShowPaymentModal(appointment)}
                                            >
                                                Xác nhận thanh toán
                                            </button>
                                        ) : (
                                            // Hiển thị các nút mặc định cho các trạng thái khác
                                            <>
                                                <button 
                                                    className="action-btn view"
                                                    onClick={() => handleViewDetails(appointment)}
                                                >
                                                    Xem
                                                </button>
                                                <button 
                                                    className={`action-btn edit ${!canEdit(appointment.appointmentStatus) ? 'disabled' : ''}`}
                                                    disabled={!canEdit(appointment.appointmentStatus)}
                                                >
                                                    Sửa
                                                </button>
                                                <button 
                                                    className={`action-btn delete ${!canCancel(appointment.appointmentStatus) ? 'disabled' : ''}`}
                                                    onClick={() => handleShowDeleteModal(appointment)}
                                                    disabled={!canCancel(appointment.appointmentStatus)}
                                                >
                                                    Hủy
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Thay đổi phần pagination */}
                <div className="pagination">
                    <button 
                        className="page-btn"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>

                    <span className="page-info">
                        Trang {currentPage} / {totalPages}
                    </span>

                    <button
                        className="page-btn"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                </div>
            </div>
            
            {/* Thêm modal vào cuối component, trước thẻ đóng div cuối cùng */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Xác nhận hủy lịch hẹn</h3>
                        {cancelError && <p className="error-message">{cancelError}</p>}
                        <p>Bạn có chắc chắn muốn hủy lịch hẹn ca khách hàng <strong>{selectedAppointment?.fullNameCustomer}</strong> không?</p>
                        <p className="warning-text">Lưu ý: Khi đã hủy thì không thể khôi phục lại trạng thái của lịch hẹn!</p>
                        <div className="modal-buttons">
                            <button className="modal-btn cancel" onClick={() => setShowDeleteModal(false)}>
                                Quay lại
                            </button>
                            <button className="modal-btn delete" onClick={handleConfirmDelete}>
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showViewModal && appointmentDetails && (
                <div className="modal-overlay">
                    <div className="view-modal-content">
                        <div className="modal-header">
                            <h2>Chi tiết lịch hẹn #{appointmentDetails.infoAppointmentResponse?.id || 'Chưa cập nhật'}</h2>
                            <button className="close-btn" onClick={() => setShowViewModal(false)}>&times;</button>
                        </div>
                        
                        <div className="appointment-details">
                            <div className="detail-section">
                                <h3>Thông tin khách hàng</h3>
                                <div className="customer-info-row">
                                    <div className="info-item">
                                        <label>Họ tên:</label>
                                        <span>{appointmentDetails.infoCusResponse?.fullName || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Số điện thoại:</label>
                                        <span>{appointmentDetails.infoCusResponse?.phone || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="info-item">
                                        <label>Địa chỉ:</label>
                                        <span>{appointmentDetails.infoCusResponse?.address || 'Chưa cập nhật'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Thông tin thú cưng</h3>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <label>Tên thú cưng:</label>
                                        <span>{appointmentDetails.infoKoiResponse?.name || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Giống:</label>
                                        <span>{appointmentDetails.infoKoiResponse?.breed || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Tuổi:</label>
                                        <span>{appointmentDetails.infoKoiResponse?.age ? `${appointmentDetails.infoKoiResponse.age} tuổi` : 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Màu sắc:</label>
                                        <span>{appointmentDetails.infoKoiResponse?.color || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Cân nặng:</label>
                                        <span>{appointmentDetails.infoKoiResponse?.weight ? `${appointmentDetails.infoKoiResponse.weight} kg` : 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Tình trạng sức khỏe:</label>
                                        <span>{appointmentDetails.infoKoiResponse?.healthStatus || 'Chưa cập nhật'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Thông tin lịch hẹn</h3>
                                <div className="detail-grid">
                                    <div className="detail-item">
                                        <label>Ngày tạo:</label>
                                        <span>{appointmentDetails.infoAppointmentResponse?.appointmentTime || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Dịch vụ:</label>
                                        <span>{appointmentDetails.infoAppointmentResponse?.serviceType || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Ngày hẹn:</label>
                                        <span>{appointmentDetails.infoAppointmentResponse?.appointmentDate || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Giờ hẹn:</label>
                                        <span>{appointmentDetails.infoAppointmentResponse?.time || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Địa chỉ:</label>
                                        <span>{appointmentDetails.infoAppointmentResponse?.address || 'Chưa cập nhật'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Trạng thái:</label>
                                        <span className={`status ${(appointmentDetails.infoAppointmentResponse?.status || '').toLowerCase().replace(' ', '-')}`}>
                                            {appointmentDetails.infoAppointmentResponse?.status || 'Chưa cập nhật'}
                                        </span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Bác sĩ phụ trách:</label>
                                        <span>{appointmentDetails.infoAppointmentResponse?.doctorName || 'Chưa phân công bác sĩ'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Chi tiết dịch vụ và thanh toán</h3>
                                <table className="payment-table">
                                    <thead>
                                        <tr>
                                            <th>Mã dịch vụ</th>
                                            <th>Tên dịch vụ</th>
                                            <th>Đơn giá</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointmentDetails.infoServiceTypeResponse?.map((service, index) => (
                                            <tr key={index}>
                                                <td>{service.serviceTypeId || 'Chưa cập nhật'}</td>
                                                <td>{service.serviceTypeName || 'Chưa cập nhật'}</td>
                                                <td>{service.serviceTypePrice?.toLocaleString('vi-VN')} đ</td>
                                                <td>
                                                    <span className={`status-badge ${service.statusPayment ? 'paid' : 'unpaid'}`}>
                                                        {service.statusPayment ? 'Đã thanh toán' : 'Chưa thanh toán'}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <div className="total-section">
                                    <span className="total-label">Tổng tiền:</span>
                                    <span className="total-amount">
                                        {appointmentDetails.infoServiceTypeResponse?.reduce((total, service) => 
                                            total + (service.serviceTypePrice || 0), 0).toLocaleString('vi-VN')} đ
                                    </span>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Đánh giá từ khách hàng</h3>
                                <div className="rating-container">
                                    <div className="star-rating">
                                        <span className="rating-label">Đánh giá: </span>
                                        <div className="stars">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span 
                                                    key={star} 
                                                    className={`star ${star <= (appointmentDetails.infoFeedbackResponse?.rate || 0) ? 'filled' : ''}`}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                        <span className="rating-value">
                                            ({appointmentDetails.infoFeedbackResponse?.rate || 0}/5)
                                        </span>
                                    </div>
                                    <div className="feedback-content">
                                        <span className="feedback-label">Nhận xét:</span>
                                        <p className="feedback-text">
                                            {appointmentDetails.infoFeedbackResponse?.feedback || 'Khách hàng chưa để lại nhận xét.'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Trạng thái lịch hẹn</h3>
                                <div className="appointment-timeline">
                                    {[
                                        { step: 1, status: 'Chờ bác sĩ xác nhận' },
                                        { step: 2, status: 'Đã xác nhận' },
                                        { step: 3, status: 'Chờ thanh toán tiền dịch vụ' },
                                        { step: 4, status: 'Thanh toán tiền dịch vụ thành công' },
                                        { step: 5, status: 'Bác sĩ đang cung cấp dịch vụ' },
                                        { step: 6, status: 'Thực hiện xong dịch vụ' },
                                        { step: 7, status: 'Chờ thanh toán tổng tiền' },
                                        { step: 8, status: 'Đã hoàn thành' },
                                        { step: 9, status: 'Đã đánh giá' }
                                    ].map((step) => {
                                        const currentStatus = appointmentDetails.status;
                                        const currentStep = getStepNumber(currentStatus);
                                        const isActive = step.status === currentStatus;
                                        const isPast = step.step <= currentStep;

                                        return (
                                            <div 
                                                key={step.step} 
                                                className={`timeline-step ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
                                            >
                                                <div className="step-number">{step.step}</div>
                                                <div className="step-content">{step.status}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showPaymentModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3 className="payment-title">Xác nhận thanh toán</h3>
                        {cancelError && <p className="error-message">{cancelError}</p>}
                        <p>Bạn có chắc chắn đã nhận được tiền thanh toán từ khách hàng <strong>{selectedAppointment?.fullNameCustomer}</strong> không?</p>
                        <p className="warning-text">Lưu ý: Khi đã xác nhận thanh toán thì sẽ không thể sửa đổi trạng thái của lịch hẹn!</p>
                        <div className="modal-buttons">
                            <button className="modal-btn cancel" onClick={() => setShowPaymentModal(false)}>
                                Quay lại
                            </button>
                            <button className="modal-btn confirm" onClick={() => {
                                handleConfirmPayment(selectedAppointment);
                                setShowPaymentModal(false);
                            }}>
                                Xác nhận thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentDashboard;

// Thêm hàm helper để xác định số thứ tự của trạng thái
const getStepNumber = (status) => {
    const statusMap = {
        'Chờ bác sĩ xác nhận': 1,
        'Đã xác nhận': 2,
        'Chờ thanh toán tiền dịch vụ': 3,
        'Thanh toán tiền dịch vụ thành công': 4,
        'Bác sĩ đang cung cấp dịch vụ': 5,
        'Thực hiện xong dịch vụ': 6,
        'Chờ thanh toán tổng tiền': 7,
        'Đã hoàn thành': 8,
        'Đã đánh giá': 9
    };
    return statusMap[status] || 0;
};
