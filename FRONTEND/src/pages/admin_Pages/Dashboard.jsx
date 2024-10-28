// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../admin_pages/styles/AdminDashboard.css';
import { FaHome, FaCalendarAlt, FaUsers, FaUserMd, FaComments, FaSignOutAlt, FaUser, FaFish } from 'react-icons/fa';
import AdminProfile from "./AdminProfile.jsx";
import AccountDashboard from "./AccountDashboard.jsx";
import CreateAccount from "./CreateAccount.jsx";
import VeterinaryAccount from "./VeterinaryAccount.jsx";
import AccountUpdateProfile from "./AccountUpdateProfile.jsx";
import DoctorDashboard from "./DoctorDashboard.jsx";
import DoctorDetailInfo from "./DoctorDetailInfo.jsx";
import UpdateDoctor from "./UpdateDoctor.jsx";
import AddDoctor from "./AddDoctor.jsx";
import FeedbackDashboard from "./FeedbackDashboard.jsx";
import ServiceDashboard from "./ServiceDashboard.jsx";
import FishManage from './FishManage.jsx';
import AppointmentDashboard from "./AppointmentDashboard.jsx";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [activeTab, setActiveTab] = useState('home');
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [selectedDoctorInfo, setSelectedDoctorInfo] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingDoctor, setIsAddingDoctor] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
        const storedAccount = localStorage.getItem('selectedAccount');
        if (storedAccount) {
            setSelectedAccount(JSON.parse(storedAccount));
        }
    }, [activeTab]);

    const handleLogout = () => {
        // Xóa token và thông tin người dùng khỏi localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        
        // Chuyển hướng về trang đăng nhập
        navigate('/login');
    };

    const handleAddDoctor = () => {
        setIsAddingDoctor(true);
    };

    const handleAddDoctorClose = () => {
        setIsAddingDoctor(false);
    };

    const handleDoctorAdded = () => {
        // Xử lý sau khi thêm bác sĩ thành công
        setIsAddingDoctor(false);
        // Có thể cập nhật danh sách bác sĩ ở đây nếu cần
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
            case 'accounts':
                return <AccountDashboard 
                    setActiveTab={setActiveTab} 
                    setSelectedAccount={setSelectedAccount}
                />;
            case 'createAccount':
                return <CreateAccount setActiveTab={setActiveTab} />;
            case 'createVeterinaryAccount':
                return <VeterinaryAccount setActiveTab={setActiveTab} />;
            case 'editAccount':
                return selectedAccount ? (
                    <AccountUpdateProfile 
                        account={selectedAccount} 
                        onClose={() => setActiveTab('accounts')}
                        onUpdate={(updatedAccount) => {
                            console.log('Tài khoản đã được cập nhật:', updatedAccount);
                            setActiveTab('accounts');
                        }}
                    />
                ) : (
                    <div>Không có tài khoản được chọn để chỉnh sửa</div>
                );
            case 'doctors':
                if (isAddingDoctor) {
                    return <AddDoctor onClose={handleAddDoctorClose} onAdd={handleDoctorAdded} />;
                } else if (selectedDoctorId) {
                    return isEditing ? (
                        <UpdateDoctor 
                            doctor={selectedDoctorInfo}
                            onClose={() => {
                                setIsEditing(false);
                                setSelectedDoctorId(null);
                                setSelectedDoctorInfo(null);
                            }}
                            onUpdate={(updatedDoctor) => {
                                console.log('Bác sĩ đã được cập nhật:', updatedDoctor);
                                setIsEditing(false);
                                setSelectedDoctorInfo(updatedDoctor);
                            }}
                        />
                    ) : (
                        <DoctorDetailInfo 
                            doctorId={selectedDoctorId}
                            onClose={() => setSelectedDoctorId(null)}
                            onEdit={(doctorInfo) => {
                                setSelectedDoctorInfo(doctorInfo);
                                setIsEditing(true);
                            }}
                        />
                    );
                } else {
                    return (
                        <DoctorDashboard 
                            onViewDetails={(id) => {
                                setSelectedDoctorId(id);
                                setActiveTab('doctors');
                            }}
                            onAddDoctor={handleAddDoctor}
                        />
                    );
                }
            case 'feedback':
                return <FeedbackDashboard />;
            case 'services':
                return <ServiceDashboard />;
            case 'fish':
                return <FishManage />;
            case 'appointments':
                return <AppointmentDashboard />;
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
                    <li className={`menu-item ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>
                        <FaCalendarAlt /> Quản lý lịch hẹn
                    </li>
                    <li className={`menu-item ${activeTab === 'fish' ? 'active' : ''}`} onClick={() => setActiveTab('fish')}>
                        <FaFish /> Quản lý hồ sơ cá Koi
                    </li>
                    <li className={`menu-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
                        <FaUserMd /> Quản lý dịch vụ
                    </li>
                    <li className={`menu-item ${activeTab === 'doctors' ? 'active' : ''}`} onClick={() => setActiveTab('doctors')}>
                        <FaUserMd /> Quản lý bác sĩ
                    </li>
                    <li className={`menu-item ${activeTab === 'accounts' ? 'active' : ''}`} onClick={() => setActiveTab('accounts')}>
                        <FaUsers /> Quản lý tài khoản
                    </li>
                    
                    <li className={`menu-item ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}>
                        <FaComments /> Feedback & Rating
                    </li>
                    <li className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                        <FaUser /> Tài khoản của tôi
                    </li>
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
