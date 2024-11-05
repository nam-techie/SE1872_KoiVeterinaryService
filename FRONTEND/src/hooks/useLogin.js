import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import { login } from '../service/apiLogin.js'; // Service đăng nhập



// Hook xử lý login
export const useLogin = () => {
    const [username, setUsername] = useState('');  // Sử dụng username thay vì email
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Ngăn chặn hành vi mặc định của form
        console.log("Form submitted with:", { username, password });  // Log kiểm tra form

        setLoading(true);
        setError('');  // Reset lỗi trước khi thực hiện đăng nhập

        try {
            // Gọi API đăng nhập thực sự
            const response = await login(username, password);  // Gọi API từ apiLogin.js
            console.log('Đăng nhập thành công:', response);  // Hiển thị dữ liệu trả về từ server

            // Lưu thông tin đăng nhập
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('role', response.role);

            // Chuyển hướng đến LoadingCat
            navigate('/loading');

            setTimeout(() => {
                navigate('/homepage')
            }, 3000);

        } catch (error) {
            // Chỉ lấy message lỗi trực tiếp từ backend
            setError(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Chuyển hướng người dùng tới backend để bắt đầu quá trình đăng nhập Google
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return {
        username,
        setUsername,
        password,
        setPassword,
        loading,
        error,
        handleSubmit,
        handleGoogleLogin,
    };
};


// Hook xử lý token và username sau khi Google login thành công
export const useTokenHandler = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Lấy token, username và role từ query string trong URL
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const username = params.get('username'); // Lấy username từ query string
        const role = params.get('role'); // Lấy role từ query string

        console.log("Query String:", location.search);
        console.log("Token:", token);
        console.log("Username:", username);
        console.log("Role:", role);

        if (username && localStorage.getItem('username') !== username) {
            // Chỉ lưu username nếu nó chưa tồn tại trong localStorage
            localStorage.setItem('username', username);

            console.log("Username được lưu:", username);
        }

        if (role) {
            // Lưu role vào localStorage
            localStorage.setItem('role', role);
        }

        if (token && localStorage.getItem('authToken') !== token) {
            // Chỉ lưu token nếu nó chưa tồn tại trong localStorage
            localStorage.setItem('authToken', token);

            // Kiểm tra role và chuyển hướng tương ứng
            if (role === 'ADMIN') {
                navigate('/dashboard');
            } else {
                navigate('/homepage');
            }
        } else if (!token) {
            // Xử lý khi không có token trong query string
            console.error('Không có token trong query string');
        }
    }, [navigate, location]);  // Đảm bảo chỉ chạy khi `location` hoặc `navigate` thay đổi
};

export const handleLogout = () => {

    localStorage.clear();

    
    window.location.href = "/homepage";
};



