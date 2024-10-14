import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateOtp } from '../services/apiForgotPassword.js';
import '../styles/VerifyOTP.css';

function VerifyOTP() {
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

    return (
        <div className="verify-otp-container">
            <form className="verify-otp-form" onSubmit={handleSubmit}>
                <h2>Nhập Mã OTP</h2>

                {error && (
                    <div className="error-message">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="error-icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <div className="input-field">
                    {otpArray.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleOtpChange(e.target, index)}
                            onFocus={(e) => e.target.select()} // Chọn tất cả nội dung khi focus
                            required
                        />
                    ))}
                </div>

                <button type="submit" className="verify-otp-button" disabled={loading || otpArray.includes('')}>
                    {loading ? 'Đang xử lý...' : 'Xác thực OTP'}
                </button>
            </form>
        </div>
    );
}

export default VerifyOTP;