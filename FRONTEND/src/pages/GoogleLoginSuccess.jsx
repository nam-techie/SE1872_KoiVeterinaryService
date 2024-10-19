import styles from '../styles/GoogleLoginSuccess.module.css';
import {useTokenHandler} from "../hooks/useLogin.js";

const GoogleLoginSuccess = () => {
    useTokenHandler();

    return (
        <div className={styles.googleLoginSuccessContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Đang xử lý đăng nhập Google...</p>
        </div>
    );
};

export default GoogleLoginSuccess;
