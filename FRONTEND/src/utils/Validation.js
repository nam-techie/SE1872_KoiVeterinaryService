import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

export const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};
// Hàm giải mã JWT token và trả về payload chứa trong token
export const decodeToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return null; // Kiểm tra nếu token là null

    try {
        // Giải mã token và trả về payload
        return jwtDecode(token);
    } catch (error) {
        console.error("Invalid token", error);
        return null;
    }
};




export const useAuthValidation = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const storedUsername = localStorage.getItem('username');
        const storedRole = localStorage.getItem('role');

        if (token && storedUsername && storedRole) {
            setUsername(storedUsername);
            setRole(storedRole);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            if (window.location.pathname !== "/login" && window.location.pathname !== "/homepage") {
                handleLogout();
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/homepage");
    };

    return {
        username,
        role,
        isLoggedIn,
        handleLogout,
    };
};
