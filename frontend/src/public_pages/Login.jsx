import { useLogin } from '../hooks/useLogin.js'; 
import '../styles/Login.css'; 

function Login() {
  const {
    email,
    password,
    loading,
    error,
    setEmail,
    setPassword,
    handleSubmit,
    handleGoogleLogin
  } = useLogin();  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>

        {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi nếu có */}

        <div className="form-group">
          <label>Tên Đăng Nhập: </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button type="button" className="google-button" onClick={handleGoogleLogin} disabled={loading}>
            <img src="src/assets/images/gmaillogo.png" alt="Google Logo" />  
            {loading ? 'Đang xử lý...' : 'Đăng nhập với Google'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
