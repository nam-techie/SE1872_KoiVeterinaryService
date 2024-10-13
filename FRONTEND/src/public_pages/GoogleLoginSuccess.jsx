import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GoogleLoginSuccess.css';

const GoogleLoginSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy token từ query string
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        console.log("Query String:", window.location.search);
        console.log("Token:", token);

        if (token) {
            // Lưu token vào localStorage
            localStorage.setItem('authToken', token);

            // Chuyển hướng người dùng đến trang chính (homepage)
            navigate('/homepage');
        } else {
            // Xử lý khi không có token trong query string
            console.error('Không có token trong query string');
        }
    }, [navigate]);


    return (
        <div className="google-login-success-container">
            <div className="loading-spinner"></div>
            <p>Đang xử lý đăng nhập Google...</p>
        </div>
    );
};

export default GoogleLoginSuccess;
