// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {axiosInstance} from "../../service/apiRequest.js";
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

import './styles/DoctorDetailInfo.css';

const DoctorDetailInfo = ({ doctorId, onClose, onEdit }) => {
    const [doctorInfo, setDoctorInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/admin/getInfoDoctor/${doctorId}`);
                setDoctorInfo(response.data);
                setLoading(false);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Có lỗi xảy ra khi tải thông tin bác sĩ');
                setLoading(false);
            }
        };

        fetchDoctorInfo();
    }, [doctorId]);

    if (loading) return <div className="loading">Đang tải thông tin bác sĩ...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!doctorInfo) return <div className="not-found">Không tìm thấy thông tin bác sĩ</div>;

    const getInitials = (name) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="doctor-detail-info">
            <div className="doctor-avatar">
                <span>{getInitials(doctorInfo.fullName)}</span>
            </div>
            <h2>Thông tin cá nhân</h2>
            <div className="info-container">
                <div className="basic-info">
                    <p><strong>Họ và tên:</strong> {doctorInfo.fullName}</p>
                    <p><strong>Số điện thoại:</strong> {doctorInfo.phone}</p>
                    <p><strong>Chuyên môn:</strong> {doctorInfo.specialty}</p>
                    <p><strong>Kinh nghiệm:</strong> {doctorInfo.experience} năm</p>
                    <p><strong>Bằng cấp:</strong> {doctorInfo.qualification}</p>
                </div>
                <div className="description">
                    <h3>Mô tả</h3>
                    <p>{doctorInfo.description}</p>
                </div>
            </div>
            <div className="button-group">
                <button className="action-btn edit-btn" onClick={() => onEdit(doctorInfo)}>
                    <FaEdit /> Chỉnh sửa thông tin
                </button>
                <button className="action-btn back-btn" onClick={onClose}>
                    <FaArrowLeft /> Quay lại
                </button>
            </div>
        </div>
    );
};

export default DoctorDetailInfo;
