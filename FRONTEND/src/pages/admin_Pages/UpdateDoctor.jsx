// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import { useDoctorInfo } from './hooks/useDoctorInfo';
import './styles/UpdateDoctor.css';
import LoadingCat from '../../components/LoadingCat.jsx';

const UpdateDoctor = ({ doctor, onClose, onUpdate }) => {
    const { updateDoctorInfo, loading } = useDoctorInfo();
    const [doctorInfo, setDoctorInfo] = useState(doctor);
    const [error, setError] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const originalPhone = doctor.phone; // Lưu số điện thoại ban đầu

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDoctorInfo(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setDoctorInfo(prevInfo => ({
                    ...prevInfo,
                    imageUrl: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(doctorInfo).some(value => value === '')) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }
        try {
            const updatedDoctor = await updateDoctorInfo(originalPhone, doctorInfo);
            onUpdate(updatedDoctor);
        } catch (err) {
            setError(err.message || 'Có lỗi xảy ra khi cập nhật thông tin bác sĩ');
        }
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="update-doctor">
            {loading ? <LoadingCat /> : (
                <div className="update-doctor">
                    <div className="doctor-avatar">
                        {previewImage || doctorInfo.imageUrl ? (
                            <img src={previewImage || doctorInfo.imageUrl} alt={`Ảnh đại diện của ${doctorInfo.fullName}`} />
                        ) : (
                            <span>{getInitials(doctorInfo.fullName)}</span>
                        )}
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="avatar-upload" className="avatar-upload-label">
                            Thay đổi ảnh
                        </label>
                    </div>
                    <h2>Cập nhật thông tin bác sĩ</h2>
                    {error && <div className="error-message">{error}</div>}
                    <form onSubmit={handleSubmit} className="info-container">
                        <div className="basic-info">
                            <div className="form-group">
                                <label htmlFor="fullName">Họ và tên:</label>
                                <input type="text" id="fullName" name="fullName" value={doctorInfo.fullName} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Số điện thoại:</label>
                                <input type="tel" id="phone" name="phone" value={doctorInfo.phone} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="specialty">Chuyên môn:</label>
                                <input type="text" id="specialty" name="specialty" value={doctorInfo.specialty} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="experience">Kinh nghiệm:</label>
                                <input type="number" id="experience" name="experience" value={doctorInfo.experience} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="qualification">Bằng cấp:</label>
                                <input type="text" id="qualification" name="qualification" value={doctorInfo.qualification} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="description">
                            <h3>Mô tả</h3>
                            <textarea name="description" value={doctorInfo.description} onChange={handleInputChange} required />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="action-btn save-btn">
                                <FaSave /> Lưu thay đổi
                            </button>
                            <button type="button" className="action-btn back-btn" onClick={onClose}>
                                <FaArrowLeft /> Quay lại
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UpdateDoctor;
