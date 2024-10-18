import Masonry from 'react-masonry-css';
import { useServiceBookingData } from '../hooks/useService.js';
import { BookingHistoryDataCard } from '../components/Card.jsx';
import '../styles/BookingServiceHistory.css';
import { useState } from 'react';

function BookingServiceHistory() {
    const { services, loading, error } = useServiceBookingData(); // Lấy dữ liệu dịch vụ từ hook
    const [filterStatus, setFilterStatus] = useState(''); // Trạng thái lọc dịch vụ

    // Thiết lập cấu hình breakpoint cho Masonry layout
    const breakpointColumnsObj = {
        default: 4, // Số cột mặc định
        1100: 3,    // 3 cột khi màn hình có độ rộng <= 1100px
        700: 2,     // 2 cột khi màn hình có độ rộng <= 700px
        500: 1      // 1 cột khi màn hình có độ rộng <= 500px
    };

    // Hiển thị loading nếu dữ liệu đang được tải
    if (loading) {
        return <div>Loading...</div>;
    }

    // Xử lý lỗi
    if (error) {
        return <div>Error: {error.message || "Có lỗi xảy ra khi tải dữ liệu!"}</div>;
    }

    // Nếu không có dịch vụ nào được trả về
    if (!services || services.length === 0) {
        return <div>No services available.</div>;
    }

    // Bộ lọc trạng thái dịch vụ
    const filteredServices = filterStatus
        ? services.filter((service) => service.status === filterStatus)
        : services;

    return (
        <div className="booking-service-history-container">
            <h1>Danh sách dịch vụ đã đặt</h1> {/* Thêm tiêu đề h1 */}

            {/* Bộ lọc trạng thái */}
            <div className="filter-container">
                <label htmlFor="filterStatus">Lọc trạng thái: </label>
                <select
                    id="filterStatus"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="">Tất cả</option>
                    <option value="doctor confirmed">Doctor Confirmed</option>
                    <option value="waiting for doctor confirmation">Waiting for Doctor Confirmation</option>
                    <option value="payment successful">Payment Successful</option>
                    <option value="waiting for payment">Waiting for Payment</option>
                    <option value="doctor canceled">Doctor Canceled</option>
                </select>
            </div>

            {/* Hiển thị danh sách dịch vụ với Masonry layout */}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="service-container-masonry"
                columnClassName="service-container-part-masonry"
            >
                {filteredServices.map((service) => (
                    <BookingHistoryDataCard
                        key={service.id} // Khóa duy nhất cho mỗi thẻ dịch vụ
                        serviceName={service.serviceName} // Tên dịch vụ
                        description={service.description} // Mô tả dịch vụ
                        selectedDate={service.selectedDate} // Ngày đã chọn
                        selectedTime={service.selectedTime} // Giờ đã chọn
                        status={service.status} // Trạng thái dịch vụ
                        selectedDoctor={service.selectedDoctor} // Bác sĩ đã chọn (nếu có)
                    />
                ))}
            </Masonry>
        </div>
    );
}

export default BookingServiceHistory;
