// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { axiosInstance } from '../services/apiRequest.js';
import './styles/AddDoctor.css';

const AddDoctor = ({ onClose, onAdd }) => {
    const [doctorInfo, setDoctorInfo] = useState({
        fullName: '',
        phone: '',
        experience: '',
        specialty: '',
        qualification: '',
        description: ''
    });
    const [error, setError] = useState(null);

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
            const response = await axiosInstance.post('/admin/addDoctor', doctorInfo);
            onAdd(response.data);
            onClose();
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Có lỗi xảy ra khi thêm bác sĩ mới');
        }
    };

    return (
        <div className="add-doctor-form">
            <h2>Thêm Bác sĩ mới</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullName">Tên đầy đủ:</label>
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
                    <button type="submit" className="add-btn">Thêm Bác sĩ</button>
                    <button type="button" className="cancel-btn" onClick={onClose}>Hủy</button>
                </div>
            </form>
        </div>
    );
};

export default AddDoctor;
