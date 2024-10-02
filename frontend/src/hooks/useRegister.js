import { useState } from 'react';
import { register } from '../services/apiRegister.js'; // Service đăng ký

export const useRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(''); // Trạng thái lỗi

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await register(username, email, password); // Gọi API đăng ký
      console.log('Đăng ký thành công:', response);
      window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập sau khi thành công
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng ký:', error);
      setError('Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  };
};