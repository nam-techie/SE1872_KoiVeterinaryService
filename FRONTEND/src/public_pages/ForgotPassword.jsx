// // import { useForgotPassword } from '../hooks/useForgotPassword.js';
// // import '../styles/ForgotPassword.css';
// // import { useNavigate } from 'react-router-dom';
//
// function ForgotPassword() {
//     // const { email, setEmail, loading, error, handleSendEmail } = useForgotPassword();
//     // const navigate = useNavigate();
//     //
//     // const handleSubmit = async (e) => {
//     //     const success = await handleSendEmail(e);
//     //     if (success) {
//     //         navigate('/verify-otp', { state: { email } }); // Chuyển tới trang verify OTP
//     //     }
//     // };
//
//     return (
//         <div className="forgot-password-container">
//             <form onSubmit={handleSubmit}>
//                 <h2>Quên mật khẩu</h2>
//                 <p>Hãy nhập email của bạn để đặt lại mật khẩu: </p>
//                 {error && <p className="error-message">{error}</p>}
//                 <input
//                     type="email"
//                     placeholder="Nhập email của bạn"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Đang xử lý...' : 'Gửi email xác nhận'}
//                 </button>
//             </form>
//         </div>
//     );
// }
//
// export default ForgotPassword;
