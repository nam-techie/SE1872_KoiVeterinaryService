
import { useServiceBookingData } from '../hooks/useService.js';
import BookingCard from './BookingCard.jsx';
import '../styles/BookingServiceHistory.css';

function BookingServiceHistory() {
    const { services, loading, error } = useServiceBookingData();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {services.map((service) => (
                <BookingCard
                    key={service.id}
                    serviceName={service.serviceName}
                    description={service.description}
                    image={service.image}
                    date={service.date}
                    time={service.time}
                    status={service.status}
                />
            ))}
        </>


    );
}

export default BookingServiceHistory;