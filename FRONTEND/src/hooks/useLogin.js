import { useState } from 'react';
import { login } from '../services/apiLogin.js'; // Service đăng nhập

export const useLogin = () => {
  const [username, setUsername] = useState(''); // Sử dụng username thay vì email
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');


    try {
      const response = await login(username, password); // Gọi API đăng nhập với username
      console.log('Đăng nhập thành công:', response);
      localStorage.setItem('authToken', response.token);
      window.location.href = '/homepage'; // Chuyển hướng đến trang chính sau khi thành công
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng nhập:', error);
      setError(error.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Thực hiện đăng nhập với Google (nếu có)
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
    handleGoogleLogin
  };
};
