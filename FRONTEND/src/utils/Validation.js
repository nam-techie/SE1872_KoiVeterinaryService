import { useState, useEffect } from "react";

export const useAuthValidation = () => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState(""); // Thêm state để quản lý role
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken"); // Lấy token từ localStorage
        const storedUsername = localStorage.getItem("username"); // Lấy username
        const storedRole = localStorage.getItem("role"); // Lấy role

        if (token) {
            setIsLoggedIn(true);
        }
        if (storedUsername) {
            setUsername(storedUsername);
        }
        if (storedRole) {
            setRole(storedRole);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Xoá toàn bộ thông tin đăng nhập
        setIsLoggedIn(false);
        window.location.href = "/homepage"; // Chuyển hướng về trang chủ
    };

    return {
        username,
        role, // Trả về role trong hook
        isLoggedIn,
        handleLogout,
    };
};
