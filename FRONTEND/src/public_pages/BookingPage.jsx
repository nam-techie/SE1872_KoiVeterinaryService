import { OnlineConsultation, HomeService, CenterAppointment } from './BookingPageDetail';
import { useBookingPage } from '../hooks/useBookingPage';

function BookingPage() {
    const {
        specialty,
        setSpecialty,
        services,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        address,
        setAddress,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        timePeriod,
        setTimePeriod,
        periods, // Periods được sử dụng cho dịch vụ tại nhà
        districtList,
        doctor,
        setDoctor,
        setDistrictList,
        doctorList,
        availableDates, // Ngày có sẵn cho dịch vụ tại trung tâm
        availableTimes, // Thời gian theo ngày cho dịch vụ tại trung tâm
        handleSubmit,
    } = useBookingPage();

    return (
        <form onSubmit={handleSubmit} className="appointment-form">
            <h2>Nội dung chi tiết đặt hẹn</h2>
            <div className="form-group">
                <label htmlFor="specialty">Loại Dịch Vụ Bạn Muốn Đặt</label>
                <select
                    id="specialty"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                >
                    <option value="">Chọn loại dịch vụ</option>
                    {services.length > 0 ? (
                        services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))
                    ) : (
                        <option value="" disabled>Không có dịch vụ khả dụng</option>
                    )}
                </select>
            </div>

            {specialty === 'online-consultation' && (
                <OnlineConsultation
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    description={description}
                    setDescription={setDescription}
                />
            )}

            {(specialty === 'home-survey' || specialty === 'home-treatment') && (
                <HomeService
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    description={description}
                    setDescription={setDescription}
                    address={address}
                    setAddress={setAddress}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    timePeriod={timePeriod}
                    setTimePeriod={setTimePeriod}
                    periods={periods} // periods lấy từ useBookingPage để hiển thị thời gian
                    districts={districtList}
                    setDistrict={setDistrictList}
                />
            )}

            {specialty === 'center-appointment' && (
                <CenterAppointment
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    description={description}
                    setDescription={setDescription}
                    doctor={doctor}
                    setDoctor={setDoctor}
                    doctors={doctorList} // Danh sách bác sĩ để chọn
                    availableDates={availableDates} // Ngày có sẵn
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    availableTimes={selectedDate ? availableTimes[selectedDate] || [] : []} // Thời gian sẵn có cho ngày đã chọn
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
            )}

            <button type="submit" className="submit-button">
                Đặt ngay
            </button>
        </form>
    );
}

export default BookingPage;
