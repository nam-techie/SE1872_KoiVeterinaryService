
import { useLocation, Navigate } from 'react-router-dom';
import Footer from './Footer.jsx';

function Layout({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage

    // Danh sách các đường dẫn yêu cầu token để truy cập
    const protectedPaths = [
        '/bookingpage',
        '/booking-service-history'
    ];

    // Kiểm tra nếu đường dẫn hiện tại nằm trong danh sách cần bảo vệ mà không có token
    const isProtectedPath = protectedPaths.includes(location.pathname);
    if (isProtectedPath && !token) {
        return <Navigate to="/login" />;
    }

    // Danh sách các đường dẫn không hiển thị footer
    const pathsWithoutFooter = [
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
        '/verify-otp',
        '/bookingpage',
        '/booking-service-history'
    ];

    return (
        <>
            <div>{children}</div>
            {/* Hiển thị Footer nếu đường dẫn hiện tại không nằm trong danh sách pathsWithoutFooter */}
            {!pathsWithoutFooter.includes(location.pathname) && <Footer />}
        </>
    );
}

export default Layout;
