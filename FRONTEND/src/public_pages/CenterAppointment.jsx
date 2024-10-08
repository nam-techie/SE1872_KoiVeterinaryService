import "../styles/BookingPage.css";

function CenterAppointment({ phoneNumber, setPhoneNumber, description, setDescription, doctor, setDoctor, doctors, selectedDate, setSelectedDate, selectedTime, setSelectedTime, availableTimes }) {
    return (
        <>
            <div className="form-group">
                <label htmlFor="phoneNumber">Số Điện Thoại *</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Miêu Tả Vấn Đề Cần Điều Trị *</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="doctor">Chọn Bác Sĩ (Không bắt buộc)</label>
                <select
                    id="doctor"
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                >
                    <option value="">Chọn Bác Sĩ</option>
                    {doctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                            {doc.fullname}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="selectedDate">Chọn Ngày</label>
                <input
                    type="date"
                    id="selectedDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="selectedTime">Chọn Thời Gian</label>
                <select
                    id="selectedTime"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                >
                    <option value="">Chọn thời gian</option>
                    {availableTimes.map((time, index) => (
                        <option key={index} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default CenterAppointment;
