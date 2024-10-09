import "../styles/BookingPage.css"

function OnlineConsultation({ phoneNumber, setPhoneNumber, description, setDescription }) {
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

export default OnlineConsultation;