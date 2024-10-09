// import { useResetPassword } from '../hooks/useResetPassword.js';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../styles/ResetPassword.css';
//
// function ResetPassword() {
//     // const { password, setPassword, email, setEmail, loading, error, handleResetPassword } = useResetPassword();
//     // const location = useLocation();
//     // const navigate = useNavigate();
//     //
//     // // Lấy email đã xác thực từ trang trước
//     // useEffect(() => {
//     //     if (location.state && location.state.email) {
//     //         setEmail(location.state.email);
//     //     }
//     // }, [location]);
//
//     // const handleSubmit = async (e) => {
//     //     const success = await handleResetPassword(e);
//     //     if (success) {
//     //         navigate('/login'); // Chuyển tới trang login sau khi đặt lại mật khẩu thành công
//     //     }
//     // };
//
//     return (
//         <div className="reset-password-container">
//             <form onSubmit={handleSubmit}>
//                 <h2>Đặt lại mật khẩu</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 <input
//                     type="password"
//                     placeholder="Nhập mật khẩu mới"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit" disabled={loading}>
//                     {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
//                 </button>
//             </form>
//         </div>
//     );
// }
//
// export default ResetPassword;
