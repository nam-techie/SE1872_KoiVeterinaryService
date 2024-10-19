import { useState, useEffect } from 'react';

// Custom hook để quản lý trạng thái đăng nhập, role và dropdown
export const useNavbar = () => {
    const [username, setUsername] = useState('');
    const [role, setRole] = useState(''); // Thêm state cho role
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
        const storedRole = localStorage.getItem('role'); // Lấy role từ localStorage
        if (storedUsername) {
            setUsername(storedUsername); // Cập nhật trạng thái với username đã lưu
        }
        if (storedRole) {
            setRole(storedRole); // Cập nhật trạng thái với role đã lưu
        }
    }, []); // useEffect sẽ chỉ chạy một lần sau khi component render

    // Hàm xử lý khi bấm logout
    const handleLogout = () => {
        localStorage.clear(); // Xóa token khi logout
        setIsLoggedIn(false); // Cập nhật trạng thái
        window.location.href = "/homepage";
    };

    return {
        username,
        role, // Trả về role để kiểm tra trong Navbar
        isLoggedIn,
        showDropdown,
        setShowDropdown,
        handleLogout,
    };
};
