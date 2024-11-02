import styles from '../styles/Register.module.css'; // Đảm bảo đường dẫn đúng
import { useRegister } from '../hooks/useRegister.js';
import {CustomerNavBar} from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import ContactButton from "../components/ContactButton.jsx";

function Register() {
    const {
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        passwordsMatch,
        loading,
        error,
        usernameError,
        passwordError,
        handleFormSubmit,
    } = useRegister();

    const getInputClass = (hasError, value) => {
        if (hasError) {
            return styles.errorInput;
        } else if (value && !hasError) {
            return styles.validInput; // Nếu cần có class cho input hợp lệ
        }
        return '';
    };

    return (
        <>
            <CustomerNavBar/>
            <div className={styles.registerContainer}>
                <form className={styles.registerForm} onSubmit={handleFormSubmit}>
                    <h2>Đăng ký</h2>

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

                    <div className={styles.formGroup}>
                        <label>Tên đăng nhập: </label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={getInputClass(usernameError, username)}
                            required
                        />
                        {usernameError && <p className={styles.errorMessage}>{usernameError}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Email: </label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={getInputClass(false, email)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Mật khẩu: </label>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={getInputClass(passwordError, password)}
                            required
                        />
                        {passwordError && <p className={styles.errorMessage}>{passwordError}</p>}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Xác nhận mật khẩu: </label>
                        <input
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={getInputClass(!passwordsMatch, confirmPassword)}
                            required
                        />
                        {!passwordsMatch && confirmPassword && (
                            <p className={styles.errorMessage}>Mật khẩu không khớp</p>
                        )}
                    </div>

                    <button type="submit" className={styles.registerButton} disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng ký'}
                    </button>

                    <div className={styles.login}>
                        <span>Bạn đã có tài khoản? </span>
                        <a href="/login">Đăng nhập</a>
                    </div>
                </form>
            </div>
            <ContactButton/>
            <Footer/>
        </>

    );
}

export default Register;
