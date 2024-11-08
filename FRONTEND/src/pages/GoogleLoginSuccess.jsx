import { useEffect } from 'react';
import styles from '../styles/GoogleLoginSuccess.module.css';

const GoogleLoginSuccess = () => {
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        const username = queryParams.get('username');
        const role = queryParams.get('role');

        if (token && username && role) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);
            // Chuyển hướng người dùng đến trang chính của ứng dụng
            window.location.href = "/homepage";
        }
    }, []);

    return (
        <div className={styles.googleLoginSuccessContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Đang xử lý đăng nhập Google...</p>
        </div>
    );
};

export default GoogleLoginSuccess;
