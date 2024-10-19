import { useState, useEffect } from "react";

export const useAuthValidation = () => {
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Hoặc sessionStorage.getItem('token')
        const storedUsername = localStorage.getItem("username");

        if (token) {
            setIsLoggedIn(true);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/homepage";
    };

    return {
        username,
        isLoggedIn,
        handleLogout,
    };
};
