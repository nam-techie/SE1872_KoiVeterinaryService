import "../styles/BookingServiceHistory.css";

export function BookingHistoryDataCard({ serviceName, description, image, date, time, status }) {
    return (
        <div className="card-booking-service">
            <img className="card-image-booking-service" src={image} alt={serviceName} />
            <h2 className="card-title-booking-service">{serviceName}</h2>
            <p className="card-text-booking-service">{description}</p>
            <p className="card-text-booking-service">Ngày: {date}</p>
            <p className="card-text-booking-service">Thời gian: {time}</p>
            <p className="card-text-booking-service">Trạng thái: {status}</p>
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




