import { useState } from 'react';
import { login } from '../services/apiLogin.js'; // Service đăng nhập
import axios from 'axios';  // Sử dụng cho Google Login

export const useLogin = () => {
    const [username, setUsername] = useState('');  // Sử dụng username thay vì email
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();  // Ngăn chặn hành vi mặc định của form
        console.log("Form submitted with:", { username, password });  // Log kiểm tra form

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
        }  catch (error) {
            // Hiển thị thông báo lỗi trực tiếp từ backend
            setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);  // Tắt trạng thái loading
        }
    };


    // Hàm đăng nhập bằng Google (nếu cần thêm logic sau này)
    const handleGoogleLogin = async (tokenId) => {
        setLoading(true);
        setError('');

        try {
            // Gửi tokenId lên backend để xác thực
            const response = await axios.post('http://localhost:8080/api/google-login', { tokenId });

            // Lưu token trả về từ server vào localStorage
            localStorage.setItem('authToken', response.data.token);

            // Chuyển hướng sau khi đăng nhập thành công
            window.location.href = '/homepage';
        } catch (error) {
            console.error('Lỗi đăng nhập Google:', error);
            setError('Đăng nhập Google thất bại.');
        } finally {
            setLoading(false);
        }
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
