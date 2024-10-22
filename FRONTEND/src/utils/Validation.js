import{ useState, useEffect } from 'react'; // Ensure you import React
import {jwtDecode} from "jwt-decode";

export const useAuthValidation = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp && decoded.exp < currentTime) {
                    handleLogout();
                } else {
                    setUsername(decoded.sub);
                    setRole(decoded.role);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                handleLogout();
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/homepage";
    };

    return {
        username,
        role,
        isLoggedIn,
        handleLogout,
    };
};

