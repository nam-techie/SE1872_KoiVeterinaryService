import "../styles/BookingPage.css"

export function CenterAppointment({ phoneNumber, setPhoneNumber, description, setDescription, doctor, setDoctor, doctors, availableDates, selectedDate, setSelectedDate, availableTimes, selectedTime, setSelectedTime }) {
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

            {availableDates.length > 0 && (
                <div className="form-group">
                    <label htmlFor="selectedDate">Chọn Ngày</label>
                    <select
                        id="selectedDate"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    >
                        <option value="">Chọn ngày</option>
                        {availableDates.map((date, index) => (
                            <option key={index} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {availableTimes.length > 0 && (
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
            )}
        </>
    );
}

export function HomeService({
                                phoneNumber,
                                setPhoneNumber,
                                description,
                                setDescription,
                                district,
                                setDistrict,
                                address,
                                setAddress,
                                selectedDate,
                                setSelectedDate,
                                timePeriod,
                                setTimePeriod,
                                periods,
                                districts
                            }) {
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
                <label htmlFor="description">Miêu Tả Nội Dung *</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="district">Chọn Quận *</label>
                <select
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                >
                    <option value="">Chọn quận</option>
                    {districts.map((dist) => (
                        <option key={dist.id} value={dist.name}>
                            {dist.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="address">Địa Chỉ Chi Tiết *</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="selectedDate">Chọn Ngày *</label>
                <select
                    id="selectedDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                >
                    <option value="">Chọn ngày</option>
                    {periods && periods.length > 0 ? (
                        periods.map((period, index) => (
                            <option key={index} value={period.date}>
                                {period.date}
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có ngày nào khả dụng</option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="timePeriod">Chọn Thời Gian *</label>
                <select
                    id="timePeriod"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                >
                    <option value="">Chọn thời gian</option>
                    {periods && periods.length > 0 ? (
                        periods.map((period) => (
                            <option key={period.id} value={period.id}>
                                {period.period} ({period.startTime} - {period.endTime})
                            </option>
                        ))
                    ) : (
                        <option disabled>Không có thời gian nào khả dụng</option>
                    )}
                </select>
            </div>
        </>
    );
}

export function OnlineConsultation({phoneNumber, setPhoneNumber, description, setDescription}) {
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
                <label htmlFor="description">Miêu Tả Nội Dung *</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
        </>
    );
}