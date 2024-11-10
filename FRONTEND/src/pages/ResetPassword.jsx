import { useResetPassword } from '../hooks/useResetPassword.js';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../styles/ResetPassword.module.css';  // Sử dụng module CSS
import { useState, useEffect } from 'react';
import {CustomerNavBar} from "../components/Navbar.jsx";

function ResetPassword() {
    const { password, confirmPassword, setPassword, setConfirmPassword, loading, error, handleResetPassword } = useResetPassword();
    const location = useLocation();
    const navigate = useNavigate();

    const [passwordError, setPasswordError] = useState('Mật khẩu phải dài ít nhất 6 ký tự');
    const [confirmPasswordError, setConfirmPasswordError] = useState('Xác nhận mật khẩu phải giống với mật khẩu');

    useEffect(() => {
        if (password.length >= 6) {
            setPasswordError(null);
        } else if (password.length >= 1){
            setPasswordError('Mật khẩu phải dài ít nhất 6 ký tự');
        }

        if (confirmPassword === password) {
            setConfirmPasswordError(null);
        } else {
            setConfirmPasswordError('Xác nhận mật khẩu phải giống với mật khẩu');
        }
    }, [password, confirmPassword]);

    const email = location.state?.email;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!passwordError && !confirmPasswordError) {
            const success = await handleResetPassword(email);
            if (success) {
                navigate('/login');
            }
        }
    };

    return (
        <>
            <CustomerNavBar/>
            <div className={styles.resetPasswordContainer}>
                <form onSubmit={handleSubmit} className={styles.resetPasswordForm}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}
                    <h2>Đặt lại mật khẩu</h2>
                    {/* Password field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Nhập mật khẩu mới"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && (
                            <div className={styles.errorMessage}>
                                {passwordError}
                            </div>
                        )}
                    </div>
                    {/* Confirm password field */}
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Xác nhận mật khẩu:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {confirmPasswordError && (
                            <div className={styles.errorMessage}>
                                {confirmPasswordError}
                            </div>
                        )}
                    </div>
                    {/* Submit button */}
                    <button type="submit" className={styles.resetPasswordButton} disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                    </button>
                </form>
            </div>
        </>

    );
}

export default ResetPassword;
