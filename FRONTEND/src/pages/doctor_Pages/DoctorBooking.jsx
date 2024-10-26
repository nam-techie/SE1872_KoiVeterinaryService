import React, { useState, useEffect } from 'react';
import styles from '../doctor_Pages/styles/DoctorBooking.module.css';
import {DoctorNavBar} from "../../components/Navbar.jsx";

const DoctorBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
        // Giả lập việc lấy dữ liệu từ API
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        // Thay thế bằng cuộc gọi API thực tế
        const mockBookings = [
            { id: 'BK001', patientName: 'Nguyễn Văn A', date: '2023-04-15', status: 'Hoàn thành' },
            { id: 'BK002', patientName: 'Trần Thị B', date: '2023-04-16', status: 'Đang chờ' },
            // Thêm các booking khác...
        ];
        setBookings(mockBookings);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (e) => {
        setSortBy(e.target.value);
    };

    const filteredAndSortedBookings = bookings
        .filter(booking => booking.id.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === 'status') {
                return a.status.localeCompare(b.status);
            }
            return 0;
        });

    const handleAddSupplementaryOrder = (bookingId) => {
        // Xử lý logic để thêm đơn hàng bổ sung
        console.log(`Thêm đơn hàng bổ sung cho booking ${bookingId}`);
        // Ở đây bạn có thể mở một modal hoặc chuyển hướng đến trang tạo đơn hàng bổ sung
    };

    return (
        <div className={styles.pageLayout}>
            <nav className={styles.sideMenu}>
                <DoctorNavBar />
            </nav>
            <main className={styles.mainContent}>
                <div className={styles.container}>
                    <h1>Quản lý lịch hẹn</h1>
                    <div className={styles.controls}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm mã lịch hẹn"
                            value={searchTerm}
                            onChange={handleSearch}
                            className={styles.searchInput}
                        />
                        <select value={sortBy} onChange={handleSort} className={styles.sortSelect}>
                            <option value="date">Sắp xếp theo ngày</option>
                            <option value="status">Sắp xếp theo trạng thái</option>
                        </select>
                    </div>
                    <table className={styles.bookingTable}>
                        <thead>
                        <tr>
                            <th>Mã lịch hẹn</th>
                            <th>Tên bệnh nhân</th>
                            <th>Ngày</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAndSortedBookings.map(booking => (
                            <tr key={booking.id}>
                                <td>{booking.id}</td>
                                <td>{booking.patientName}</td>
                                <td>{booking.date}</td>
                                <td>{booking.status}</td>
                                <td>
                                    {booking.status === 'Hoàn thành' && (
                                        <button
                                            onClick={() => handleAddSupplementaryOrder(booking.id)}
                                            className={styles.addOrderButton}
                                        >
                                            Thêm đơn hàng bổ sung
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default DoctorBooking;
