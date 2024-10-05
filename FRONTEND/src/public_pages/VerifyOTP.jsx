import { useVerifyOTP } from '../hooks/useVerifiOTP.js';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/VerifyOTP.css';

function VerifyOTP() {
    // const { otp, setOtp, email, setEmail, loading, error, handleVerifyOTP } = useVerifyOTP();
    // const location = useLocation();
    // const navigate = useNavigate();
    //
    // // Lấy email từ trang trước
    // useEffect(() => {
    //     if (location.state && location.state.email) {
    //         setEmail(location.state.email);
    //     }
    // }, [location]);
    //
    // const handleSubmit = async (e) => {
    //     const success = await handleVerifyOTP(e);
    //     if (success) {
    //         navigate('/reset-password', { state: { email } }); // Chuyển tới trang reset password
    //     }
    // };

    return (
        <></>
        // <div className="verify-otp-container">
        //     {/*<form onSubmit={handleSubmit}>*/}
        //         <h2>Xác thực OTP</h2>
        //         {error && <p className="error-message">{error}</p>}
        //         <input
        //             type="text"
        //             placeholder="Nhập mã OTP"
        //             value={otp}
        //             onChange={(e) => setOtp(e.target.value)}
        //             required
        //         />
        //         <button type="submit" disabled={loading}>
        //             {loading ? 'Đang xử lý...' : 'Xác nhận OTP'}
        //         </button>
        //     {/*</form>*/}
        // </div>
    );
}

export default VerifyOTP;
