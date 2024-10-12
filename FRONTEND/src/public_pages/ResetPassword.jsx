import { useResetPassword } from '../hooks/useResetPassword.js';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ResetPassword.css';

function ResetPassword() {
    const { password, confirmPassword, setPassword, setConfirmPassword, loading, error, handleResetPassword } = useResetPassword();
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email; // Lấy email từ state truyền từ trang trước

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        const success = await handleResetPassword(email); // Gọi hàm đặt lại mật khẩu với email
        if (success) {
            navigate('/login'); // Điều hướng tới trang login nếu đặt lại thành công
        }
    };

    return (
        <div className="reset-password-container">
            <form onSubmit={handleSubmit} className="reset-password-form">
                <h2>Đặt lại mật khẩu</h2>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                <div className="form-group">
                    <label  htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Nhập mật khẩu mới"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="reset-password-button" disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
