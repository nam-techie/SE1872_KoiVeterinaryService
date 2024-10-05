import { useState } from 'react';
import { register } from '../services/apiRegister.js'; // Service đăng ký

export const useRegister = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Thêm confirmPassword
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(''); // Trạng thái lỗi
  const [passwordsMatch, setPasswordsMatch] = useState(true); // Trạng thái mật khẩu có khớp không

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có trùng khớp không
    if (password !== confirmPassword) {
      setError('Mật khẩu và Xác nhận mật khẩu không trùng khớp.');
      setLoading(false);
      return;
    }

    console.log('Đang gửi dữ liệu:', { username, email, password });

    try {
      const response = await register(username, email, password); // Gọi API đăng ký
      console.log('Đăng ký thành công:', response);
      window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập sau khi thành công
    } catch (error) {
      console.error('Đã xảy ra lỗi khi đăng ký:', error);
      setError(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  // Kiểm tra sự thay đổi của trường confirmPassword ngay khi gõ
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordsMatch(password === value); // Cập nhật trạng thái khớp của mật khẩu
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword: handleConfirmPasswordChange, // Thay đổi hàm setConfirmPassword
    passwordsMatch, // Trả về trạng thái mật khẩu có khớp không
    loading,
    error,
    handleSubmit,
  };
};
