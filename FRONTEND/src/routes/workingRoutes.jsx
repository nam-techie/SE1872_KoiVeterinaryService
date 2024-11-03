import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

// PublicRoute: Không cho phép bác sĩ truy cập trang công khai
export const PublicRoute = ({ children }) => {
    const role = localStorage.getItem('role')?.trim();  // Lưu vai trò của người dùng và loại bỏ khoảng trắng

    // Nếu vai trò là doctor hoặc admin, điều hướng đến trang dashboard của họ
    if (role === 'VETERINARY') {
        return <Navigate to="/doctor/dashboard" />;
    }
    if (role === 'ADMIN') {
        return <Navigate to="/admin" />;
    }

    // Nếu không phải doctor hoặc admin, cho phép truy cập trang công khai
    return children;
};

// Xác định kiểu của prop "children" cho PublicRoute
PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

// RestrictedRoute: Chỉ cho phép truy cập nếu chưa có token
export const RestrictedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
    const role = localStorage.getItem('role'); // Lấy role từ localStorage

    // Nếu đã có token và role là DOCTOR, điều hướng về dashboard của doctor
    if (token && role === 'VETERINARY') {
        return <Navigate to="/doctor/doctor-dashboard" />;
    }

    // Nếu đã có token và role là ADMIN, điều hướng về dashboard của admin
    if (token && role === 'ADMIN') {
        return <Navigate to="/admin" />;
    }

    // Nếu không có token, cho phép truy cập trang Restricted
    return children;
};

// Xác định kiểu của prop "children" cho RestrictedRoute
RestrictedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

// PrivateRoute: Yêu cầu token để truy cập
export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');

    // Nếu không có token, điều hướng về trang đăng nhập
    return token ? children : <Navigate to="/login" />;
};

// Xác định kiểu của prop "children" cho PrivateRoute
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

// RoleBasedRoute: Yêu cầu token và vai trò phù hợp để truy cập
export const RoleBasedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('role')?.trim();  // Lấy vai trò của người dùng và loại bỏ khoảng trắng

    // Nếu không có token hoặc vai trò không hợp lệ
    if (!token || !allowedRoles.includes(userRole)) {
        // Điều hướng khác nhau dựa trên vai trò người dùng
        if (userRole === 'VETERINARY') {
            return <Navigate to="/doctor/doctor-dashboard" />;
        } else if (userRole === 'ADMIN') {
            return <Navigate to="/admin" />;
        } else {
            return <Navigate to="/login" />;
        }
    }

    // Nếu người dùng có vai trò hợp lệ, trả về component con (children)
    return children;
};

// Xác định kiểu của prop "children" và "allowedRoles" cho RoleBasedRoute
RoleBasedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
