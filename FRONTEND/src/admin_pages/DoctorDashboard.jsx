// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import './styles/DoctorDashboard.css';
import { useDoctorInfo } from './hooks/useDoctorInfo';
import DoctorDetailInfo from './DoctorDetailInfo';

const DoctorDashboard = () => {
    const { doctors, loading, error, fetchAllDoctors } = useDoctorInfo();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('fullName');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);

    useEffect(() => {
        fetchAllDoctors();
    }, []);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const handleViewDetails = (doctorId) => {
        setSelectedDoctorId(doctorId);
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div className="doctor-dashboard">
            <h2>Quản lý Bác sĩ</h2>
            <div className="search-sort">
                <input
                    type="text"
                    placeholder="Tìm kiếm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select onChange={(e) => handleSort(e.target.value)} value={sortBy}>
                    <option value="fullName">Sắp xếp theo Tên</option>
                    <option value="experience">Sắp xếp theo Kinh nghiệm</option>
                    <option value="phone">Sắp xếp theo Số điện thoại</option>
                </select>
                <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                    {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
                </button>
            </div>
            <div className="doctor-table">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('fullName')}>Tên đầy đủ</th>
                            <th onClick={() => handleSort('phone')}>Số điện thoại</th>
                            <th onClick={() => handleSort('experience')}>Kinh nghiệm (năm)</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.fullName}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.experience}</td>
                                <td>
                                    <img src={doctor.imageUrl} alt={doctor.fullName} className="doctor-thumbnail" />
                                </td>
                                <td>
                                    <button className="detail-btn" onClick={() => handleViewDetails(doctor.id)}>
                                        <FaInfoCircle /> Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedDoctorId && (
                <DoctorDetailInfo
                    doctorId={selectedDoctorId}
                    onClose={() => setSelectedDoctorId(null)}
                />
            )}
        </div>
    );
};

export default DoctorDashboard;
