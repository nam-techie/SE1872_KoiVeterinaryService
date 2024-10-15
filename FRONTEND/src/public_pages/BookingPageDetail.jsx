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
export function PhoneInput({ phoneNumber, setPhoneNumber }) {
    return (
        <div className="form-group">
            <label>Số điện thoại:</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
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

export function TimeSelector({ selectedTime, setSelectedTime, availableTimes }) {
    return (
        <div className="form-group">
            <label>Chọn giờ:</label>
            <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                {availableTimes.length > 0 ? (
                    availableTimes.map((time, index) => (
                        <option key={index} value={`${time.startTime}-${time.endTime}`}>
                            {time.startTime} - {time.endTime}
                        </option>
                    ))
                ) : (
                    <option value="">Chưa có giờ khả dụng</option>
                )}
            </select>
        </div>
    );
}

export function DoctorSelector({ selectedDoctor, handleDoctorSelect, doctors }) {
    return (
        <div className="form-group">
            <label>Chọn bác sĩ:</label>
            <select value={selectedDoctor} onChange={(e) => handleDoctorSelect(e.target.value)}>
                <option value="">Không chọn</option>
                {doctors && doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                        {doctor.fullname}
                    </option>
                ))}
            </select>
        </div>
    );
}

export function DistrictSelector({ selectedDistrict, setSelectedDistrict, districts }) {
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
        </div>
    );
}

export function DetailedAddressInput({ detailedAddress, setDetailedAddress }) {
    return (
        <div className="form-group">
            <label>Địa chỉ chi tiết:</label>
            <input type="text" value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)} />
        </div>
    );
}

export function SubmitButton({ handleSubmit }) {
    return (
        <button type="submit" className="submit-button" onClick={handleSubmit}>
            Xác nhận đặt lịch
        </button>
    );
}

export function DateSelector({ selectedDate, setSelectedDate, dateOptions }) {
    return (
        <div className="form-group">
            <label>Chọn ngày:</label>
            <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                <option value="">Chọn ngày</option>
                {dateOptions && dateOptions.map((date, index) => (
                    <option key={index} value={date}>
                        {date}
                    </option>
                ))}
            </select>
        </div>
    );
}