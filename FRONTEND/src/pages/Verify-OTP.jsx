import styles from '../styles/Verify-OTP.module.css'; // Sử dụng module CSS
import {useOtp} from "../hooks/useResetPassword.js";
import {CustomerNavBar} from "../components/Navbar.jsx";

function VerifyOTP() {
    const { otpArray, handleOtpChange, handleSubmit, error, loading } = useOtp();

    return (
        <>
            <CustomerNavBar/>
            <div className={styles.verifyOtpContainer}>
                <form className={styles.verifyOtpForm} onSubmit={handleSubmit}>
                    <h2>Nhập Mã OTP</h2>

                    {error && (
                        <div className={styles.errorMessage}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className={styles.errorIcon}
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

                    <div className={styles.inputField}>
                        {otpArray.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target, index)}
                                onFocus={(e) => e.target.select()}
                                required
                            />
                        ))}
                    </div>

                    <button type="submit" className={styles.verifyOtpButton}
                            disabled={loading || otpArray.includes('')}>
                        {loading ? 'Đang xử lý...' : 'Xác thực OTP'}
                    </button>
                </form>
            </div>
        </>

    );
}

export default VerifyOTP;
