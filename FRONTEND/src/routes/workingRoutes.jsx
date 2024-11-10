import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Hàm helper để lấy role từ token
const getRoleFromToken = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  
  try {
    const jwt_decode = (await import('jwt-decode')).default; // Dynamically import jwt-decode
    const decoded = jwt_decode(token);
    return decoded.role;
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};


// PublicRoute: Không cho phép bác sĩ truy cập trang công khai
export const PublicRoute = ({ children }) => {
    const tokenRole = getRoleFromToken();

    if (tokenRole === 'VETERINARY') {
        return <Navigate to="/doctor/dashboard" />;
    }
    if (tokenRole === 'ADMIN') {
        return <Navigate to="/admin" />;
    }

    return children;
};

// RestrictedRoute: Chỉ cho phép truy cập nếu chưa có token
export const RestrictedRoute = ({ children }) => {
    const token = localStorage.getItem('authToken');
    const tokenRole = getRoleFromToken();

    if (token && tokenRole === 'VETERINARY') {
        return <Navigate to="/doctor/doctor-dashboard" />;
    }

    if (token && tokenRole === 'CUSTOMER') {
        return <Navigate to="/homepage" />;
    } 
    
    if (token && tokenRole === 'ADMIN') {
        return <Navigate to="/admin" />;
    }

    return children;
};



// RoleBasedRoute: Yêu cầu token và vai trò phù hợp để truy cập
export const RoleBasedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('authToken');
    const tokenRole = getRoleFromToken();
    console.log(tokenRole);

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(tokenRole)) {
        if (tokenRole === 'VETERINARY') {
            return <Navigate to="/doctor/doctor-dashboard" />;
        } else if (tokenRole === 'ADMIN') {
            return <Navigate to="/admin" />;
        } else if (tokenRole === 'CUSTOMER') {
            return <Navigate to="/homepage" />;
        } else {
            console.log("looix");

            return <Navigate to="/login" />;
        }
    }

    return children;
};

// PropTypes definitions
PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

RestrictedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};



RoleBasedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
