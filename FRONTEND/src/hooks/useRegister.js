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

  // State quản lý thông báo lỗi riêng cho từng trường
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Hàm kiểm tra form và xử lý submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Kiểm tra độ dài username
    if (username.length < 6) {
      setUsernameError('Tên đăng ký phải có ít nhất 6 ký tự');
      hasError = true;
    } else {
      setUsernameError('');
    }

    // Kiểm tra độ dài password
    if (password.length < 6) {
      setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
      hasError = true;
    } else {
      setPasswordError('');
    }

    // Kiểm tra nếu có lỗi, ngừng thực hiện
    if (hasError) return;

    // Kiểm tra xem mật khẩu và xác nhận mật khẩu có trùng khớp không
    if (password !== confirmPassword) {
      setError('Mật khẩu và Xác nhận mật khẩu không trùng khớp.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

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

  // Hàm xử lý thay đổi confirmPassword và kiểm tra khớp
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
    usernameError, // Trả về lỗi username
    passwordError, // Trả về lỗi password
    handleFormSubmit, // Hàm xử lý submit form
  };
};
