import React, { useState, useEffect } from 'react';
import { CustomerNavBar } from "../../components/Navbar";
import styles from "./styles/ManageAppointment.module.css";
import Footer from "../../components/Footer";
import useManageCus from '../../hooks/useManageCus';
import { FaSearch } from 'react-icons/fa';
import LoadingCat from '../../components/LoadingCat.jsx';

const ManageAppointment = () => {
    const { getAppointments } = useManageCus();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateSearch, setDateSearch] = useState('');
    const [sortBy, setSortBy] = useState('appointmentDate');
    const [sortOrder, setSortOrder] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchAppointments = async () => {
        try {
            const data = await getAppointments();
            setAppointments(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();

        const interval = setInterval(() => {
            fetchAppointments();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) return <LoadingCat />;
    if (error) return <div>Lỗi: {error}</div>;

    const filteredAndSortedAppointments = appointments
        .filter(appointment => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = 
                appointment.appointmentId?.toString().includes(searchLower) ||
                appointment.serviceType?.toLowerCase().includes(searchLower);

            const matchesStatus = statusFilter === 'all' || 
                appointment.appointmentStatus === statusFilter;

            if (dateSearch) {
                return matchesSearch && appointment.appointmentDate.includes(dateSearch) && matchesStatus;
            }
            return matchesSearch && matchesStatus;
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
                            className={styles.statusSelect}
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="Chờ bác sĩ xác nhận">Chờ bác sĩ xác nhận</option>
                            <option value="Đã xác nhận">Đã xác nhận</option>
                            <option value="Đang cung cấp d���ch vụ">Đang cung cấp dịch vụ</option>
                            <option value="Thực hiện xong dịch vụ">Thực hiện xong dịch vụ</option>
                            <option value="Chờ thanh toán tiền dịch vụ">Chờ thanh toán tiền dịch vụ</option>
                            <option value="Thanh toán tiền dịch vụ thành công">Thanh toán tiền dịch vụ thành công</option>
                            <option value="Hoàn thành">Hoàn thành</option>
                            <option value="Đã hủy lịch">Đã hủy lịch</option>
                        </select>
                        
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
                                        {(appointment.appointmentStatus === 'Chờ bác sĩ xác nhận' ||
                                          appointment.appointmentStatus === 'Đã xác nhận' ||
                                          appointment.appointmentStatus === 'Chờ thanh toán tiền dịch vụ' ||
                                          appointment.appointmentStatus === 'Thanh toán tiền dịch vụ thành công') && (
                                            <button 
                                                className={styles.cancelButton}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Hủy lịch
                                            </button>
                                        )}
                                        {(appointment.appointmentStatus === 'Đã xác nhận' || 
                                          appointment.appointmentStatus === 'Thực hiện xong dịch vụ') && (
                                            <button 
                                                className={styles.paymentButton}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Thanh toán
                                            </button>
                                        )}
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