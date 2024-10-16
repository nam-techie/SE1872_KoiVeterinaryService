import { useLocation, Navigate } from 'react-router-dom';
import Footer from './Footer.jsx';
// Giả sử bạn đã import Navbar ở đây
import Navbar from './Navbar.jsx';

function Layout({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage

    // Danh sách các đường dẫn yêu cầu token để truy cập
    const protectedPaths = [
        '/bookingpage',
        '/booking-service-history'
    ];

    // Danh sách các đường dẫn không cho phép truy cập nếu đã đăng nhập
    const restrictedPaths = [
        '/login',
        '/register'
    ];

    // Kiểm tra nếu đường dẫn hiện tại nằm trong danh sách cần bảo vệ mà không có token
    const isProtectedPath = protectedPaths.includes(location.pathname);
    if (isProtectedPath && !token) {
        return <Navigate to="/login" />;
    }

    // Kiểm tra nếu người dùng đã đăng nhập và cố gắng truy cập vào các trang hạn chế
    const isRestrictedPath = restrictedPaths.includes(location.pathname);
    if (isRestrictedPath && token) {
        return <Navigate to="/homepage" />; // Hoặc đường dẫn bạn muốn chuyển hướng đến
    }

    // Danh sách các đường dẫn không hiển thị navbar
    const pathsWithoutNavbar = ['/dashboard'];

    // Danh sách các đường dẫn không hiển thị footer
    const pathsWithoutFooter = [
        '/forgot-password',
        '/reset-password',
        '/verify-otp',
        '/bookingpage',
        '/booking-service-history',
        '/profile',
        '/update-profile',
        '/dashboard'
    ];

    return (
        <>
            {/* Hiển thị Navbar nếu đường dẫn hiện tại không nằm trong danh sách pathsWithoutNavbar */}
            {!pathsWithoutNavbar.includes(location.pathname) && <Navbar />}
            <div>{children}</div>
            {/* Hiển thị Footer nếu đường dẫn hiện tại không nằm trong danh sách pathsWithoutFooter */}
            {!pathsWithoutFooter.includes(location.pathname) && <Footer />}
        </>
    );
}

export default Layout;
