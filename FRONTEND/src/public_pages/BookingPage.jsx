import React from 'react';
import useBookingPage from '../hooks/useBookingPage.js';
import {useDistrictList, useService, useVeterianList, useVeterianScheduleHome} from '../hooks/useService.js'; // Hook để lấy danh sách dịch vụ
import '../styles/BookingPage.css';

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
        detailedAddress,
        setDetailedAddress,
        selectedDistrict,
        setSelectedDistrict, // Quận/huyện được chọn
        // dateOptions, // Ngày khả dụng cho dịch vụ tại nhà
    } = useBookingPage();

    const { service, serviceLoading, serviceError } = useService(); // Lấy danh sách dịch vụ từ hook
    const {districts} = useDistrictList();
    const {doctors} = useVeterianList();
    const {veterianScheduleHome} = useVeterianScheduleHome();
    return (
        <div className="appointment-form">
            <h1>Đặt lịch dịch vụ</h1>

            {/* Xử lý trạng thái khi đang tải hoặc gặp lỗi */}
            {serviceLoading && <p>Đang tải danh sách dịch vụ...</p>}
            {serviceError && <p>{serviceError}</p>}

            {/* Chọn loại dịch vụ */}
            {!serviceLoading && !serviceError && (
                <div className="form-group">
                    <label>Chọn loại dịch vụ:</label>
                    <select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                        <option value="">Chọn dịch vụ</option>
                        {service && service.length > 0 && service.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Nhập số điện thoại (dành cho tất cả dịch vụ) */}
            <div className="form-group">
                <label>Số điện thoại:</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>

            {/* Miêu tả nội dung (dành cho tất cả dịch vụ) */}
            <div className="form-group">
                <label>Miêu tả vấn đề:</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            {/* Chọn ngày, giờ, địa chỉ chi tiết và quận/huyện cho dịch vụ tại nhà */}
            {(serviceType === '2' || serviceType === '4') && (
                <>
                    {/* Chọn ngày */}
                    <div className="form-group">
                        <label>Chọn ngày:</label>
                        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
                            <option value="">Chọn ngày</option>
                            {veterianScheduleHome.map((date) => (
                                <option key={date} value={date}>{date}</option>
                            ))}
                        </select>
                    </div>

                    {/* Chọn giờ */}
                    {availableTimes.length > 0 && (
                        <div className="form-group">
                            <label>Chọn giờ:</label>
                            <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                                {veterianScheduleHome.map((time, index) => (
                                    <option key={index} value={`${time.startTime}-${time.endTime}`}>
                                        {time.startTime} - {time.endTime}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Nhập địa chỉ chi tiết */}
                    <div className="form-group">
                        <label>Địa chỉ chi tiết:</label>
                        <input type="text" value={detailedAddress} onChange={(e) => setDetailedAddress(e.target.value)} />
                    </div>

                    {/* Chọn quận/huyện */}
                    <div className="form-group">
                        <label>Chọn quận/huyện:</label>
                        <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                            <option value="">Chọn quận/huyện</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.name}>
                                    {district.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </>
            )}


            {/* Chọn bác sĩ và giờ cho dịch vụ điều trị tại trung tâm */}
            {serviceType === '3' && (
                <>
                    <div className="form-group">
                        <label>Chọn bác sĩ:</label>
                        <select onChange={(e) => handleDoctorSelect(e.target.value)}>
                            <option value="">Không chọn</option>
                             {doctors.map((doctor) => (
                             <option key={doctor.id} value={doctor.id}>
                             {doctor.fullname}
                             </option>
                             ))}
                        </select>
                    </div>

                    {/*{availableTimes.length > 0 && (*/}
                    {/*    <div className="form-group">*/}
                    {/*        <label>Chọn giờ:</label>*/}
                    {/*        <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>*/}
                    {/*            {availableTimes.map((time, index) => (*/}
                    {/*                <option key={index} value={`${time.startTime}-${time.endTime}`}>*/}
                    {/*                    {time.startTime} - {time.endTime}*/}
                    {/*                </option>*/}
                    {/*            ))}*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*)}*/}
                </>
            )}

            {/* Nút xác nhận */}
            <button type="submit" className="submit-button">Xác nhận đặt lịch</button>
        </div>
    );
}

export default BookingPage;
