import { OnlineConsultation, HomeService, CenterAppointment } from "./BookingPageDetail.jsx";
import { useBookingPage } from '../hooks/useBookingPage';

function BookingPage() {
    const {
        services,
        districts,
        doctors,
        specialty,
        setSpecialty,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        address,
        setAddress,
        doctor,
        setDoctor,
        availableDates,
        selectedDate,
        setSelectedDate,
        availableTimes,
        selectedTime,
        setSelectedTime,
        periods,  // periods được giữ nguyên
        timePeriod,  // Thêm lại timePeriod
        setTimePeriod,  // Thêm lại setTimePeriod
        handleSubmit
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
                    {services.map(service => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
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

            {specialty === 'home-survey' && (
                <HomeService
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    description={description}
                    setDescription={setDescription}
                    address={address}
                    setAddress={setAddress}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    timePeriod={timePeriod}  // Truyền timePeriod vào HomeService
                    setTimePeriod={setTimePeriod}  // Truyền setTimePeriod vào HomeService
                    periods={periods}
                    districts={districts}
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
                    doctors={doctors}
                    availableDates={availableDates}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    availableTimes={availableTimes}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                />
            )}

            {specialty === 'home-treatment' && (
                <HomeService
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    description={description}
                    setDescription={setDescription}
                    address={address}
                    setAddress={setAddress}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    timePeriod={timePeriod}  // Truyền timePeriod vào HomeService
                    setTimePeriod={setTimePeriod}  // Truyền setTimePeriod vào HomeService
                    periods={periods}
                    districts={districts}
                />
            )}

            <button type="submit" className="submit-button">
                Đặt ngay
            </button>
        </form>
    );
}

export default BookingPage;
