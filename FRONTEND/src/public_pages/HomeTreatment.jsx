import "../styles/BookingPage.css"

function HomeTreatment({ phoneNumber, setPhoneNumber, description, setDescription, district, setDistrict, address, setAddress, selectedDate, setSelectedDate, timePeriod, setTimePeriod, periods, districts }) {
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
                <input
                    type="date"
                    id="selectedDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="timePeriod">Chọn Thời Gian *</label>
                <select
                    id="timePeriod"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                >
                    <option value="">Chọn thời gian</option>
                    {periods.map((period) => (
                        <option key={period.id} value={period.id}>
                            {period.period} ({period.startTime} - {period.endTime})
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default HomeTreatment;
