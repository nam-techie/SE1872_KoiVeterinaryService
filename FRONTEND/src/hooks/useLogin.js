import {useState,useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {login} from '../services/apiLogin.js'; // Service đăng nhập


export const useLogin = () => {
    const [username, setUsername] = useState('');  // Sử dụng username thay vì email
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();  // Ngăn chặn hành vi mặc định của form
        console.log("Form submitted with:", {username, password});  // Log kiểm tra form

        setLoading(true);
        setError('');  // Reset lỗi trước khi thực hiện đăng nhập

        try {
            // Gọi API đăng nhập thực sự
            const response = await login(username, password);  // Gọi API từ apiLogin.js
            console.log('Đăng nhập thành công, dữ liệu trả về:', response);  // Hiển thị dữ liệu trả về từ server

            // Lưu token vào localStorage nếu cần thiết
            localStorage.setItem('authToken', response.token);
            console.log(response.token);
            localStorage.setItem('username',response.username)

            // Chuyển hướng sau khi đăng nhập thành công
            window.location.href = '/homepage';
        } catch (error) {
            // Hiển thị thông báo lỗi trực tiếp từ backend
            setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);  // Tắt trạng thái loading
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

export const useTokenHandler = () => {
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
            navigate('/homepage'); // Bỏ comment nếu muốn điều hướng người dùng
        } else {
            // Xử lý khi không có token trong query string
            console.error('Không có token trong query string');
        }
    }, [navigate]);
};