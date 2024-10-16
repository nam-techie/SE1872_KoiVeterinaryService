// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../admin_pages/styles/AdminDashboard.css';
import { FaHome, FaCalendarAlt, FaUsers, FaUserMd, FaCog, FaComments, FaSignOutAlt, FaUser } from 'react-icons/fa';
import AdminProfile from './AdminProfile';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [activeTab, setActiveTab] = useState('home');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = () => {
        // Xóa token và thông tin người dùng khỏi localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        
        // Chuyển hướng về trang đăng nhập
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <>
                        <div className="content-header">
                            <h2>Tổng quan</h2>
                        </div>
                        <div className="content-cards">
                            <div className="card">
                                <h3>Số đơn hàng</h3>
                                <p>0</p>
                            </div>
                            <div className="card">
                                <h3>Doanh số</h3>
                                <p>0</p>
                            </div>
                        </div>
                        <div className="chart-section">
                            <h3>30 ngày gần nhất</h3>
                            <div className="chart-placeholder">
                                <p>Biểu đồ sẽ được hiển thị ở đây</p>
                            </div>
                        </div>
                        <div className="monthly-stats">
                            <h3>KINH DOANH THÁNG 09/2024</h3>
                            <input type="month" value="2024-09" />
                            <div className="stats-cards">
                                <div className="stat-card">
                                    <h4>Số đơn hàng</h4>
                                    <p>0</p>
                                </div>
                                <div className="stat-card">
                                    <h4>Doanh số</h4>
                                    <p>0</p>
                                </div>
                                <div className="stat-card">
                                    <h4>Sản tạm giữ</h4>
                                    <p>0</p>
                                </div>
                            </div>
                        </div>
                    </>
                );
            case 'profile':
                return <AdminProfile />;
            // Thêm các case khác cho các tab khác nếu cần
            default:
                return <div>Nội dung chưa được tạo</div>;
        }
    };

    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <h1 className="logo">KoiKung Center</h1>
                <div className="admin-welcome">
                    <div className="admin-avatar">
                        <FaUser size={30} />
                    </div>
                    <div className="admin-info">
                        <h4>Chào mừng</h4>
                        <p>Admin {username}</p>
                    </div>
                </div>
                <ul className="sidebar-menu">
                    <li className={`menu-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
                        <FaHome /> Trang chủ
                    </li>
                    <li className="menu-item"><FaCalendarAlt /> Quản lý lịch hẹn</li>
                    <li className="menu-item"><FaUsers /> Quản lý khách hàng</li>
                    <li className="menu-item"><FaUserMd /> Quản lý dịch vụ</li>
                    <li className="menu-item"><FaCog /> Quản lý bác sĩ</li>
                    <li className="menu-item"><FaUsers /> Quản lý tài khoản</li>
                    <li className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <FaUser /> Tài khoản của tôi
                    </li>
                    <li className="menu-item"><FaComments /> Đánh giá</li>
                    <li className="menu-item" onClick={handleLogout}>
                        <FaSignOutAlt /> Đăng xuất
                    </li>
                </ul>
            </div>
            <div className="main-content">
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
