
import '../styles/GoogleLoginSuccess.css';
import {useTokenHandler} from "../hooks/useLogin.js";

const GoogleLoginSuccess = () => {
    useTokenHandler();

    return (
        <div className="google-login-success-container">
            <div className="loading-spinner"></div>
            <p>Đang xử lý đăng nhập Google...</p>
        </div>
    );
};

export default GoogleLoginSuccess;