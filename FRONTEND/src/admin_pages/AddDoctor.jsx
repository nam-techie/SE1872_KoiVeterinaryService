// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaArrowLeft, FaUserMd } from 'react-icons/fa';
import useDoctorInfo from '../hooks/useDoctorInfo';
import './styles/AddDoctor.css';

const AddDoctor = ({ onClose, onAdd }) => {
    const [doctorInfo, setDoctorInfo] = useState({
        email: '',
        fullName: '',
        phone: '',
        experience: '',
        specialty: '',
        qualification: '',
        description: ''
    });
    const { addDoctor, loading, error } = useDoctorInfo();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const email = doctorInfo.email;
            const doctorData = { ...doctorInfo };
            delete doctorData.email; // Xóa email khỏi doctorData vì nó được truyền riêng
            await addDoctor(email, doctorData);
            onAdd(); // Gọi hàm callback để thông báo thêm thành công
            onClose(); // Đóng form
        } catch (err) {
            // Lỗi đã được xử lý trong hook useDoctorInfo
            console.error('Lỗi khi thêm bác sĩ:', err);
        }
    };

    return (
        <div className="add-doctor-container">
            <h2>Thông tin cá nhân bác sĩ</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="add-doctor-form">
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={doctorInfo.email}
                        onChange={handleChange}
                        required
                    />
                    <p className="email-note">Nhập email để tạo tài khoản cho bác sĩ</p>
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={doctorInfo.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={doctorInfo.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="specialty">Chuyên môn:</label>
                    <input
                        type="text"
                        id="specialty"
                        name="specialty"
                        value={doctorInfo.specialty}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="experience">Kinh nghiệm (năm):</label>
                    <input
                        type="number"
                        id="experience"
                        name="experience"
                        value={doctorInfo.experience}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="qualification">Bằng cấp:</label>
                    <input
                        type="text"
                        id="qualification"
                        name="qualification"
                        value={doctorInfo.qualification}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={doctorInfo.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        <FaArrowLeft /> Quay lại
                    </button>
                    <button type="submit" className="add-btn" disabled={loading}>
                        <FaUserMd /> {loading ? 'Đang thêm...' : 'Thêm bác sĩ'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
