import {useLogin} from '../hooks/useLogin.js';
import '../styles/Login.css';

import { FcGoogle } from "react-icons/fc";


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

    // // Xử lý khi đăng nhập Google thành công
    // const handleGoogleSuccess = async (response) => {
    //     const { tokenId } = response;
    //     handleGoogleLogin(tokenId);  // Gửi tokenId để xử lý bên backend
    // };
    //
    // // Xử lý khi đăng nhập Google thất bại
    // const handleGoogleFailure = (response) => {
    //     console.error('Lỗi khi đăng nhập Google:', response);
    //     setError('Đăng nhập Google thất bại.');
    // };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Đăng nhập</h2>

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

                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mật khẩu: </label>
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <a href="/forgot-password" className="forgot-password">Quên mật khẩu?</a>
                </div>

                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                </button>

                <div className="register">
                    <span>Bạn chưa có tài khoản? </span>
                    <a href="/register">Đăng ký</a>
                </div>

                <div className="or-login-with">
                    <span>Hoặc đăng nhập</span>
                </div>


                <div className="google-login">
                    <button
                        type="button"
                        className="google-button"
                        onClick={handleGoogleLogin}
                        disabled={loading}
                    >
                        <FcGoogle
                            size={24}
                            style={{ marginRight: '10px' }}
                        /> {/* Kích thước icon Google */}
                        {loading ? 'Đang xử lý...' : 'Đăng nhập với Google'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
