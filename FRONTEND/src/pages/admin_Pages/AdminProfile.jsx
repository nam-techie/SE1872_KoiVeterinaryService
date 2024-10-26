// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../admin_pages/styles/AdminProfile.css';
import {useAdminInfo} from "./hooks/useAdminInfo.js";

const AdminProfile = () => {
    const { admin, loading, error, updateAdminInfo } = useAdminInfo();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAdmin, setEditedAdmin] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [updateMessage, setUpdateMessage] = useState({ type: '', content: '' });

    useEffect(() => {
        if (admin) {
            setEditedAdmin(admin);
        }
    }, [admin]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setUpdateMessage({ type: '', content: '' });
        }, 3000);
        return () => clearTimeout(timer);
    }, [updateMessage]);

    const handleEdit = () => {
        setIsEditing(true);
        setUpdateMessage({ type: '', content: '' });
    };

    const handleSave = async () => {
        try {
            const updatedAdmin = await updateAdminInfo(editedAdmin);
            setIsEditing(false);
            setUpdateMessage({ type: 'success', content: 'Cập nhật thông tin thành công!' });
            setEditedAdmin(updatedAdmin);
        } catch (err) {
            console.error("Lỗi khi cập nhật thông tin:", err);
            setUpdateMessage({ 
                type: 'error', 
                content: err.response?.data?.message || 'Cập nhật thông tin thất bại. Vui lòng thử lại.' 
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAdmin(prevAdmin => ({
            ...prevAdmin,
            [name]: value
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (loading) return <div className="admin-profile">Đang tải thông tin...</div>;
    if (error) return <div className="admin-profile">Lỗi: {error}</div>;

    return (
        <div className="admin-profile">
            <h2>Thông tin Admin</h2>
            <div className="profile-info">
                {isEditing ? (
                    <form className="profile-form">
                        <div className="form-group">
                            <label htmlFor="username">Tên đăng nhập:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={editedAdmin.username || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mật khẩu:</label>
                            <div className="password-input">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={editedAdmin.password || ''}
                                    onChange={handleChange}
                                />
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility} 
                                    className="toggle-password"
                                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={editedAdmin.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                    </form>
                ) : (
                    <div className="profile-details">
                        <p><strong>Tên đăng nhập:</strong> {admin.username}</p>
                        <p><strong>Email:</strong> {admin.email}</p>
                    </div>
                )}
                {updateMessage.content && (
                    <div className={`message ${updateMessage.type}`}>
                        {updateMessage.content}
                    </div>
                )}
                {isEditing ? (
                    <button type="button" className="save-button" onClick={handleSave}>
                        <FaSave /> Lưu thay đổi
                    </button>
                ) : (
                    <button type="button" className="edit-button" onClick={handleEdit}>
                        <FaEdit /> Chỉnh sửa thông tin
                    </button>
                )}
            </div>
        </div>
    );
};

export default AdminProfile;
