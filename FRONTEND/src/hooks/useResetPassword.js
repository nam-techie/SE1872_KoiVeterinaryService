import { useState } from 'react';
import { resetPassword,forgotPassword,validateOtp} from '../services/apiResetPassword.js';
import {useLocation,useNavigate} from "react-router-dom";

export const useResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');  // Thêm confirmPassword
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleResetPassword = async (email) => {
        setLoading(true);
        setError('');
        try {
            // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp không trước khi gửi
            if (password.length <= 5) {
                setError('Mật khẩu phải trên 6 kí tự!');
                return false;
            }
            if (password !== confirmPassword) {
                setError('Mật khẩu và xác nhận mật khẩu không khớp!');
                return false;
            }

            await resetPassword({ email, password, confirmPassword});
            return true;
        } catch (err) {
            setError(err.response?.data || 'Có lỗi xảy ra khi đặt lại mật khẩu.');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        password,
        setPassword,
        confirmPassword,  // Trả về confirmPassword
        setConfirmPassword,  // Trả về setConfirmPassword
        loading,
        error,
        handleResetPassword
    };
};

export const useForgotPassword = () => {
    const [email, setEmail] = useState('');  // Lưu trữ email của người dùng
    const [loading, setLoading] = useState(false);  // Trạng thái loading khi đang xử lý yêu cầu
    const [error, setError] = useState('');  // Lưu trữ lỗi khi có lỗi xảy ra

    // useForgotPassword.js
    const handleSendEmail = async () => {
        setLoading(true);
        setError('');

        try {
            await forgotPassword(email);
            console.log("Email đã được gửi thành công.");
            return true;
        } catch (err) {
            setError(err.response?.data || "Có lỗi xảy ra.");
            return false;
        } finally {
            setLoading(false);
        }
    };


    return {
        email,
        setEmail,
        loading,
        error,
        handleSendEmail,
    };
};

export const useOtp = () => {
    const [otpArray, setOtpArray] = useState(new Array(6).fill('')); // Mảng lưu trữ 6 ô input
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email; // Lấy email từ state khi navigate từ trang trước

    // Xử lý khi người dùng nhập vào từng ô input
    const handleOtpChange = (element, index) => {
        const value = element.value.replace(/\D/, ''); // Chỉ cho phép số
        if (value.length <= 1) {
            const newOtpArray = [...otpArray];
            newOtpArray[index] = value;
            setOtpArray(newOtpArray);

            // Tự động chuyển sang ô tiếp theo khi nhập xong 1 ký tự
            if (value && element.nextElementSibling) {
                element.nextElementSibling.focus();
            }
        }
    };

    // Xử lý gửi OTP khi người dùng submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const otp = otpArray.join(''); // Gộp 6 ô input thành một chuỗi OTP
        try {
            await validateOtp(email, otp); // Gọi API validate OTP
            navigate('/reset-password', { state: { email } }); // Chuyển sang trang đặt lại mật khẩu
        } catch (err) {
            setError(err.response?.data || "OTP không hợp lệ.");
        } finally {
            setLoading(false);
        }
    };

    return {
        otpArray,
        handleOtpChange,
        handleSubmit,
        error,
        loading,
    };
};

export default useOtp;