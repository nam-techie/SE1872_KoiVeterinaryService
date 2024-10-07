import '../styles/Register.css';
import { useRegister } from '../hooks/useRegister.js';

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

  // Kiểm tra xem trường hợp input hợp lệ hay không
  const getInputClass = (hasError, value) => {
    if (hasError) {
      return 'error-input';
    } else if (value && !hasError) {
      return 'valid-input';
    }
    return '';
  };

  return (
      <div className="register-container">
        <form className="register-form" onSubmit={handleFormSubmit}>
          <h2>Đăng ký</h2>

          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label>Tên Đăng Kí: </label>
            <input
                type="text"
                placeholder="Tên đăng kí"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={getInputClass(usernameError, username)}
                required
            />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>

          <div className="form-group">
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

          <div className="form-group">
            <label>Mật khẩu: </label>
            <input
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={getInputClass(passwordError, password)}
                required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>

          <div className="form-group">
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
                <p className="error-message">Mật khẩu không khớp</p>
            )}
          </div>

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng ký'}
          </button>

          <div className="login">
            <span>Bạn đã có tài khoản? </span>
            <a href="/login">Đăng nhập</a>
          </div>
        </form>
      </div>
  );
}

export default Register;
