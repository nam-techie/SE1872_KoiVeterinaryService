import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from '../styles/GoogleLoginSuccess.module.css';

const GoogleLoginSuccess = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const error = urlParams.get('error');
        const token = urlParams.get('token');
        const username = urlParams.get('username');
        const role = urlParams.get('role');

        // Kiểm tra nếu có lỗi tài khoản bị vô hiệu hóa
        if (error === 'disabled') {
            toast.error('Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ admin để được hỗ trợ.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            navigate('/login');
            return;
        }

        // Kiểm tra xem có đủ thông tin không
        if (token && username && role) {
            // Lưu thông tin vào localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);

            // Chuyển hướng về trang chủ sau 1 giây
            setTimeout(() => {
                navigate('/homepage');
            }, 1000);
        } else {
            // Nếu thiếu thông tin, chuyển về trang login
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className={styles.googleLoginSuccessContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Đang xử lý đăng nhập Google...</p>
        </div>
    );
};

export default GoogleLoginSuccess;