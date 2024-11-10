import { useForgotPassword } from '../hooks/useResetPassword.js';
import styles from '../styles/ForgotPassWord.module.css';  // Import đúng với module.css
import { useNavigate } from 'react-router-dom';
import {CustomerNavBar} from "../components/Navbar.jsx";

function ForgotPassword() {
    const { email, setEmail, loading, error, handleSendEmail } = useForgotPassword();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await handleSendEmail();
        if (success) {
            navigate('/verify-otp', { state: { email } });
        }
    };

    return (
        <>
            <CustomerNavBar/>
            <div className={styles.forgotPasswordContainer}>
                <form onSubmit={handleSubmit}>
                    <h2>Quên mật khẩu</h2>
                    <p>Hãy nhập email của bạn để đặt lại mật khẩu:</p>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email của bạn:</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Vui lòng kiểm tra email của bạn' : 'Gửi email xác nhận'}
                        </button>
                    </div>
                </form>
            </div>

        </>

    );
}

export default ForgotPassword;
