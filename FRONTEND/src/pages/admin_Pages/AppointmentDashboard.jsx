import React, { useState } from 'react';
import './styles/AppointmentDashboard.css';
import useAppointment from './hooks/useAppointment';
import { FaSearch, FaSort } from 'react-icons/fa';

const AppointmentDashboard = () => {
    const { appointments, loading, error } = useAppointment();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('id');
    const [sortOrder, setSortOrder] = useState('desc');
    // Thêm state mới cho date search
    const [dateSearch, setDateSearch] = useState('');

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>{error}</div>;

    // Hàm tìm kiếm
    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    // Hàm sắp xếp
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    // Lọc và sắp xếp dữ liệu
    const filteredAndSortedAppointments = [...appointments]
        .filter(appointment => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                appointment.id?.toString().toLowerCase().includes(searchLower) ||
                appointment.fullName?.toLowerCase().includes(searchLower) ||
                appointment.status?.toLowerCase().includes(searchLower) ||
                appointment.nameService?.toLowerCase().includes(searchLower) ||
                appointment.appointmentBookingTime?.toLowerCase().includes(searchLower) ||
                appointment.appointmentBookingDate?.toLowerCase().includes(searchLower) ||
                appointment.nameZone?.toLowerCase().includes(searchLower);

            // Thêm logic lọc theo ngày
            if (dateSearch) {
                const searchDate = new Date(dateSearch);
                const appointmentDate = new Date(appointment.appointmentBookingDate);
                
                const matchesYear = searchDate.getFullYear() === appointmentDate.getFullYear();
                const matchesMonth = searchDate.getMonth() === appointmentDate.getMonth();
                const matchesDay = searchDate.getDate() === appointmentDate.getDate();

                // Nếu người dùng chỉ chọn năm (YYYY)
                if (dateSearch.length === 4) {
                    return matchesYear && matchesSearch;
                }
                // Nếu người dùng chọn năm và tháng (YYYY-MM)
                else if (dateSearch.length === 7) {
                    return matchesYear && matchesMonth && matchesSearch;
                }
                // Nếu người dùng chọn đầy đủ ngày (YYYY-MM-DD)
                else {
                    return matchesYear && matchesMonth && matchesDay && matchesSearch;
                }
            }

            return matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'id') {
                return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
            } else if (sortBy === 'fullName') {
                return sortOrder === 'asc' 
                    ? a.fullName.localeCompare(b.fullName)
                    : b.fullName.localeCompare(a.fullName);
            } else if (sortBy === 'appointmentBookingDate') {
                const dateA = a.appointmentBookingDate || '';
                const dateB = b.appointmentBookingDate || '';
                return sortOrder === 'asc' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
            } else if (sortBy === 'appointmentBookingTime') {
                const timeA = a.appointmentBookingTime || '';
                const timeB = b.appointmentBookingTime || '';
                return sortOrder === 'asc' ? timeA.localeCompare(timeB) : timeB.localeCompare(timeA);
            }
            return 0;
        });

    const sortOptions = [
        { value: 'id', label: 'Sắp xếp theo ID' },
        { value: 'fullName', label: 'Sắp xếp theo tên' },
        { value: 'appointmentBookingTime', label: 'Sắp xếp theo thời gian' },
        { value: 'appointmentBookingDate', label: 'Sắp xếp theo Ngày thực hiện' },
    ];

    return (
        <div className="appointment-dashboard">
            <div className="content-header">
                <h2>Quản lý lịch hẹn</h2>
                <div className="search-sort-container">
                    <div className="search-box">
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                        <FaSearch className="search-icon" />
                    </div>
                    { }
                    <div className="date-search-box">
                        <input
                            type="date"
                            className="date-input"
                            value={dateSearch}
                            onChange={(e) => setDateSearch(e.target.value)}
                        />
                    </div>
                    <div className="sort-box">
                        <select
                            onChange={(e) => handleSort(e.target.value)}
                            value={sortBy}
                            className="sort-select"
                        >
                            <option value="id">Sắp xếp theo ID</option>
                            <option value="fullName">Sắp xếp theo Tên</option>
                            <option value="appointmentBookingDate">Sắp xếp theo Ngày thực hiện</option>
                            <option value="appointmentBookingTime">Sắp xếp theo Thời gian</option>

                        </select>
                    </div>
                    <button
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="sort-order-btn"
                    >
                        {sortOrder === 'asc' ? 'Tăng dần' : 'Giảm dần'}
                        <FaSort className='sort-icon'/>
                    </button>
                </div>
            </div>

            <div className="appointment-table">
                <table>
                    <thead>
                        <tr>
                            <th>Mã lịch hẹn</th>
                            <th>Tên khách hàng</th>
                            <th>Trạng thái</th>
                            <th>Tên dịch vụ</th>
                            <th>Thời gian</th>
                            <th>Ngày thực hiện</th>
                            <th>Khu vực</th>
                            <th className='action-column'>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAndSortedAppointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>#{appointment.id}</td>
                                <td>{appointment.fullName}</td>
                                <td>{appointment.status || "Chưa có trạng thái"}</td>
                                <td>{appointment.nameService}</td>
                                <td>{appointment.appointmentBookingTime}</td>
                                <td>{appointment.appointmentBookingDate}</td>
                                <td>{appointment.nameZone}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="action-btn view">Xem</button>
                                        <button className="action-btn edit">Sửa</button>
                                        <button className="action-btn delete">Hủy</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentDashboard;
