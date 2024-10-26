import { useState, useEffect } from "react";

export const useAuthValidation = () => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const storedUsername = localStorage.getItem("username");
        const storedRole = localStorage.getItem("role");

        if (token) {
            setIsLoggedIn(true);
            if (storedUsername) {
                setUsername(storedUsername);
            }
            if (storedRole) {
                setRole(storedRole);
            }
        } else {
            setIsLoggedIn(false);
            setUsername("");
            setRole("");
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setUsername("");
        setRole("");
        window.location.href = "/homepage";
    };

    return {
        username,
        role,
        isLoggedIn,
        handleLogout,
    };
};
