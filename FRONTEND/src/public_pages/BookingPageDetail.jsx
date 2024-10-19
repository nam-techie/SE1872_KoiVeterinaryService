import "../styles/BookingPage.css"

export function ServiceTypeSelector({ serviceType, setServiceType, service }) {
    return (
        <div className="form-group">
            <label>Chọn loại dịch vụ:</label>
            <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                <option value="">Chọn dịch vụ</option>
                {service && service.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
export function PhoneInput({ phoneNumber, setPhoneNumber, error }) {
    return (
        <div className="form-group">
            <label>Số điện thoại:</label>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {error && <span className="error-message" style={{ color: 'red' }}>{error}</span>}
        </div>
    );
}

export function DescriptionInput({ description, setDescription }) {
    return (
        <div className="form-group">
            <label>Miêu tả vấn đề:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
    );
}

export function TimeSelector({ availableTimes, selectedTime, setSelectedTime, error }) {
    return (
        <div className="form-group">
            <label>Chọn giờ:</label>
            <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}>
                <option value="">Chọn giờ</option>
                {availableTimes.map((timeSlot, index) => (
                    <option key={index} value={timeSlot.startTime}>
                        {timeSlot.startTime} - {timeSlot.endTime}
                    </option>
                ))}
            </select>
            {error && <span className="error-message" style={{ color: 'red' }}>{error}</span>}
        </div>
    );
}

export function DoctorSelector({ selectedDoctor, handleDoctorSelect, doctors }) {
    return (
        <div className="form-group">
            <label>Chọn bác sĩ (không bắt buộc):</label>
            <select value={selectedDoctor} onChange={(e) => handleDoctorSelect(e.target.value)}>
                {/* Tùy chọn 'Không chọn' sẽ gửi giá trị 'dr0' */}
                <option value="dr0">Không chọn</option>
                {doctors && doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                        {doctor.fullname}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function DistrictSelector({ selectedDistrict, setSelectedDistrict, districts, error }) {
    return (
        <div className="form-group">
            <label>Chọn quận/huyện:</label>
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                <option value="">Chọn quận/huyện</option>
                {districts && districts.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.name}
                    </option>
                ))}
            </select>
            {error && <span className="error-message" style={{ color: 'red' }}>{error}</span>}
        </div>
    );
}


export function DetailedAddressInput({ detailedAddress, setDetailedAddress, error }) {
    return (
        <div className="form-group">
            <label>Địa chỉ chi tiết:</label>
            <input
                type="text"
                value={detailedAddress}
                onChange={(e) => setDetailedAddress(e.target.value)}
            />
            {error && <span className="error-message" style={{ color: 'red' }}>{error}</span>}
        </div>
    );
}
export function DateSelector({ selectedDate, setSelectedDate, dateOptions, error }) {
    return (
        <div className="form-group">
            <label>Chọn ngày:</label>
            <select
                value={selectedDate}
                onChange={(e) => {
                    setSelectedDate(e.target.value);  // Cập nhật selectedDate khi người dùng chọn ngày
                }}
            >
                <option value="">Chọn ngày</option>
                {dateOptions && dateOptions.map((date, index) => (
                    <option key={index} value={date}>
                        {date}
                    </option>
                ))}
            </select>
            {error && <span className="error-message" style={{ color: 'red' }}>{error}</span>}
        </div>
    );
}
export const ConfirmationModal = ({ serviceType, phoneNumber, description, selectedDate, selectedTime,detailedAddress, selectedDistrict, selectedDoctor, handleFinalSubmit, setShowConfirm, serviceTypeMap, districtsMap, doctorMap }) => {

    const getNameById = (id, array) => {
        const item = array.find(el => el.id === id);

        if (!item) {
            return 'Không xác định'; // Nếu không tìm thấy đối tượng
        }

        // Ưu tiên trả về fullName nếu tồn tại, nếu không thì trả về name
        return item.fullName || item.name || 'Không xác định';
    };

    const serviceTypeName = getNameById(serviceType, serviceTypeMap);

    const districtName = getNameById(selectedDistrict,districtsMap);

    const doctorName = selectedDoctor === 'dr0' ? 'Không' : getNameById(selectedDoctor, doctorMap);
    console.log('Selected Doctor ID:', selectedDoctor);
    console.log('Doctor Map:', doctorMap);

    return (
        <>
            <div className="confirmation-overlay"></div> {/* Overlay behind the modal */}
            <div className="confirmation-modal">
                <h2>Xác nhận thông tin đặt dịch vụ</h2>
                <hr />
                <span className="field-label">Loại dịch vụ: <span className="field-value">{serviceTypeName}</span></span><br />
                <span className="field-label">Số điện thoại: <span className="field-value">{phoneNumber}</span></span><br />
                <span className="field-label">Miêu tả vấn đề: <span className="field-value">{description}</span></span><br />

                {serviceType !== '1' && (
                    <>
                        <span className="field-label">Ngày đã chọn: <span className="field-value">{selectedDate}</span></span><br />
                        <span className="field-label">Giờ đã chọn: <span className="field-value">{selectedTime}</span></span><br />

                        {(serviceType === '2' || serviceType === '4') && (
                            <>
                                <span className="field-label">Quận/Huyện: <span className="field-value">{districtName}</span></span><br />
                                <span className="field-label">Địa chỉ chi tiết: <span className="field-value">{detailedAddress}</span></span><br />
                            </>
                        )}
                        {serviceType === '3' && <span className="field-label">Bác sĩ đã chọn: <span className="field-value">{doctorName}</span></span>}
                    </>
                )}
                <hr />

                <div className="confirmation-buttons">
                    <button onClick={handleFinalSubmit} className="confirm-btn">Xác nhận và gửi</button>
                    <button onClick={() => setShowConfirm(false)} className="edit-btn">Chỉnh sửa</button>
                </div>
            </div>
        </>

    );
};

export function SubmitButton({ handleSubmit }) {
    return (
        <button type="submit" className="submit-button" onClick={handleSubmit}>
            Xác nhận đặt lịch
        </button>
    );
}

