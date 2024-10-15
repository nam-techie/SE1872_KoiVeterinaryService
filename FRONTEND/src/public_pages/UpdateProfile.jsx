import React, { useState, useEffect } from 'react';
import '../styles/UpdateProfile.css'; // Sử dụng file CSS mới
import { useCustomerInfo } from '../hooks/useCustomerInfo';
import { useNavigate } from 'react-router-dom'; // Thêm import này

function UpdateProfile() {
    const { user, loading, error, updateCustomerInfo } = useCustomerInfo();
    const navigate = useNavigate(); // Thêm hook này
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: '',
        image: null // Để lưu file ảnh
    });
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                phoneNumber: user.phoneNumber || '',
                address: user.address || '',
                image: null
            });
        }
    }, [user]);

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

        console.log("FormData to send:", formData);

        try {
            await updateCustomerInfo(formData);
            setUpdateSuccess(true);
            // Chờ một chút trước khi chuyển hướng để người dùng thấy thông báo thành công
            setTimeout(() => {
                navigate('/profile'); // Chuyển hướng về trang profile sau khi cập nhật thành công
            }, 2000);
        } catch (err) {
            setUpdateError('Cập nhật thông tin thất bại. Vui lòng thử lại.');
        }
    };

    if (loading) {
        return <div className="profile-container">Đang tải thông tin...</div>;
    }

    return (
        <div className="update-profile-container">
            <div className="update-profile-avatar">
                <img 
                    src={formData.image ? URL.createObjectURL(formData.image) : "https://via.placeholder.com/250"} 
                    alt="Avatar" 
                />
                <input 
                    type="file" 
                    onChange={handleImageChange} 
                    accept="image/*"
                />
            </div>
            <form className="update-profile-info" onSubmit={handleSubmit}>
                <h2>Cập nhật thông tin cá nhân</h2>

                {error && (
                    <div className="error-message">
                        <span>{error}</span>
                    </div>
                )}

                {updateError && (
                    <div className="error-message">
                        <span>{updateError}</span>
                    </div>
                )}

                {updateSuccess && (
                    <div className="success-message">
                        <span>Cập nhật thông tin thành công! Đang chuyển hướng...</span>
                    </div>
                )}

                {/* Họ và tên */}
                <div className="update-info-item">
                    <label htmlFor="fullName">Họ và tên:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                {/* Số điện thoại */}
                <div className="update-info-item">
                    <label htmlFor="phoneNumber">Số điện thoại:</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                {/* Địa chỉ */}
                <div className="update-info-item">
                    <label htmlFor="address">Địa chỉ:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>

                {/* Nút cập nhật thông tin */}
                <button type="submit" className="update-button" disabled={loading}>
                    {loading ? 'Đang cập nhật...' : 'Cập nhật thông tin'}
                </button>
            </form>
        </div>
    );
}

export default UpdateProfile;
