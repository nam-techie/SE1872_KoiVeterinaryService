// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../services/apiRequest.js';

import './styles/DoctorDetailInfo.css';

const DoctorDetailInfo = ({ doctorId, onClose }) => {
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
            } catch (err) {
                setError('Có lỗi xảy ra khi tải thông tin bác sĩ');
                setLoading(false);
            }
        };

        fetchDoctorInfo();
    }, [doctorId]);

    if (loading) return <div>Đang tải thông tin bác sĩ...</div>;
    if (error) return <div>{error}</div>;
    if (!doctorInfo) return <div>Không tìm thấy thông tin bác sĩ</div>;

    return (
        <div className="doctor-detail-info">
            <h2>Thông tin chi tiết bác sĩ</h2>
            <p>Email: {doctorInfo.email}</p>
            <p>Tên đầy đủ: {doctorInfo.fullName}</p>
            <p>Số điện thoại: {doctorInfo.phone}</p>
            <p>Kinh nghiệm: {doctorInfo.experience} năm</p>
            {/* Thêm các thông tin khác của bác sĩ tại đây */}
            <button onClick={onClose}>Đóng</button>
        </div>
    );
};

export default DoctorDetailInfo;
