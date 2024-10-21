// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FaSearch, FaSort, FaUserMd } from 'react-icons/fa';
import './styles/DoctorDashboard.css';
import { useDoctorInfo } from './hooks/useDoctorInfo';
import DoctorDetailInfo from './DoctorDetailInfo'; // Đảm bảo import này tồn tại

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

    const sortDoctors = (doctors, sortBy, sortOrder) => {
        return [...doctors].sort((a, b) => {
            if (sortBy === 'fullName') {
                return sortOrder === 'asc' 
                    ? a.fullName.localeCompare(b.fullName) 
                    : b.fullName.localeCompare(a.fullName);
            } else if (sortBy === 'experience_asc') {
                return a.experience - b.experience;
            } else if (sortBy === 'experience_desc') {
                return b.experience - a.experience;
            }
            // Thêm các trường hợp sắp xếp khác nếu cần
            return 0;
        });
    };

    return (
        <div className="doctor-dashboard">
            <div className="dashboard-header">
                <h2>Quản lý Bác sĩ</h2>
                <div className="action-buttons">
                    <button className="add-doctor-btn">
                        <FaUserMd /> Thêm Bác sĩ
                    </button>
                    
                </div>
            </div>
            <div className="search-sort-container">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
               
                <div className="sort-box">
                    <select
                        onChange={(e) => handleSort(e.target.value)}
                        value={sortBy}
                        className="sort-select"
                    >
                        <option value="fullName">Sắp xếp theo Tên</option>
                        <option value="experience_asc">Kinh nghiệm (Thấp đến Cao)</option>
                        <option value="experience_desc">Kinh nghiệm (Cao đến Thấp)</option>
                    </select>
                </div>
                <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="sort-order-btn"
                >
                    {sortOrder === 'asc' ? 'Theo thứ tự từ A - Z' : 'Theo thứ tự từ Z - A'}
                    <FaSort />
                </button>
            </div>
            <div className="doctor-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tên đầy đủ</th>
                            <th>Số điện thoại</th>
                            <th>Kinh nghiệm (năm)</th>
                            <th>Hình ảnh</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortDoctors(doctors, sortBy, sortOrder).map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.fullName}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.experience}</td>
                                <td>
                                    <img src={doctor.imageUrl} alt={doctor.fullName} className="doctor-thumbnail" />
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => handleViewDetails(doctor.id)}>
                                            <FaSearch /> Chi tiết
                                        </button>
                                    </div>
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
