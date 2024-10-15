// hooks/useNavbar.js

import { useState, useEffect } from 'react';

// Custom hook để quản lý trạng thái đăng nhập và dropdown
export const useNavbar = () => {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // Kiểm tra token khi component được render
    useEffect(() => {
        const token = localStorage.getItem('authToken'); // hoặc sessionStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername); // Cập nhật trạng thái với username đã lưu
        }
    }, []); // useEffect sẽ chỉ chạy một lần sau khi component render

    // Hàm xử lý khi bấm logout
    const handleLogout = () => {
        localStorage.clear(); // Xóa token khi logout
        setIsLoggedIn(false); // Cập nhật trạng thái
        window.location.href ="/homepage";
    };

    return {
        username,
        isLoggedIn,
        showDropdown,
        setShowDropdown,
        handleLogout,
    };
};
