
import styles from '../pages/customer_Pages/styles/BookingPage.module.css';

/* eslint-disable react/prop-types */
export function ServiceTypeSelector({ serviceType, setServiceType, service }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Chọn loại dịch vụ:</label>
            <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className={styles.select}
            >
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
        <div className={styles.formGroup}>
            <label className={styles.label}>Số điện thoại:</label>
            <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={styles.input}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}

export function DescriptionInput({ description, setDescription }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Miêu tả vấn đề:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
            />
        </div>
    );
}

export function TimeSelector({ availableTimes, selectedTime, setSelectedTime, error, disabled }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Chọn giờ:</label>
            <select
                value={disabled ? '' : selectedTime} /* Nếu disabled thì giá trị mặc định là rỗng */
                onChange={(e) => setSelectedTime(e.target.value)}
                disabled={disabled}
                className={disabled ? styles.selectDisabled : styles.select}
            >
                <option value="">Chọn giờ</option>
                {availableTimes.map((timeSlot, index) => (
                    <option key={index} value={timeSlot.startTime}>
                        {timeSlot.startTime} - {timeSlot.endTime}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}

export function DoctorSelector({ selectedDoctor, handleDoctorSelect, doctors, disabled }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Chọn bác sĩ (không bắt buộc):</label>
            <select
                value={disabled ? '' : selectedDoctor} /* Nếu disabled thì giá trị mặc định là rỗng */
                onChange={(e) => handleDoctorSelect(e.target.value)}
                disabled={disabled}
                className={disabled ? styles.selectDisabled : styles.select}
            >
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

export function DistrictSelector({ selectedDistrict, setSelectedDistrict, districts, error, disabled }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Chọn quận/huyện:</label>
            <select
                value={disabled ? '' : selectedDistrict} /* Nếu disabled thì giá trị mặc định là rỗng */
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={disabled}
                className={disabled ? styles.selectDisabled : styles.select}
            >
                <option value="">Chọn quận/huyện</option>
                {districts && districts.map((district) => (
                    <option key={district.id} value={district.id}>
                        {district.name}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}

export function DetailedAddressInput({ detailedAddress, setDetailedAddress, error, disabled }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Địa chỉ chi tiết:</label>
            <input
                type="text"
                value={disabled ? '' : detailedAddress} /* Nếu disabled thì giá trị mặc định là rỗng */
                onChange={(e) => setDetailedAddress(e.target.value)}
                disabled={disabled}
                className={disabled ? styles.inputDisabled : styles.input}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}

export function DateSelector({ selectedDate, setSelectedDate, dateOptions, error, disabled }) {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Chọn ngày:</label>
            <select
                value={disabled ? '' : selectedDate} /* Nếu disabled thì giá trị mặc định là rỗng */
                onChange={(e) => setSelectedDate(e.target.value)}
                disabled={disabled}
                className={disabled ? styles.selectDisabled : styles.select}
            >
                <option value="">Chọn ngày</option>
                {dateOptions && dateOptions.map((date, index) => (
                    <option key={index} value={date}>
                        {date}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
}

export function SubmitButton({ handleSubmit, isDisabled }) {
    return (
        <button
            type="submit"
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={isDisabled} /* Disable nút submit nếu điều kiện chưa thỏa */
        >
            Xác nhận đặt lịch
        </button>
    );
}

export function AgreementCheckbox({ setAgree }) {
    return (
        <div className={styles.formGroup}>
            <input
                type="checkbox"
                id="agree"
                onChange={(e) => setAgree(e.target.checked)} /* Cập nhật trạng thái khi checkbox được chọn */
            />
            <label htmlFor="agree">
                Tôi đã đồng ý với <a href="/terms">Điều Khoản và Dịch Vụ</a>
            </label>
        </div>
    );
}



export const ConfirmationModal = ({
                                      serviceType,
                                      phoneNumber,
                                      description,
                                      selectedDate,
                                      selectedTime,
                                      detailedAddress,
                                      selectedDistrict,
                                      selectedDoctor,
                                      handleFinalSubmit,
                                      setShowConfirm,
                                      serviceTypeMap,
                                      districtsMap,
                                      doctorMap
                                  }) => {

    const getNameById = (id, array) => {
        const item = array.find(el => el.id === id);
        return item ? (item.fullName || item.name || 'Không xác định') : 'Không xác định';
    };

    const serviceTypeName = getNameById(serviceType, serviceTypeMap);
    const districtName = getNameById(selectedDistrict, districtsMap);
    const doctorName = selectedDoctor === 'dr0' ? 'Không' : getNameById(selectedDoctor, doctorMap);

    return (
        <>
            <div className={styles.confirmationOverlay}></div> {/* Overlay để khóa tương tác bên ngoài */}
            <div className={styles.confirmationModal}>
                <h2>Xác nhận thông tin đặt dịch vụ</h2>
                <hr />
                {serviceType && (
                    <span className={styles.fieldLabel}>Loại dịch vụ: <span className={styles.fieldValue}>{serviceTypeName}</span></span>
                )}
                {phoneNumber && (
                    <span className={styles.fieldLabel}>Số điện thoại: <span className={styles.fieldValue}>{phoneNumber}</span></span>
                )}
                {description && (
                    <span className={styles.fieldLabel}>Miêu tả vấn đề: <span className={styles.fieldValue}>{description}</span></span>
                )}

                {/* Chỉ hiển thị nếu có chọn ngày và giờ */}
                {selectedDate && (
                    <span className={styles.fieldLabel}>Ngày đã chọn: <span className={styles.fieldValue}>{selectedDate}</span></span>
                )}
                {selectedTime && (
                    <span className={styles.fieldLabel}>Giờ đã chọn: <span className={styles.fieldValue}>{selectedTime}</span></span>
                )}

                {/* Hiển thị quận và địa chỉ nếu dịch vụ yêu cầu */}
                {(serviceType === '2' || serviceType === '4') && (
                    <>
                        {selectedDistrict && (
                            <span className={styles.fieldLabel}>Quận/Huyện: <span className={styles.fieldValue}>{districtName}</span></span>
                        )}
                        {detailedAddress && (
                            <span className={styles.fieldLabel}>Địa chỉ chi tiết: <span className={styles.fieldValue}>{detailedAddress}</span></span>
                        )}
                    </>
                )}

                {/* Hiển thị thông tin bác sĩ nếu có */}
                {serviceType === '3' && (
                    <span className={styles.fieldLabel}>Bác sĩ đã chọn: <span className={styles.fieldValue}>{doctorName}</span></span>
                )}
                <hr />

                <div className={styles.confirmationButtons}>
                    {/* Nút Xác nhận để gửi thông tin */}
                    <button onClick={handleFinalSubmit} className={styles.confirmBtn}>Xác nhận và gửi</button>
                    {/* Nút Chỉnh sửa để quay lại */}
                    <button onClick={() => setShowConfirm(false)} className={styles.editBtn}>Chỉnh sửa</button>
                </div>
            </div>
        </>
    );
};
