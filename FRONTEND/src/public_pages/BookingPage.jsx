
import OnlineConsultation from './OnlineConsultation';
import HomeSurvey from './HomeSurvey';
import CenterAppointment from './CenterAppointment';
import HomeTreatment from './HomeTreatment';
import { useBookingPage } from '../hooks/useBookingPage';

function ServicePage() {
    const {
        specialty,
        setSpecialty,
        phoneNumber,
        setPhoneNumber,
        description,
        setDescription,
        address,
        setAddress,
        district,
        setDistrict,
        doctor,
        setDoctor,
        selectedDate,
        setSelectedDate,
        timePeriod,
        setTimePeriod,
        availableTimes,
        selectedTime,
        setSelectedTime,
        handleSubmit,
        doctors,
        periods,
        districts
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
                    <option value="online-consultation">Tư Vấn Trực Tuyến</option>
                    <option value="home-survey">Khảo Sát Tại Nhà</option>
                    <option value="center-appointment">Đặt lịch Khám Tại Trung Tâm</option>
                    <option value="home-treatment">Điều Trị Tại Nhà</option>
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
                <HomeSurvey
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    description={description}
                    setDescription={setDescription}
                    district={district}
                    setDistrict={setDistrict}
                    address={address}
                    setAddress={setAddress}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    timePeriod={timePeriod}
                    setTimePeriod={setTimePeriod}
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
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    availableTimes={availableTimes}
                />
            )}

            {specialty === 'home-treatment' && (
                <HomeTreatment
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    description={description}
                    setDescription={setDescription}
                    district={district}
                    setDistrict={setDistrict}
                    address={address}
                    setAddress={setAddress}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    timePeriod={timePeriod}
                    setTimePeriod={setTimePeriod}
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

export default ServicePage;
