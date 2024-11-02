import React, { useState, useEffect } from "react";
import "./styles/AppointmentDashboard.css";
import useAppointment from "./hooks/useAppointment";
import { FaSearch, FaSort } from "react-icons/fa";
import LoadingCat from "../../components/LoadingCat";

const AppointmentDashboard = () => {
  const ITEMS_PER_PAGE = 10;

  const {
    appointments,
    loading,
    error,
    refetch,
    cancelAppointment,
    confirmPaymentDeposit,
    getAppointmentDetails,
    getFullInfoAppointment,
  } = useAppointment();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [dateSearch, setDateSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [cancelError, setCancelError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewModal, setShowViewModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
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
    { value: "", label: "Tất cả trạng thái" },
    { value: "Chờ bác sĩ xác nhận", label: "Chờ bác sĩ xác nhận" },
    { value: "Đã xác nhận", label: "Đã xác nhận" },
    { value: "Đang cung cấp dịch vụ", label: "Đang cung cấp dịch vụ" },
    { value: "Thực hiện xong dịch vụ", label: "Thực hiện xong dịch vụ" },
    {
      value: "Chờ thanh toán tiền dịch vụ",
      label: "Chờ thanh toán tiền dịch vụ",
    },
    {
      value: "Thanh toán tiền dịch vụ thành công",
      label: "Thanh toán tiền dịch vụ thành công",
    },
    { value: "Hoàn thành", label: "Hoàn thành" },
    { value: "Đã đánh giá", label: "Đã đánh giá" },
    { value: "Đã hủy lịch", label: "Đã hủy lịch" },
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
      healthStatus: "Tiền sử khỏe mạnh, đã tiêm vaccine đầy đủ",
    },
    createdDate: "27/10/2024 - 14:00",
    doctorInfo: {
      name: "BS. Nguyễn Văn A",
      specialization: "Chuyên khoa thú y nội khoa",
    },
    services: [
      {
        id: "SV001",
        serviceId: "SV001",
        serviceName: "Khám tổng quát",
        price: 300000,
        isPaid: true,
      },
      {
        id: "SV002",
        serviceId: "SV002",
        serviceName: "Tiêm vaccine",
        price: 250000,
        isPaid: false,
      },
      {
        id: "SV003",
        serviceId: "SV003",
        serviceName: "Tẩy giun",
        price: 150000,
        isPaid: true,
      },
      {
        id: "SV004",
        serviceId: "SV004",
        serviceName: "Cắt móng + Vệ sinh",
        price: 180000,
        isPaid: true,
      },
      {
        id: "SV005",
        serviceId: "SV005",
        serviceName: "Tắm + Sấy khô",
        price: 200000,
        isPaid: false,
      },
    ],
    rating: 4, // Đánh giá 4/5 sao
    comment:
      "Dịch vụ rất tốt, bác sĩ tận tình. Thú cưng của tôi được chăm sóc rất chu đáo.",
    appointmentStatus: "Đang cung cấp dịch vụ",
  };

  // Thêm data demo cho services
  const demoServices = [
    {
      serviceId: "SV001",
      serviceName: "Khám tổng quát",
      price: 300000,
      isPaid: true,
    },
    {
      serviceId: "SV002",
      serviceName: "Tiêm vaccine",
      price: 250000,
      isPaid: false,
    },
    {
      serviceId: "SV003",
      serviceName: "Tẩy giun",
      price: 150000,
      isPaid: true,
    },
    {
      serviceId: "SV004",
      serviceName: "Cắt móng + Vệ sinh",
      price: 180000,
      isPaid: true,
    },
    {
      serviceId: "SV005",
      serviceName: "Tắm + Sấy khô",
      price: 200000,
      isPaid: false,
    },
  ];

  // Tính toán tổng tiền và số tiền đã/chưa thanh toán
  const totalAmount = demoServices.reduce(
    (sum, service) => sum + service.price,
    0
  );
  const paidAmount = demoServices
    .filter((service) => service.isPaid)
    .reduce((sum, service) => sum + service.price, 0);
  const unpaidAmount = totalAmount - paidAmount;

  if (loading) return <LoadingCat />;
  if (error) return <div>{error}</div>;

  // Hàm tìm kiếm
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset về trang 1 khi tìm kiếm
  };

  // Hàm xử lý sort
  const handleSort = (field) => {
    if (sortBy === field) {
      // Nếu đang sort theo field này rồi thì đổi thứ tự
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Nếu sort theo field mới thì mặc định sort tăng dần
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1); // Reset về trang 1 khi sắp xếp
  };

  // Lọc và sắp xếp dữ liệu
  const filteredAndSortedAppointments = [...appointments]
    .filter((appointment) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        appointment.id?.toString().toLowerCase().includes(searchLower) ||
        appointment.fullNameCustomer?.toLowerCase().includes(searchLower) ||
        appointment.nameService?.toLowerCase().includes(searchLower) ||
        appointment.nameZone?.toLowerCase().includes(searchLower);

      // Thêm điều kiện lọc theo trạng thái
      const matchesStatus = statusFilter
        ? appointment.appointmentStatus === statusFilter
        : true;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (!sortBy) return 0;

      switch (sortBy) {
        case "id":
          return sortOrder === "asc"
            ? (a.id || 0) - (b.id || 0)
            : (b.id || 0) - (a.id || 0);

        case "fullNameCustomer":
          const nameA = (a.fullNameCustomer || "").toLowerCase();
          const nameB = (b.fullNameCustomer || "").toLowerCase();
          return sortOrder === "asc"
            ? nameA.localeCompare(nameB)
            : nameB.localeCompare(nameA);

        // case 'appointmentBookingDate':
        //     const dateA = parseDate(a.appointmentBookingDate);
        //     const dateB = parseDate(b.appointmentBookingDate);
        //     return sortOrder === 'asc'
        //         ? dateA - dateB
        //         : dateB - dateA;

        // case 'appointmentBookingTime':
        //     const timeToMinutes = (timeStr) => {
        //         if (!timeStr) return 0;
        //         const [hours, minutes] = timeStr.split(':').map(Number);
        //         return hours * 60 + minutes;
        //     };

        //     const timeA = timeToMinutes(a.appointmentBookingTime);
        //     const timeB = timeToMinutes(b.appointmentBookingTime);
        //     return sortOrder === 'asc'
        //         ? timeA - timeB
        //         : timeB - timeA;

        case "nameService":
          const serviceA = (a.nameService || "").toLowerCase();
          const serviceB = (b.nameService || "").toLowerCase();
          return sortOrder === "asc"
            ? serviceA.localeCompare(serviceB)
            : serviceB.localeCompare(serviceA);

        case "nameZone":
          const zoneA = (a.nameZone || "").toLowerCase();
          const zoneB = (b.nameZone || "").toLowerCase();
          return sortOrder === "asc"
            ? zoneA.localeCompare(zoneB)
            : zoneB.localeCompare(zoneA);

        default:
          return 0;
      }
    });

  // Tính toán số trang
  const totalPages = Math.ceil(
    filteredAndSortedAppointments.length / ITEMS_PER_PAGE
  );
  const currentTableData = filteredAndSortedAppointments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const sortOptions = [
    { value: "id", label: "Sắp xếp theo ID" },
    { value: "fullNameCustomer", label: "Sắp xếp theo tên" },
    { value: "nameService", label: "Sắp xếp theo dịch vụ" },
    { value: "nameZone", label: "Sắp xếp theo địa chỉ" },
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
      setSuccessMessage("Đã hủy lịch hẹn thành công!");
      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setCancelError(error.message);
    }
  };

  // Thêm hiển thị lỗi vào modal

  // Hàm kiểm tra trạng thái cho phép hy
  const canCancel = (status) => {
    const allowedStatuses = ["Chờ bác sĩ xác nhận", "Đã xác nhận"];
    return allowedStatuses.includes(status);
  };

  // Hàm kiểm tra trạng thái cho phép sửa
  const canEdit = (status) => {
    return status === "Hoàn thành";
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
      setSuccessMessage("Xác nhận thanh toán thành công!");
      setShowPaymentModal(false);
      // Tự động ẩn thông báo sau 3 giây
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (error) {
      setPaymentError(error.message);
    }
  };

  // Hàm xử lý khi click vào nút xem chi tiết
  const handleViewDetails = async (appointmentId) => {
    try {
      setLoadingDetails(true);
      setDetailsError(null);
      const details = await getFullInfoAppointment(appointmentId);
      setAppointmentDetails(details);
      setShowViewModal(true);
    } catch (error) {
      setDetailsError("Không thể lấy thông tin chi tiết lịch hẹn");
      console.error(error);
    } finally {
      setLoadingDetails(false);
    }
  };

  // Đầu tiên, tạo một hàm format số để tránh lỗi
  const formatCurrency = (amount) => {
    return amount ? amount.toLocaleString() : "0";
  };

  return (
    <div className="appointment-dashboard">
      {/* Thêm thông báo thành công */}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <div className="content-header">
        <h2>Quản lý lịch hẹn</h2>
        <div className="appointment-search-sort-container">
          <div className="top-row">
            <div className="appointment-search-box">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="appointment-search-input"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <div className="appointment-status-filter">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appointment-status-select"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bottom-row">
            <div className="appointment-date-box">
              <input
                type="date"
                className="appointment-date-input"
                value={dateSearch}
                onChange={(e) => setDateSearch(e.target.value)}
              />
            </div>

            <div className="appointment-sort-box">
              <select
                onChange={(e) => handleSort(e.target.value)}
                value={sortBy}
                className="appointment-sort-select"
              >
                <option value="">Sắp xếp theo</option>
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="appointment-sort-order-btn"
              >
                {sortOrder === "asc" ? "Tăng dần" : "Giảm dần"}
              </button>
            </div>
          </div>
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
              <th className="action-column">Thao tác</th>
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
                    <button
                      className="action-btn view"
                      onClick={() => handleViewDetails(appointment.id)}
                    >
                      <i className="fas fa-eye"></i> Chi tiết
                    </button>
                    {canEdit(appointment.appointmentStatus) && (
                      <button className="action-btn edit">
                        <i className="fas fa-edit"></i> Cập nhật
                      </button>
                    )}
                    {canCancel(appointment.appointmentStatus) && (
                      <button
                        className="action-btn delete"
                        onClick={() => handleShowDeleteModal(appointment)}
                      >
                        <i className="fas fa-times-circle"></i> Hủy
                      </button>
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
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Trước
          </button>

          <span className="page-info">
            Trang {currentPage} / {totalPages}
          </span>

          <button
            className="page-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
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
            <p>
              Bạn có chắc chắn muốn hủy lịch hẹn ca khách hàng{" "}
              <strong>{selectedAppointment?.fullNameCustomer}</strong> không?
            </p>
            <p className="warning-text">
              Lưu ý: Khi đã hủy thì không thể khôi phục lại trạng thái của lịch
              hẹn!
            </p>
            <div className="modal-buttons">
              <button
                className="modal-btn cancel"
                onClick={() => setShowDeleteModal(false)}
              >
                Quay lại
              </button>
              <button
                className="modal-btn delete"
                onClick={handleConfirmDelete}
              >
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
              <h2>Chi tiết lịch hẹn #{appointmentDetails.appointmentId}</h2>
              <button
                className="close-btn"
                onClick={() => setShowViewModal(false)}
              >
                &times;
              </button>
            </div>

            {/* Thêm Timeline Component ở đây */}
            <TimelineComponent currentStatus={appointmentDetails?.status} />
            <div className="current-status">
              Trạng thái hiện tại:
              <span
                className={`status-text ${
                  appointmentDetails?.status === "Đã hủy lịch"
                    ? "cancelled"
                    : ""
                }`}
                data-status={appointmentDetails?.status}
              >
                {appointmentDetails?.status || "Chưa cập nhật"}
              </span>
            </div>

            {/* Thông tin khách hàng */}
            <div className="info-section">
              <h3>Thông tin khách hàng</h3>
              <div className="info-grid customer-info">
                <div className="info-item">
                  <label>Họ và tên:</label>
                  <span>
                    {appointmentDetails?.infoCusResponse?.fullName ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Địa chỉ:</label>
                  <span>
                    {appointmentDetails?.infoCusResponse?.address ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Số điện thoại:</label>
                  <span>
                    {appointmentDetails?.infoCusResponse?.phone ||
                      "Chưa cập nhật"}
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin thú cưng */}
            <div className="info-section">
              <h3>Thông tin thú cưng</h3>
              <div className="info-grid pet-info">
                <div className="info-item">
                  <label>Tên thú cưng:</label>
                  <span>
                    {appointmentDetails?.infoKoiResponse?.name ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Giống:</label>
                  <span>
                    {appointmentDetails?.infoKoiResponse?.breed ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Tuổi:</label>
                  <span>
                    {appointmentDetails?.infoKoiResponse?.age ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Màu sắc:</label>
                  <span>
                    {appointmentDetails?.infoKoiResponse?.color ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Cân nặng:</label>
                  <span>
                    {appointmentDetails?.infoKoiResponse?.weight ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Tình trạng sức khỏe:</label>
                  <span>
                    {appointmentDetails?.infoKoiResponse?.healthStatus ||
                      "Chưa cập nhật"}
                  </span>
                </div>
              </div>
            </div>

            {/* Thông tin lịch hẹn */}
            <div className="info-section">
              <h3>Thông tin lịch hẹn</h3>

              <div className="info-grid appointment-info">
                <div className="info-item">
                  <label>Ngày hẹn:</label>
                  <span>
                    {appointmentDetails?.infoAppointmentResponse
                      ?.appointmentDate || "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Giờ hẹn:</label>
                  <span>
                    {appointmentDetails?.infoAppointmentResponse?.time ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Dịch vụ:</label>
                  <span>
                    {appointmentDetails?.infoAppointmentResponse?.serviceType ||
                      "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Trạng thái:</label>
                  <span
                    className={`status-badge ${appointmentDetails?.status
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {appointmentDetails?.status || "Chưa cập nhật"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Bác sĩ phụ trách:</label>
                  <span>
                    {appointmentDetails?.infoAppointmentResponse?.doctorName ||
                      "Chưa phân công"}
                  </span>
                </div>
                <div className="info-item">
                  <label>Phân công bác sĩ:</label>
                  <span
                    className={`assign-type ${
                      appointmentDetails?.infoAppointmentResponse
                        ?.doctorAssigned
                        ? "customer-choice"
                        : "center-assign"
                    }`}
                  >
                    {appointmentDetails?.infoAppointmentResponse
                      ?.doctorAssigned
                      ? "Khách hàng chọn bác sĩ"
                      : "Trung tâm điều phối bác sĩ"}
                  </span>
                </div>
              </div>
            </div>

            {/* Chi tiết thanh toán */}
            <div className="payment-details-section">
              <h3>Chi tiết thanh toán</h3>
              <div className="payment-info">
                <div className="payment-method">
                  <span className="label">Phương thức thanh toán:</span>
                  <span className="value">
                    {appointmentDetails?.transactionMethod || "Chưa cập nhật"}
                  </span>
                </div>
                <div className="payment-summary-boxes">
                  <div className="summary-box paid">
                    <span className="summary-label">Đã thanh toán</span>
                    <span className="summary-value">
                      {formatCurrency(appointmentDetails?.donePayment)}đ
                    </span>
                  </div>
                  <div className="summary-box unpaid">
                    <span className="summary-label">Chưa thanh toán</span>
                    <span className="summary-value">
                      {formatCurrency(appointmentDetails?.notDonePayment)}đ
                    </span>
                  </div>
                  <div className="summary-box total">
                    <span className="summary-label">Tổng tiền dịch vụ</span>
                    <span className="summary-value">
                      {formatCurrency(appointmentDetails?.totalPayment)}đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Bảng chi tiết dịch vụ */}
              {appointmentDetails?.infoServiceTypeResponse && (
                <div className="payment-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Mã dịch vụ</th>
                        <th>Tên dịch vụ</th>
                        <th>Đơn giá</th>
                        <th>Trạng thái</th>
                        <th>Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentDetails.infoServiceTypeResponse.map(
                        (service) => (
                          <tr key={service.serviceTypeId}>
                            <td>{service.serviceTypeId}</td>
                            <td>{service.serviceTypeName}</td>
                            <td>{formatCurrency(service.serviceTypePrice)}đ</td>
                            <td>
                              <span
                                className={`payment-status ${
                                  service.statusPayment ? "paid" : "unpaid"
                                }`}
                              >
                                {service.statusPayment
                                  ? "Đã thanh toán"
                                  : "Chưa thanh toán"}
                              </span>
                            </td>
                            <td>{formatCurrency(service.serviceTypePrice)}đ</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Phản hồi khách hàng */}
            <div className="feedback-section">
              <h3>Phản hồi của khách hàng</h3>
              <div className="feedback-content">
                <div className="rating">
                  <label>Đánh giá:</label>
                  <div className="stars">
                    {[...Array(appointmentDetails.rating || 0)].map(
                      (_, index) => (
                        <i key={index} className="fas fa-star"></i>
                      )
                    )}
                    {[...Array(5 - (appointmentDetails.rating || 0))].map(
                      (_, index) => (
                        <i key={index} className="far fa-star"></i>
                      )
                    )}
                    <span className="rating-number">
                      ({appointmentDetails.rating}/5)
                    </span>
                  </div>
                </div>
                <div className="comment">
                  <label>Nhận xét:</label>
                  <p>{appointmentDetails.comment || "Chưa có nhận xét"}</p>
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
            <p>
              Bạn có chắc chắn đã nhận được tiền thanh toán từ khách hàng{" "}
              <strong>{selectedAppointment?.fullNameCustomer}</strong> không?
            </p>
            <p className="warning-text">
              Lưu ý: Khi đã xác nhận thanh ton thì sẽ không thể sửa đổi trạng
              thái của lịch hẹn!
            </p>
            <div className="modal-buttons">
              <button
                className="modal-btn cancel"
                onClick={() => setShowPaymentModal(false)}
              >
                Quay lại
              </button>
              <button
                className="modal-btn confirm"
                onClick={() => {
                  handleConfirmPayment(selectedAppointment);
                  setShowPaymentModal(false);
                }}
              >
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

// Cập nhật lại hàm helper
const getStepNumber = (status) => {
  const statusMap = {
    "Chờ bác sĩ xác nhận": 1,
    "Đã xác nhận": 2,
    "Chờ thanh toán tiền dịch vụ": 3,
    "Thanh toán tiền dịch vụ thành công": 4,
    "Đang cung cấp dịch vụ": 5,
    "Thực hiện xong dịch vụ": 6,
    "Chờ thanh toán tổng tiền": 7,
    "Hoàn thành": 8,
    "Đã đánh giá": 9,
  };
  return statusMap[status] || 0;
};

// Helper function để xác định index của status
function getStatusIndex(currentStatus) {
  const statuses = [
    "Chờ bác sĩ xác nhận",
    "Đã xác nhận",
    "Chờ thanh toán tiền dịch vụ",
    "Thanh toán tiền dịch vụ thành công",
    "Đang cung cấp dịch vụ",
    "Thực hiện xong dịch vụ",
    "Chờ thanh toán tổng tiền",
    "Hoàn thành",
    "Đã đánh giá",
  ];
  return statuses.indexOf(currentStatus);
}

// Thêm icons cho mỗi trạng thái
const statusIcons = {
  "Chờ bác sĩ xác nhận": "fa-clock",
  "Đã xác nhận": "fa-check",
  "Chờ thanh toán tiền dịch vụ": "fa-dollar-sign",
  "Thanh toán tiền dịch vụ thành công": "fa-check-double",
  "Đang cung cấp dịch vụ": "fa-user-md",
  "Thực hiện xong dịch vụ": "fa-check-circle",
  "Chờ thanh toán tổng tiền": "fa-dollar-sign",
  "Hoàn thành": "fa-flag-checkered",
  "Đã đánh giá": "fa-star",
};

const TimelineComponent = ({ currentStatus }) => {
  const currentStep = getStepNumber(currentStatus);
  const totalSteps = 9; // Tổng số trạng thái

  // Tính toán phần trăm tiến độ
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  return (
    <div
      className="timeline-container"
      style={{ "--progress-width": progressWidth }}
    >
      {[
        "Chờ bác sĩ xác nhận",
        "Đã xác nhận",
        "Chờ thanh toán tiền dịch vụ",
        "Thanh toán tiền dịch vụ thành công",
        "Đang cung cấp dịch vụ",
        "Thực hiện xong dịch vụ",
        "Chờ thanh toán tổng tiền",
        "Hoàn thành",
        "Đã đánh giá",
      ].map((status, index) => {
        const stepNumber = getStepNumber(status);
        const isCompleted = stepNumber <= currentStep;

        return (
          <div
            key={index}
            className={`timeline-item ${isCompleted ? "completed" : ""}`}
          >
            <div
              className="timeline-dot"
              title={status}
              style={{
                borderColor: isCompleted ? "#22C55E" : "#dc3545",
                background: isCompleted ? "#22C55E" : "white",
              }}
            >
              <i
                className={`fas ${statusIcons[status]}`}
                style={{ color: isCompleted ? "white" : "#dc3545" }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
