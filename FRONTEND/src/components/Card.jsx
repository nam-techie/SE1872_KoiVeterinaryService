import {useState} from "react";

export function BookingHistoryDataCard({ serviceName, description, selectedDate, selectedTime, status, selectedDoctor }) {
    const [showDetails, setShowDetails] = useState(false);

    const handleShowDetails = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div className="card-booking-service">
            <h2 className="card-title-booking-service">{serviceName}</h2>
            <p className="card-text-booking-service">Bác sĩ: {selectedDoctor || 'Không có'}</p> {/* Hiển thị bác sĩ nếu có */}
            <p className="card-text-booking-service">Ngày: {selectedDate}</p>
            {showDetails && (
                <div className="card-details-booking-service">
                    <p className="card-text-booking-service">Mô tả: {description}</p>
                    <p className="card-text-booking-service">Thời gian: {selectedTime}</p>
                    <p className="card-text-booking-service">Trạng thái: {status}</p>
                </div>
            )}

            {/* Nút Chi tiết để hiện thông tin đầy đủ */}
            <div className="card-actions-booking-service">
                <button onClick={handleShowDetails} className="btn-card-bookinghistory btn-blue-bookinghistory">
                    {showDetails ? 'Ẩn chi tiết' : 'Chi tiết'}
                </button>
                <button
                    className={`btn-card-bookinghistory ${status === 'doctor confirmed' ? 'btn-green-bookinghistory' : 'btn-gray-bookinghistory'}`}
                    disabled={status !== 'doctor confirmed'}
                >
                    Thanh toán
                </button>
                <button className="btn-card-bookinghistory btn-red-bookinghistory">Hủy lịch</button>
            </div>
        </div>
    );
}



export function VeterianCard({ fullname, sex, phone, experience, profilePic }) {
    return (
        <div className="veterian-card">
            <img src={profilePic} alt={fullname} className="veterian-image" />
            <div className="veterian-info">
                <h3 className="veterian-name">{fullname}</h3>
                <p className="veterian-detail"><strong>Giới tính:</strong> {sex ? "Nam" : "Nữ"}</p>
                <p className="veterian-detail"><strong>Số điện thoại:</strong> {phone}</p>
                <p className="veterian-detail"><strong>Kinh nghiệm:</strong> {experience} năm</p>
            </div>
        </div>
    );
}




