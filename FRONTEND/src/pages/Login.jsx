import { useLogin } from '../hooks/useLogin.js';
import styles from '../styles/Login.module.css'; // Đảm bảo đường dẫn đúng
import { FcGoogle } from "react-icons/fc";
import { CustomerNavBar } from "../components/Navbar.jsx";
import LoadingCat from '../components/LoadingCat.jsx'; // Import LoadingCat

function Login() {
    const {
        username,
        password,
        loading,
        error,
        setUsername,
        setPassword,
        handleSubmit,
        handleGoogleLogin
    } = useLogin();

    return (
        <>
            <CustomerNavBar />
            <div className={styles.loginContainer}>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <h2>Đăng nhập</h2>

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
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <a href="/forgot-password" className={styles.forgotPassword}>Quên mật khẩu?</a>
                    </div>

                    <button type="submit" className={styles.loginButton} disabled={loading}>
                        {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>

                    <div className={styles.register}>
                        <span>Bạn chưa có tài khoản? </span>
                        <a href="/register">Đăng ký</a>
                    </div>

                    <div className={styles.orLoginWith}>
                        <span>Hoặc đăng nhập</span>
                    </div>

                    <div className={styles.googleLogin}>
                        <button
                            type="button"
                            className={styles.googleButton}
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <FcGoogle
                                size={24}
                                style={{ marginRight: '10px' }}
                            />
                            {loading ? 'Đang xử lý...' : 'Đăng nhập với Google'}
                        </button>
                    </div>
                </form>

                {/* Hiển thị LoadingCat khi đang loading */}
                {loading && <LoadingCat />}
            </div>
        </>
    );
};

export default Login;
