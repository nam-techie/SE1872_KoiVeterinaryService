// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import '../admin_pages/styles/AdminUpdateProfile.css';
import {useCustomerInfo} from "../../hooks/useCustomerInfo.js";
import { FaEdit, FaSave } from 'react-icons/fa';

function AdminUpdateProfile() {
    const { user, loading, error, updateAdminInfo } = useCustomerInfo();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        fullName: '',
        phoneNumber: '',
        address: '',
        image: null
    });
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                fullName: user.fullName || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
                image: null
            });
        }
    }, [user]);

    useEffect(() => {
        console.log("isEditing:", isEditing);
    }, [isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateError(null);
        setUpdateSuccess(false);

        try {
            await updateAdminInfo(formData);
            setUpdateSuccess(true);
            setIsEditing(false);
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setUpdateError('Cập nhật thông tin thất bại. Vui lòng thử lại.');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    // Khi nhấn nút "Chỉnh sửa thông tin"
    const handleEdit = () => {
        setIsEditing(true);
    };

    if (loading) {
        return <div className="admin-update-profile">Đang tải thông tin...</div>;
    }

    return (
        <div className="admin-update-profile">
            <h2>Thông tin cá nhân</h2>
            <div className="profile-content">
                <div className="profile-avatar">
                    <img 
                        src={formData.image ? URL.createObjectURL(formData.image) : (user.image || "https://via.placeholder.com/150")} 
                        alt="Avatar" 
                    />
                    {isEditing && (
                        <input 
                            type="file" 
                            onChange={handleImageChange} 
                            accept="image/*"
                        />
                    )}
                </div>
                <form className="profile-details" onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {updateError && <div className="error-message">{updateError}</div>}
                    {updateSuccess && <div className="success-message">Cập nhật thông tin thành công!</div>}

                    {['username', 'email', 'fullName', 'phoneNumber', 'address'].map((key) => (
                        <div key={key} className="profile-item">
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            {isEditing ? (
                                <input
                                    type={key === 'email' ? 'email' : key === 'phoneNumber' ? 'tel' : 'text'}
                                    name={key}
                                    value={formData[key]}
                                    onChange={handleChange}
                                    readOnly={key === 'username' || key === 'email'}
                                />
                            ) : (
                                <span>{user[key] || 'Trống'}</span>
                            )}
                        </div>
                    ))}

                    {isEditing ? (
                        <div className="button-group">
                            <button type="button" className="cancel-button" onClick={handleCancel}>
                                Hủy yêu cầu
                            </button>
                            <button type="submit" className="save-button">
                                <FaSave /> Lưu thay đổi
                            </button>
                        </div>
                    ) : (
                        <button type="button" className="edit-button" onClick={handleEdit}>
                            <FaEdit /> Chỉnh sửa thông tin
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default AdminUpdateProfile;
