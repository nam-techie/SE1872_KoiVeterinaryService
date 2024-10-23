import { useState, useEffect } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import { login } from '../service/apiLogin.js'; // Service đăng nhập
import {decodeToken} from "../utils/Validation.js"

// Hook xử lý login
export const useLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = decodeToken();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted with:", { username, password });
        setLoading(true);
        setError('');


        try {
            // Gọi API đăng nhập
            const response = await login(username, password);
            console.log('Đăng nhập thành công, dữ liệu trả về:', response);

            // Lưu token vào localStorage
            localStorage.setItem('authToken', response.token);

            // Giải mã token và lưu thông tin vào localStorage

            localStorage.setItem('username', token.sub); // Lưu username từ token
            localStorage.setItem('role', token.role);    // Lưu role từ token

            console.log(token);
            // Chuyển hướng đến LoadingCat trước
            navigate('/loading');

            // Điều hướng đến trang tương ứng dựa trên role
            setTimeout(() => {
                if (token.role === 'ADMIN') {
                    navigate('/dashboard');
                } else {
                    navigate('/homepage');
                }
            }, 3000); // Thời gian hiển thị LoadingCat

        } catch (error) {
            setError(error.message || 'Đăng nhập thất bại, hãy thử lại');
        } finally {
            setLoading(false);
        }
    };

    // Hàm xử lý đăng nhập Google
    const handleGoogleLogin = () => {
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
        handleGoogleLogin,  // Trả về hàm xử lý đăng nhập Google
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




