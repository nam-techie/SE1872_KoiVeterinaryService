import {Navigate} from 'react-router-dom';
import PropTypes from 'prop-types';

// PublicRoute: Không cho phép bác sĩ truy cập trang công khai
export const PublicRoute = ({ children }) => {
    const role = localStorage.getItem('role')
    console.log(role)
    // Nếu vai trò là doctor, điều hướng đến trang khác (ví dụ: trang dashboard của bác sĩ)
    if (role === 'DOCTOR') {
        return <Navigate to="/doctor/doctor-dashboard" />;
    }

    // Nếu không phải doctor, cho phép truy cập trang công khai
    return children;
};

// Xác định kiểu của prop "children" cho PublicRoute
PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

// RestrictedRoute: Chỉ cho phép truy cập nếu chưa có token
export const RestrictedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('role')
    console.log(role)
     // Lấy role từ localStorage
    // Nếu đã có token và role là DOCTOR, điều hướng về dashboard của doctor

    if (token) {
        if(role === 'DOCTOR'){
            return <Navigate to="/doctor/doctor-dashboard" />;
        }else if( role === 'CUSTOMER'){
            return <Navigate to="/homepage"/>
        }

    }

    // Nếu đã có token nhưng role không phải DOCTOR, điều hướng về /homepage

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
    const role = localStorage.getItem('role')
    console.log(role)

    // Nếu không có token hoặc vai trò không hợp lệ
    if (!token || !allowedRoles.includes(role)) {
        // Điều hướng khác nhau dựa trên vai trò người dùng
        if (role === 'DOCTOR') {
            return <Navigate to="/doctor/doctor-dashboard" />;
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
