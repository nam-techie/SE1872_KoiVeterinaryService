import React from 'react';
import '../../styles/AdminDashboard.css';


const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3>Quản lí</h3>
                </div>
                <ul className="sidebar-menu">
                    <li className="menu-item active">Danh sách</li>
                    <li className="menu-item">Tài khoản</li>
                    <li className="menu-item">Bác sĩ</li>
                    <li className="menu-item">Khách hàng</li>
                    <li className="menu-item">Quản lí lịch hẹn</li>
                    <li className="menu-item">Dịch vụ</li>
                    <li className="menu-item">Feedback</li>
                    <li className="menu-item">Thống kê</li>
                </ul>
            </div>

            <div className="main-content">
                <div className="content-header">
                    <h2>Welcome to Admin Dashboard</h2>
                </div>
                <div className="content-cards">
                    <div className="card">
                        <h3>Bookings</h3>
                        <p>281</p>
                    </div>
                    <div className="card">
                        <h3>Today's Users</h3>
                        <p>2,300</p>
                    </div>
                    <div className="card">
                        <h3>Revenue</h3>
                        <p>34k</p>
                    </div>
                    <div className="card">
                        <h3>Followers</h3>
                        <p>+91</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
