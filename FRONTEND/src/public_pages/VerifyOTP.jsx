
import '../styles/VerifyOTP.css';
import {useOtp} from "../hooks/useResetPassword.js";

function VerifyOTP() {
    const { otpArray, handleOtpChange, handleSubmit, error, loading } = useOtp();

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