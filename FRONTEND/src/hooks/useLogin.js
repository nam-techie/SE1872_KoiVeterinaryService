import {useState} from 'react';
import {login} from '../services/apiLogin.js'; // Service đăng nhập

import axios from 'axios';  // Sử dụng cho Google Login

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
