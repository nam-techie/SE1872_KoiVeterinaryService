// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { FaSearch, FaSort, FaUserMd, FaCalendarPlus } from 'react-icons/fa';
import './styles/DoctorDashboard.css';
import {useDoctorInfo} from "./hooks/useDoctorInfo.js";
import DoctorDetailInfo from "./DoctorDetailInfo.jsx"; // Đảm bảo import này tồn tại
import LoadingCat from '../../components/LoadingCat.jsx';
import Pagination from '../../components/Pagination.jsx';
import { toast } from 'react-toastify';

const DoctorDashboard = ({ onViewDetails, onAddDoctor }) => {
    const { doctors, loading, error, fetchAllDoctors, createDoctorSchedule } = useDoctorInfo();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('fullName');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedDoctorId, setSelectedDoctorId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

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
        onViewDetails(doctorId);
    };

    const handleSchedule = async (doctorId) => {
        try {
            const result = await createDoctorSchedule(doctorId);
            toast.success(result); // Hiển thị thông báo thành công
        } catch (error) {
            toast.error(error.message); // Hiển thị thông báo lỗi
        }
    };

    if (loading) return <LoadingCat />;
    if (error) return <div>Lỗi: {error}</div>;

    const sortDoctors = (doctors, sortBy, sortOrder) => {
        return [...doctors].sort((a, b) => {
            if (sortBy === 'fullName') {
                // Xử lý trường hợp fullName là null
                const nameA = a.fullName || '';
                const nameB = b.fullName || '';
                return sortOrder === 'asc' 
                    ? nameA.localeCompare(nameB) 
                    : nameB.localeCompare(nameA);
            } else if (sortBy === 'experience') {
                // Xử lý trường hợp experience là null
                const expA = a.experience || 0;
                const expB = b.experience || 0;
                return sortOrder === 'asc' 
                    ? expA - expB 
                    : expB - expA;
            }
            // Thêm các trường hợp sắp xếp khác nếu cần
            return 0;
        });
    };

    // Tính toán dữ liệu cho trang hiện tại
    const filteredDoctors = sortDoctors(doctors, sortBy, sortOrder)
        .filter(doctor => 
            doctor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.phone?.includes(searchTerm)
        );

    const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
    const currentDoctors = filteredDoctors.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <div className="doctor-dashboard">
            <div className="dashboard-header">
                <h2>Quản lý Bác sĩ</h2>
                <div className="action-buttons">
                    <button className="add-doctor-btn" onClick={onAddDoctor}>
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
                        <option value="experience">Kinh nghiệm</option>
                        <option value="phone">Sắp xếp theo Số điện thoại</option>
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
                            <th>ID</th>
                            <th onClick={() => handleSort('fullName')}>Tên đầy đủ</th>
                            <th onClick={() => handleSort('phone')}>Số điện thoại</th>
                            <th onClick={() => handleSort('experience')}>Kinh nghiệm (năm)</th>
                            <th>Hình ảnh</th>
                            <th className='action-column'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDoctors.map((doctor) => (
                            <tr key={doctor.id}>
                                <td>{doctor.id}</td>
                                <td>{doctor.fullName || 'Dữ liệu rỗng'}</td>
                                <td>{doctor.phone}</td>
                                <td>{doctor.experience || 0}</td>
                                <td>
                                    <img src={doctor.imageUrl} alt={doctor.fullName} className="doctor-thumbnail" />
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="edit-btn" onClick={() => handleViewDetails(doctor.id)}>
                                            <FaSearch /> Chi tiết
                                        </button>
                                        <button className="schedule-btn" onClick={() => handleSchedule(doctor.id)}>
                                            <FaCalendarPlus /> Tạo lịch
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
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
