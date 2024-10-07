// useServiceData.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useServiceData = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Bắt đầu fetch dữ liệu từ /serviceBooking.json');

        axios.get('/serviceBooking.json')
            .then((response) => {
                console.log('HTTP status:', response.status);
                console.log('Dữ liệu tải về:', response.data);
                setServices(response.data);
                setLoading(false);
            })
            .catch((error) => {
                // Log chi tiết lỗi nếu có
                if (error.response) {
                    // Lỗi trả về từ server với mã lỗi cụ thể (4xx, 5xx)
                    console.error('Server trả về lỗi:', error.response.status);
                    console.error('Nội dung lỗi:', error.response.data);
                    setError(`Lỗi HTTP: ${error.response.status}`);
                } else if (error.request) {
                    // Yêu cầu đã được gửi nhưng không có phản hồi
                    console.error('Không có phản hồi từ server:', error.request);
                    setError('Không có phản hồi từ server.');
                } else {
                    // Một lỗi khác xảy ra trong quá trình thiết lập yêu cầu
                    console.error('Lỗi khi cấu hình yêu cầu:', error.message);
                    setError(error.message);
                }
                setLoading(false);
            });
    }, []);

    return { services, loading, error };
};
