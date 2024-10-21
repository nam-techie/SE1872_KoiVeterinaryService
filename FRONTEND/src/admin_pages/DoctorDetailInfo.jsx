// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDoctorInfo } from './hooks/useDoctorInfo';
import './styles/DoctorDetailInfo.css';

const DoctorDetailInfo = ({ doctorId, onClose }) => {
    const [doctorDetail, setDoctorDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getDoctorDetail, deleteDoctor} = useDoctorInfo();

    useEffect(() => {
        const fetchDoctorDetail = async () => {
            try {
                const data = await getDoctorDetail(doctorId);
                setDoctorDetail(data);
                setLoading(false);
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError('Có lỗi xảy ra khi tải thông tin chi tiết bác sĩ');
                setLoading(false);
            }
        };

        fetchDoctorDetail();
    }, [doctorId]);

    const handleDelete = async () => {
        if (window.confirm('Bạn có chắc chắn muốn xóa thông tin bác sĩ này?')) {
            try {
                await deleteDoctor(doctorId);
                alert('Đã xóa thông tin bác sĩ thành công.');
                onClose();
            } catch (err) {
                console.error('Lỗi khi xóa thông tin bác sĩ:', err);
                alert('Có lỗi xảy ra khi xóa thông tin bác sĩ. Vui lòng thử lại.');
            }
        }
    };

    const handleEdit = () => {
        // Implement edit functionality
        console.log('Edit doctor:', doctorId);
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;
    if (!doctorDetail) return <div>Không tìm thấy thông tin bác sĩ</div>;

    return (
        <div className="doctor-detail-info">
            <h2>Thông tin chi tiết bác sĩ</h2>
            <button className="close-btn" onClick={onClose}>Đóng</button>
            <div className="doctor-info-container">
                <div className="doctor-basic-info">
                    <img src={doctorDetail.imageUrl} alt={doctorDetail.fullName} className="doctor-image" />
                    <h3>{doctorDetail.fullName}</h3>
                    <p><strong>Email:</strong> {doctorDetail.account.email}</p>
                    <p><strong>Số điện thoại:</strong> {doctorDetail.phone}</p>
                    <p><strong>Kinh nghiệm:</strong> {doctorDetail.experience} năm</p>
                </div>
                <div className="doctor-detailed-info">
                    <h4>Chuyên môn</h4>
                    <p>{doctorDetail.doctorInfo.specialty}</p>
                    <h4>Bằng cấp</h4>
                    <p>{doctorDetail.doctorInfo.qualification}</p>
                    <h4>Mô tả</h4>
                    <p>{doctorDetail.doctorInfo.description}</p>
                </div>
            </div>
            <div className="action-buttons">
                <button className="edit-btn" onClick={handleEdit}><FaEdit /> Chỉnh sửa</button>
                <button className="delete-btn" onClick={handleDelete}><FaTrash /> Xóa</button>
            </div>
        </div>
    );
};

export default DoctorDetailInfo;
