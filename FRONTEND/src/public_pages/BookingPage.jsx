
import useBookingPage from '../hooks/useBookingPage.js';
import '../styles/BookingPage.css'; // Nhớ import file CSS này

export function BookingPage() {
    const {
        serviceType,
        setServiceType,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        handleDoctorSelect,
        availableTimes,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        districts,
        selectedDistrict,
        setSelectedDistrict,
        detailedAddress,
        setDetailedAddress,
        veterians, // Danh sách bác sĩ
    } = useBookingPage();

    return (
        <div className="appointment-form">
            <h1>Đặt lịch dịch vụ</h1>

            {/* Chọn loại dịch vụ */}
            <div className="form-group">
                <label>Chọn loại dịch vụ:</label>
                <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                    <option value="onlineConsultation">Tư vấn trực tuyến</option>
                    <option value="homeSurvey">Khảo sát tại nhà</option>
                    <option value="homeTreatment">Chữa bệnh tại nhà</option>
                    <option value="centerTreatment">Đặt lịch tại trung tâm</option>
                </select>
            </div>

            {/* Nhập số điện thoại */}
            <div className="form-group">
                <label>Số điện thoại:</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>

            {/* Miêu tả vấn đề (nếu không phải dịch vụ tại trung tâm) */}
            {(serviceType !== 'centerTreatment') && (
                <div className="form-group">
                    <label>Miêu tả vấn đề:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
            )}

            {/* Chọn bác sĩ cho dịch vụ tại trung tâm */}
            {serviceType === 'centerTreatment' && (
                <div className="form-group">
                    <label>Chọn bác sĩ:</label>
                    <select onChange={(e) => handleDoctorSelect(e.target.value)}>
                        <option value="">Không chọn</option>
                        {veterians.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Chọn quận/huyện cho dịch vụ tại nhà */}
            {(serviceType === 'homeSurvey' || serviceType === 'homeTreatment') && (
                <div className="form-group">
                    <label>Chọn quận/huyện:</label>
                    <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                        <option value="">Chọn quận/huyện</option>
                        {Array.isArray(districts) && districts.length > 0 ? (
                            districts.map((district) => (
                                <option key={district.id} value={district.name}>
                                    {district.name}
                                </option>
                            ))
                        ) : (
                            <option value="" disabled>Không có quận/huyện khả dụng</option>
                        )}
                    </select>
                </div>
            )}

            {/* Nhập địa chỉ chi tiết */}
            {(serviceType === 'homeSurvey' || serviceType === 'homeTreatment') && (
                <div className="form-group">
                    <label>Địa chỉ chi tiết:</label>
                    <input type="text" value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)} />
                </div>
            )}

            {/* Chọn ngày */}
            <div className="form-group">
                <label>Chọn ngày:</label>
                <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            {/* Chọn giờ dựa trên ngày và bác sĩ đã chọn */}
            {availableTimes.length > 0 && (
                <div className="form-group">
                    <label>Chọn giờ:</label>
                    <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                        {availableTimes.map((time, index) => (
                            <option key={index} value={`${time.startTime}-${time.endTime}`}>
                                {time.startTime} - {time.endTime}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Nút xác nhận */}
            <button type="submit" className="submit-button">Xác nhận đặt lịch</button>
        </div>
    );
}

export default BookingPage;
