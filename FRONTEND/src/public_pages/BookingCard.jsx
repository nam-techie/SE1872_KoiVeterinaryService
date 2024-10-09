import "../styles/BookingServiceHistory.css";

function BookingCard({ serviceName, description, image, date, time, status }) {
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

export default BookingCard;

