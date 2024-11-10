import React, { useState, useEffect } from "react";
import { CustomerNavBar } from "../../components/Navbar";
import styles from "./styles/ManageAppointment.module.css";
import Footer from "../../components/Footer";
import useManageCus from "../../hooks/useManageCus";
import { FaSearch } from "react-icons/fa";
import LoadingCat from "../../components/LoadingCat.jsx";
import Pagination from "../../components/Pagination";
import FeedbackForm from "../../components/FeedbackForm";
import { axiosInstance } from "../../service/apiRequest.js";
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
  Snackbar,
  Alert,
} from "@mui/material";

// Thêm hàm helper để format date và time
const formatDateTime = (dateTimeStr) => {
  if (!dateTimeStr) return "";

  try {
    const date = new Date(dateTimeStr);

    // Format date: DD/MM/YYYY
    const formattedDate = date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    // Format time: HH:MM
    const formattedTime = date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return {
      date: formattedDate,
      time: formattedTime,
    };
  } catch (error) {
    console.error("Error formatting date:", error);
    return {
      date: "",
      time: "",
    };
  }
};

const ManageAppointment = () => {
  const { getAppointments, cancelAppointment, getPaymentUrl } = useManageCus();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("all");

  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 6; // Số lượng lịch hẹn trên mỗi trang

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [showCancelForm, setShowCancelForm] = useState(false);
  const [cancelNotes, setCancelNotes] = useState("");
  const [selectedCancelId, setSelectedCancelId] = useState(null);
  const [cancelError, setCancelError] = useState("");

  const steps = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Chờ thanh toán",
    "Thanh toán thành công",
    "Đang thực hiện",
    "Thực hiện xong",
    "Chờ thanh toán phí phát sinh",
    "Hoàn thành",
  ];

  const handleOpenModal = (appointmentId) => {
    console.log("Modal opening with ID:", appointmentId);
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

  useEffect(() => {
    // Kiểm tra xem URL hiện tại có phải là callback từ VNPAY không
    const isVNPayCallback = window.location.search.includes(
      "vnp_TransactionStatus"
    );

    if (isVNPayCallback) {
      const handleVNPayCallback = () => {
        const urlParams = new URLSearchParams(window.location.search);

        // Lấy các tham số cần thiết
        const orderID = urlParams.get("orderID");
        const transactionStatus = urlParams.get("vnp_TransactionStatus");

        console.log("VNPAY Callback Data:", {
          orderID,
          transactionStatus,
        });

        // Chỉ xử lý khi có orderID và transactionStatus là "00" (thanh toán thành công)
        if (orderID && transactionStatus === "00") {
          // Gọi API xác nhận thanh toán
          const confirmPayment = async () => {
            try {
              const response = await axiosInstance.post(
                `/customer/confirmPayment/${orderID}`
              );

              if (response.status === 200) {
                setSnackbarMessage("Thanh toán thành công!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                fetchAppointments();
              }

              // Xóa các tham số khỏi URL
              window.history.replaceState(
                {},
                document.title,
                window.location.pathname
              );
            } catch (error) {
              console.error("Lỗi xác nhận thanh toán:", error);
              setSnackbarMessage("Có lỗi xảy ra khi xác nhận thanh toán");
              setSnackbarSeverity("error");
              setOpenSnackbar(true);
            }
          };

          confirmPayment();
        } else if (transactionStatus !== "00") {
          setSnackbarMessage("Thanh toán không thành công!");
          setSnackbarSeverity("error");
          setOpenSnackbar(true);
          window.history.replaceState(
            {},
            document.title,
            window.location.pathname
          );
        }
      };

      handleVNPayCallback();
    }
  }, []); // Chạy một lần khi component mount

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  if (loading) return <LoadingCat />;
  if (error) return <div>Lỗi: {error}</div>;

  const filteredAndSortedAppointments = appointments
    .filter((appointment) => {
      const searchLower = searchTerm.toLowerCase();
      
      // Tìm kiếm theo nhiều tiêu chí
      const matchesSearch = 
        // Tìm theo ID
        appointment.appointmentId?.toString().toLowerCase().includes(searchLower) ||
        // Tìm theo loại dịch vụ
        appointment.serviceType?.toLowerCase().includes(searchLower) ||
        // Tìm theo ngày (format: DD/MM/YYYY)
        appointment.appointmentDate?.toLowerCase().includes(searchLower) ||
        // Tìm theo trạng thái
        appointment.appointmentStatus?.toLowerCase().includes(searchLower);

      const matchesStatus =
        statusFilter === "all" ||
        appointment.appointmentStatus === statusFilter;

      // Tìm kiếm theo ngày cụ thể nếu có
      if (dateSearch) {
        return (
          matchesSearch &&
          appointment.appointmentDate.includes(dateSearch) &&
          matchesStatus
        );
      }
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "appointmentDate") {
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      if (sortBy === "status") {
        const statusA = a.appointmentStatus === "Đã đánh giá" ? 1 : 0;
        const statusB = b.appointmentStatus === "Đã đánh giá" ? 1 : 0;
        return sortOrder === "asc" ? statusA - statusB : statusB - statusA;
      }
      if (sortBy === "id") {
        return sortOrder === "asc"
          ? a.appointmentId - b.appointmentId
          : b.appointmentId - a.appointmentId;
      }
      return 0;
    });

  // Tính toán tổng số trang
  const totalPages = Math.ceil(
    filteredAndSortedAppointments.length / appointmentsPerPage
  );

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
    console.log("handleRating called with ID:", appointmentId);
    setSelectedAppointmentId(appointmentId);
    setShowFeedbackForm(true);
    console.log("showFeedbackForm set to:", true);
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      // Gọi API để gửi feedback
      await axiosInstance.post("/customer/submitFeedback", feedbackData);
      setShowFeedbackForm(false);
      // Có thể thêm thông báo thành công
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Xử lý lỗi
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    setSelectedCancelId(appointmentId);
    setShowCancelForm(true);
    setCancelError("");
    setCancelNotes("");
  };

  const handleSubmitCancel = async () => {
    if (!cancelNotes.trim()) {
      setCancelError("Vui lòng nhập lý do hủy lịch");
      return;
    }

    try {
      await cancelAppointment(selectedCancelId, { notes: cancelNotes.trim() });
      setShowCancelForm(false);
      setCancelNotes("");
      setSelectedCancelId(null);
      setCancelError("");
      fetchAppointments();
      setSnackbarMessage("Hủy lịch hẹn thành công");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage("Có lỗi xảy ra khi hủy lịch hẹn: " + error.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handlePayment = async (appointmentId) => {
    try {
      const paymentUrl = await getPaymentUrl(appointmentId);
      if (paymentUrl) {
        window.location.href = paymentUrl; // Chuyển hướng đến trang thanh toán
      } else {
        throw new Error("Không nhận được URL thanh toán");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi tạo đường dẫnn thanh toán: " + error.message);
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
              <option value="Đang cung cấp dịch vụ">
                Đang cung cấp dịch vụ
              </option>
              <option value="Thực hiện xong dịch vụ">
                Thực hiện xong dịch vụ
              </option>
              <option value="Chờ thanh toán tiền dịch vụ">
                Chờ thanh toán tiền dịch vụ
              </option>
              <option value="Thanh toán tiền dịch vụ thành công">
                Thanh toán tiền dịch vụ thành công
              </option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đã đánh giá">Đã đánh giá</option>
              <option value="Đã hủy lịch">Đã hủy lịch</option>
            </select>

            <select
              className={styles.sortSelect}
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split("-");
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
            >
              <option value="id-desc">ID lịch hẹn mới nhất</option>
              <option value="id-asc">ID lịch hẹn cũ nhất</option>
              <option value="appointmentDate-desc">Sắp xếp theo ngày ↓</option>
              <option value="appointmentDate-asc">Sắp xếp theo ngày ↑</option>
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
                    <span
                      className={`${styles.status} ${
                        styles[`status${appointment.status}`]
                      }`}
                    >
                      {appointment.appointmentStatus}
                    </span>
                  </td>
                  <td>
                    {(appointment.appointmentStatus === "Chờ bác sĩ xác nhận" ||
                      appointment.appointmentStatus === "Đã xác nhận" ||
                      appointment.appointmentStatus ===
                        "Chờ thanh toán tiền dịch vụ" ||
                      appointment.appointmentStatus ===
                        "Thanh toán tiền dịch vụ thành công") && (
                      <button
                        className={styles.cancelButton}
                        style={{ marginRight: "10px" }}
                        onClick={() =>
                          handleCancelAppointment(appointment.appointmentId)
                        }
                      >
                        Hủy lịch
                      </button>
                    )}
                    {(appointment.appointmentStatus === "Đã xác nhận" ||
                      appointment.appointmentStatus ===
                        "Chờ thanh toán tiền dịch vụ" ||
                      appointment.appointmentStatus ===
                        "Chờ thanh toán tổng tiền" ||
                      appointment.appointmentStatus ===
                        "Thực hiện xong dịch vụ") && (
                      <button
                        className={styles.paymentButton}
                        style={{ marginRight: "10px" }}
                        onClick={() => handlePayment(appointment.appointmentId)}
                      >
                        Thanh toán
                      </button>
                    )}
                    {appointment.appointmentStatus === "Hoàn thành" && (
                      <button
                        className={styles.ratingButton}
                        style={{ marginRight: "10px" }}
                        onClick={() => handleRating(appointment.appointmentId)}
                      >
                        Đánh giá
                      </button>
                    )}
                    <button
                      className={styles.detailButton}
                      onClick={() => {
                        console.log(
                          "Button clicked for ID:",
                          appointment.appointmentId
                        );
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
      >
        <AppointmentModal
          appointmentID={selectedAppointmentId}
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%", fontSize: "1rem" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={showCancelForm}
        onClose={() => setShowCancelForm(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
      >
        <div className={styles.cancelFormContainer}>
          <div className={styles.cancelFormHeader}>
            <h2>Hủy lịch hẹn #{selectedCancelId}</h2>
            <button
              className={styles.closeButton}
              onClick={() => setShowCancelForm(false)}
            >
              ×
            </button>
          </div>

          <div className={styles.cancelFormBody}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                <span className={styles.required}>*</span> Lý do hủy lịch
              </label>
              <textarea
                className={styles.formTextArea}
                value={cancelNotes}
                onChange={(e) => setCancelNotes(e.target.value)}
                placeholder="Vui lòng cho chúng tôi biết lý do bạn muốn hủy lịch hẹn này..."
                maxLength={500}
              />
              <div className={styles.charCount}>
                {cancelNotes.length}/500 ký tự
              </div>
              {cancelError && (
                <div className={styles.errorMessage}>
                  <i className="fas fa-exclamation-circle"></i>
                  {cancelError}
                </div>
              )}
            </div>
          </div>

          <div className={styles.cancelFormFooter}>
            <button
              className={styles.cancelBtn}
              onClick={() => {
                setShowCancelForm(false);
                setCancelNotes("");
                setSelectedCancelId(null);
                setCancelError("");
              }}
            >
              <i className="fas fa-times"></i>
              Đóng
            </button>
            <button className={styles.confirmBtn} onClick={handleSubmitCancel}>
              <i className="fas fa-check"></i>
              Xác nhận hủy
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

const getStepStatus = (currentStatus, stepIndex) => {
  // Mapping của status với index trong timeline
  const statusMapping = {
    1: 1, // Chờ xác nhận
    2: 2, // Đã xác nhận
    3: 3, // Chờ thanh toán
    4: 4, // Thanh toán thành công
    5: 5, // Đang thực hiện
    6: 6, // Thực hiện xong
    7: 7, // Chờ thanh toán phí phát sinh
    8: 8, // Hoàn thành
  };

  const currentStepNumber = statusMapping[currentStatus] || 0;
  const stepNumber = stepIndex + 1;

  if (currentStepNumber > stepNumber) return "completed";
  if (currentStepNumber === stepNumber) return "active";
  return "";
};

const AppointmentModal = ({ appointmentID, open, onClose }) => {
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAppointmentDetail } = useManageCus();

  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      if (appointmentID) {
        try {
          setLoading(true);
          setError(null);
          const data = await getAppointmentDetail(appointmentID);
          setAppointmentDetails(data);
        } catch (error) {
          console.error("Error fetching appointment detail:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointmentDetail();
  }, [appointmentID]);

  if (loading) return <LoadingCat />;
  if (error)
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    );
  if (!appointmentDetails) return null;

  return (
    <div className="modal-overlay">
      <div className="view-modal-content">
        <div className="modal-header">
          <h2>Chi tiết lịch hẹn #{appointmentDetails.appointmentId}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Timeline Component */}
        <TimelineComponent currentStatus={appointmentDetails?.status} />
        <div className="current-status">
          Trạng thái hiện tại:
          <span
            className={`status-text ${
              appointmentDetails?.status === "Đã hủy lịch" ? "cancelled" : ""
            }`}
            data-status={appointmentDetails?.status}
          >
            {appointmentDetails?.status || "Chưa cập nhật"}
          </span>
        </div>

        {/* Hiển thị lý do hủy lịch nếu status là "Đã hủy lịch" */}
        {appointmentDetails?.status === "Đã hủy lịch" && (
          <div className={styles.cancelNoteSection}>
            <h3 className={styles.cancelNoteHeader}>Lý do hủy lịch</h3>
            <div>
              <label className={styles.cancelNoteLabel}>Ghi chú:</label>
              <div className={styles.cancelNoteContent}>
                {appointmentDetails?.cancelNotes || "Không có ghi chú"}
              </div>
            </div>
          </div>
        )}

        {/* Customer Information */}
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
                {appointmentDetails?.infoAppointmentResponse?.address ||
                  "Chưa cập nhật"}
              </span>
            </div>
            <div className="info-item">
              <label>Số điện thoại:</label>
              <span>
                {appointmentDetails?.infoCusResponse?.phone || "Chưa cập nhật"}
              </span>
            </div>
          </div>
        </div>

        {/* Appointment Information */}
        <div className="info-section">
          <h3>Thông tin lịch hẹn</h3>
          <div className="info-grid appointment-info">
            <div className="info-item">
              <label>Ngày hẹn:</label>
              <span>
                {appointmentDetails?.infoAppointmentResponse?.appointmentDate ||
                  "Chưa cập nhật"}
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
              <span>{appointmentDetails?.status || "Chưa cập nhật"}</span>
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
                  appointmentDetails?.infoAppointmentResponse?.doctorAssigned
                    ? "customer-choice"
                    : "center-assign"
                }`}
              >
                {appointmentDetails?.infoAppointmentResponse?.doctorAssigned
                  ? "Khách hàng chọn bác sĩ"
                  : "Trung tâm điều phối bác sĩ"}
              </span>
            </div>
          </div>
        </div>

        {/* Thông tin thú cưng hoặc lưu ý của bác sĩ */}
        {appointmentDetails?.status !== "Đã hủy lịch" && (
            appointmentDetails?.infoAppointmentResponse?.serviceType !== "Tư vấn trực tuyến" &&
            appointmentDetails?.infoAppointmentResponse?.serviceType !== "Khảo sát hồ cá tại nhà" ? (
                <div className="info-section">
                    <h3>Thông tin thú cưng</h3>
                    <div className="info-grid pet-info">
                        <div className="info-item">
                            <label>Tên thú cưng:</label>
                            <span>
                                {appointmentDetails?.infoKoiResponse?.name || "Chưa cập nhật"}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Giống:</label>
                            <span>
                                {appointmentDetails?.infoKoiResponse?.breed || "Chưa cập nhật"}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Tuổi:</label>
                            <span>
                                {appointmentDetails?.infoKoiResponse?.age || "Chưa cập nhật"}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Màu sắc:</label>
                            <span>
                                {appointmentDetails?.infoKoiResponse?.color || "Chưa cập nhật"}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Cân nặng:</label>
                            <span>
                                {appointmentDetails?.infoKoiResponse?.weight || "Chưa cập nhật"}
                            </span>
                        </div>
                        <div className="info-item">
                            <label>Tình trạng sức khỏe:</label>
                            <span>
                                {appointmentDetails?.infoKoiResponse?.healthStatus || "Chưa cập nhật"}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="info-section">
                    <h3>Lưu ý của bác sĩ</h3>
                    <div className="info-grid doctor-note">
                        <div className="info-item full-width">
                            <label>Ghi chú và lưu ý:</label>
                            <span className="doctor-note-content">
                                {appointmentDetails?.notes || "Bác sĩ chưa có ghi chú cho ca này"}
                            </span>
                        </div>
                    </div>
                </div>
            )
        )}

        {/* Payment Details */}
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
                  {appointmentDetails?.donePayment?.toLocaleString()}đ
                </span>
              </div>
              <div className="summary-box unpaid">
                <span className="summary-label">Chưa thanh toán</span>
                <span className="summary-value">
                  {appointmentDetails?.notDonePayment?.toLocaleString()}đ
                </span>
              </div>
              <div className="summary-box total">
                <span className="summary-label">Tổng tiền dịch vụ</span>
                <span className="summary-value">
                  {appointmentDetails?.totalPayment?.toLocaleString()}đ
                </span>
              </div>
            </div>
          </div>

          {/* Service Details Table */}
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
                  {appointmentDetails.infoServiceTypeResponse.map((service) => (
                    <tr key={service.serviceTypeId}>
                      <td>{service.serviceTypeId}</td>
                      <td>{service.serviceTypeName}</td>
                      <td>{service.serviceTypePrice?.toLocaleString()}đ</td>
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
                      <td>{service.serviceTypePrice?.toLocaleString()}đ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customer Feedback */}
        <div className="feedback-section">
          <h3>Phản hồi của khách hàng</h3>
          <div className="feedback-content">
            <div className="rating">
              <label>Đánh giá:</label>
              <div className="stars">
                {[
                  ...Array(appointmentDetails?.infoFeedbackResponse?.rate || 0),
                ].map((_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
                {[
                  ...Array(
                    5 - (appointmentDetails?.infoFeedbackResponse?.rate || 0)
                  ),
                ].map((_, index) => (
                  <i key={index} className="far fa-star"></i>
                ))}
                <span className="rating-number">
                  ({appointmentDetails?.infoFeedbackResponse?.rate}/5)
                </span>
              </div>
            </div>
            <div className="comment">
              <label>Nhận xét:</label>
              <p>
                {appointmentDetails?.infoFeedbackResponse?.feedback ||
                  "Chưa có nhận xét"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const totalSteps = 9;
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

export default ManageAppointment;
