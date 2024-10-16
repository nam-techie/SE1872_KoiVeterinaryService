import { useForgotPassword } from '../hooks/useResetPassword.js';
import '../styles/ForgotPassword.css';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const { email, setEmail, loading, error, handleSendEmail } = useForgotPassword();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Ngăn chặn hành vi mặc định của form
        const success = await handleSendEmail();  // Gọi hàm gửi email
        if (success) {
            // navigate(`/verify-otp?email=${encodeURIComponent(email)}`); // hiển thị mail ở URL
            navigate('/verify-otp', { state: { email } }); // Chuyển tới trang verify OTP nếu thành công
        }
    };

    return (
        <div className="forgot-password-container">
            <form onSubmit={handleSubmit}>
                <h2>Quên mật khẩu</h2>
                <p>Hãy nhập email của bạn để đặt lại mật khẩu:</p>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
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
                <div className="form-group">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Vui lòng kiểm tra email của bạn' : 'Gửi email xác nhận'}
                    </button>
                </div>

            </form>
        </div>
    );
}

// Đảm bảo bạn có dòng xuất mặc định này
export default ForgotPassword;