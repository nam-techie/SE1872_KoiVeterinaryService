
import { useServiceData } from '../hooks/useServiceData.js';
import Card from './Card.jsx';
import '../styles/BookingServiceHistory.css';

function BookingServiceHistory() {
    const { services, loading, error } = useServiceData();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {services.map((service) => (
                <Card
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
