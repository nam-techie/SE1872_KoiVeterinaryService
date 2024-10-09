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
      // Sử dụng hàm đã tách để lấy dữ liệu từ file JSON
      const data = await login();

      // Kiểm tra nếu data là một mảng
      if (Array.isArray(data)) {
        // Tìm kiếm người dùng với username và password khớp
        const foundUser = data.find(
            (user) => user.username === username && user.password === password
        );

        if (foundUser) {
          console.log('Đăng nhập thành công:', foundUser);
          // Giả lập việc lưu token vào localStorage
          localStorage.setItem('authToken', 'fakeAuthToken123');
          window.location.href = '/homepage';
        } else {
          throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
        }
      } else {
        throw new Error('Dữ liệu người dùng không hợp lệ.');
      }
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
