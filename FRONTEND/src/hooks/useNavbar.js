// hooks/useNavbar.js

import { useState, useEffect } from 'react';

// Custom hook để quản lý trạng thái đăng nhập và dropdown
export const useNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Kiểm tra token khi component được render
    useEffect(() => {
        const token = localStorage.getItem('token'); // hoặc sessionStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Hàm xử lý khi bấm logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Xóa token khi logout
        setIsLoggedIn(false); // Cập nhật trạng thái
    };

    return {
        isLoggedIn,
        showDropdown,
        setShowDropdown,
        handleLogout,
    };
};
