// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { CustomerNavBar } from "../../components/Navbar";
import styles from "./styles/ManageAppointment.module.css";
import Footer from "../../components/Footer";
import useManageCus from '../../hooks/useManageCus';
import { FaSearch } from 'react-icons/fa';

const ManageAppointment = () => {
    const { appointments, loading, error } = useManageCus();
    const [searchTerm, setSearchTerm] = useState('');
    const [dateSearch, setDateSearch] = useState('');
    const [sortBy, setSortBy] = useState('appointmentDate');
    const [sortOrder, setSortOrder] = useState('asc');

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    // Lọc và sắp xếp dữ liệu
    const filteredAndSortedAppointments = appointments
        .filter(appointment => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                appointment.appointmentId?.toString().includes(searchLower) ||
                appointment.serviceType?.toLowerCase().includes(searchLower) ||
                appointment.appointmentStatus?.toLowerCase().includes(searchLower);

            if (dateSearch) {
                return matchesSearch && appointment.appointmentDate.includes(dateSearch);
            }
            return matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'appointmentDate') {
                const dateA = new Date(a.appointmentDate);
                const dateB = new Date(b.appointmentDate);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            }
            return 0;
        });

    return (
        <>
            <CustomerNavBar />
            <div className={styles.container}>
                <div className={styles.headerWrapper}>
                    <div className={styles.header}>
                        <h1>Quản Lý Lịch Hẹn </h1>
                    </div>

                    <div className={styles.searchContainer}>
                        <div className={styles.searchBox}>
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm..." 
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
                        </div>
                        
                        <input
                            type="date"
                            className={styles.dateInput}
                            value={dateSearch}
                            onChange={(e) => setDateSearch(e.target.value)}
                        />
                        
                        <select
                            className={styles.sortSelect}
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                        >
                            <option value="asc">Sắp xếp theo ngày ↑</option>
                            <option value="desc">Sắp xếp theo ngày ↓</option>
                        </select>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.appointmentTable}>
                        <thead>
                            <tr>
                                <th>ID lịch hẹn</th>
                                <th>Thời gian</th>
                                <th>Ngày</th>
                                <th>Dịch vụ</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedAppointments.map((appointment) => (
                                <tr key={appointment.appointmentId}>
                                    <td>{appointment.appointmentId}</td>
                                    <td>{appointment.appointmentTime}</td>
                                    <td>{appointment.appointmentDate}</td>
                                    <td>{appointment.serviceType}</td>
                                    <td>
                                        <span className={`${styles.status} ${styles[appointment.appointmentStatus?.replace(/\s+/g, '')] || ''}`}>
                                            {appointment.appointmentStatus}
                                        </span>
                                    </td>
                                    <td>
                                        <button className={styles.detailButton}>
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ManageAppointment;