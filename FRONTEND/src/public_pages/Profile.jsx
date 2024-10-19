// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import { useCustomerInfo } from '../hooks/useCustomerInfo';

function Profile() {
    // Sử dụng custom hook để lấy thông tin người dùng
    const { user, loading, error } = useCustomerInfo();
    const navigate = useNavigate();

    if (loading) {
        return <div className="profile-container">Đang tải thông tin...</div>;
    }

    const handleUpdateClick = () => {
        navigate('/update-profile');
    };

    return (
        <div className="profile-container">
            <div className="profile-avatar">
                <img src="https://via.placeholder.com/150" alt="Avatar" />
            </div>
            <div className="profile-info">
                <h2>Thông tin cá nhân</h2>

                {/* Hiển thị thông báo lỗi (nếu có) */}
                {error && (
                    <div className="error-message">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="error-icon"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Tên đăng nhập */}
                <div className="info-item">
                    <label>Tên đăng nhập:</label>
                    <span>{user.username || 'Trống'}</span>
                </div>

                {/* Email */}
                <div className="info-item">
                    <label>Email:</label>
                    <span>{user.email || 'Trống'}</span>
                </div>

                {/* Họ và tên */}
                <div className="info-item">
                    <label>Họ và tên:</label>
                    <span>{user.fullName || 'Trống'}</span>
                </div>

                {/* Số điện thoại */}
                <div className="info-item">
                    <label>Số điện thoại:</label>
                    <span>{user.phoneNumber || 'Trống'}</span>
                </div>

                {/* Địa chỉ */}
                <div className="info-item">
                    <label>Địa chỉ:</label>
                    <span>{user.address || 'Trống'}</span>
                </div>

                {/* Nút cập nhật thông tin */}
                <button className="update-button" onClick={handleUpdateClick}>
                    Chỉnh sửa thông tin
                </button>
            </div>
        </div>
    );
}

export default Profile;
