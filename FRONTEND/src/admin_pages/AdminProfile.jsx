// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaEdit, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../admin_pages/styles/AdminProfile.css';
import { useAdminInfo } from './hooks/useAdminInfo';

const AdminProfile = () => {
    const { admin, loading, error, updateAdminInfo } = useAdminInfo();
    const [isEditing, setIsEditing] = useState(false);
    const [editedAdmin, setEditedAdmin] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const handleEdit = () => {
        setEditedAdmin(admin);
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            await updateAdminInfo(editedAdmin);
            setIsEditing(false);
            setUpdateSuccess(true);
            setTimeout(() => setUpdateSuccess(false), 3000);
        } catch (err) {
            console.error("Lỗi khi cập nhật thông tin:", err);
            setUpdateError('Cập nhật thông tin thất bại. Vui lòng thử lại.');
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

    if (loading) {
        return <div className="admin-profile">Đang tải thông tin...</div>;
    }

    if (error) {
        return <div className="admin-profile">Lỗi: {error}</div>;
    }

    return (
        <div className="admin-profile">
            <h2>Thông tin Admin</h2>
            <div className="profile-content">
                <div className="profile-details">
                    {['username', 'password', 'email'].map((key) => (
                        <div key={key} className="profile-item">
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            {isEditing ? (
                                key === 'password' ? (
                                    <div className="password-input">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name={key}
                                            value={editedAdmin[key] || ''}
                                            onChange={handleChange}
                                        />
                                        <button type="button" onClick={togglePasswordVisibility}>
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                ) : (
                                    <input
                                        type={key === 'email' ? 'email' : 'text'}
                                        name={key}
                                        value={editedAdmin[key] || ''}
                                        onChange={handleChange}
                                    />
                                )
                            ) : (
                                <span>{key === 'password' ? '••••••••' : admin[key] || 'Trống'}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {updateError && <div className="error-message">{updateError}</div>}
            {updateSuccess && <div className="success-message">Cập nhật thông tin thành công!</div>}
            {isEditing ? (
                <button className="save-button" onClick={handleSave}>
                    <FaSave /> Lưu thay đổi
                </button>
            ) : (
                <button className="edit-button" onClick={handleEdit}>
                    <FaEdit /> Chỉnh sửa thông tin
                </button>
            )}
        </div>
    );
};

export default AdminProfile;
