import {useState} from 'react';
import {register} from '../service/apiRegister.js'; // Service đăng ký

export const useRegister = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    // State quản lý thông báo lỗi riêng cho từng trường
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    // Hàm kiểm tra độ dài username khi thay đổi
    const handleUsernameChange = (value) => {
        setUsername(value);
        if (value.length < 6) {
            setUsernameError('Tên đăng ký phải có ít nhất 6 ký tự');
        } else {
            setUsernameError('');
        }
    };

    // Hàm kiểm tra độ dài password khi thay đổi
    const handlePasswordChange = (value) => {
        setPassword(value);
        if (value.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
        } else {
            setPasswordError('');
        }
        // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
        setPasswordsMatch(value === confirmPassword);
    };

    // Hàm xử lý thay đổi confirmPassword và kiểm tra khớp
    const handleConfirmPasswordChange = (value) => {
        setConfirmPassword(value);
        setPasswordsMatch(password === value);
    };

    // Hàm kiểm tra form và xử lý submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // Chỉ validate mật khẩu trùng khớp ở frontend
        if (password !== confirmPassword) {
            setError('Mật khẩu không trùng khớp.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await register(username, email, password, confirmPassword);
            console.log('Đăng ký thành công:', response);
            window.location.href = '/login';
        } catch (error) {
            // Lấy message lỗi trực tiếp từ response của backend
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        username,
        setUsername: handleUsernameChange,
        email,
        setEmail,
        password,
        setPassword: handlePasswordChange,
        confirmPassword,
        setConfirmPassword: handleConfirmPasswordChange,
        passwordsMatch,
        loading,
        error,
        usernameError,
        passwordError,
        handleFormSubmit,
    };
};
