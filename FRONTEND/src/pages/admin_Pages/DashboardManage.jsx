import React, { useState } from 'react';
import { FaShoppingCart, FaDollarSign, FaUsers, FaCalendarCheck } from 'react-icons/fa';
import useDashboard from './hooks/useDashboard';
import './styles/DashboardManage.css';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

// Hàm helper để format số
const formatNumber = (value) => {
    if (value === 0) return "0";
    if (value === null || value === undefined) return "Chưa cập nhật";
    return value.toLocaleString();
};

// Hàm helper để format tiền tệ
const formatCurrency = (value) => {
    if (value === null || value === undefined) return 'Chưa cập nhật';
    return `${value.toLocaleString()}đ`;
};

// Thêm hàm format thời gian
const formatDateTime = (date, time) => {
    const formattedDate = new Date(date).toLocaleDateString('vi-VN');
    return `${time} - ${formattedDate}`;
};

const formatCreatedTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString('vi-VN')} ${date.toLocaleTimeString('vi-VN')}`;
};

// Thêm hàm lấy màu cho trạng thái
const getStatusColor = (status) => {
    switch (status) {
        case 'Chờ bác sĩ xác nhận':
            return '#FF9800';  // Màu cam
        case 'Đã xác nhận':
            return '#2196F3';  // Màu xanh dương
        case 'Đang cung cấp dịch vụ':
            return '#9C27B0';  // Màu tím
        case 'Thực hiện xong dịch vụ':
            return '#4CAF50';  // Màu xanh lá
        case 'Chờ thanh toán tiền dịch vụ':
            return '#FFC107';  // Màu vàng
        case 'Thanh toán tiền dịch vụ thành công':
            return '#8BC34A';  // Màu xanh nhạt
        case 'Hoàn thành':
            return '#00BCD4';  // Màu xanh ngọc
        case 'Đã đánh giá':
            return '#3F51B5';  // Màu indigo
        case 'Đã hủy lịch':
            return '#f44336';  // Màu đỏ
        case 'Chờ thanh toán tổng tiền':
            return '#FFC107';  // Màu vàng
        default:
            return '#757575';  // Màu xám mặc định
    }
};

// Cập nhật CSS cho status badge
const getStatusStyle = (status) => {
    return {
        backgroundColor: getStatusColor(status),
        color: '#fff',
        padding: '6px 12px',
        borderRadius: '20px',
        display: 'inline-block',
        fontSize: '0.85rem',
        fontWeight: '500',
        textAlign: 'center',
        marginTop: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
    };
};

const DashboardManage = () => {
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });

    const {
        dashboardStats,
        dashboardData,
        monthlyData,
        weeklyData,
        yearlyData,
        loading,
        error,
        recentActivities,
        upcomingAppointments,
        topStats
    } = useDashboard(dateRange);

    const handleDateChange = (type, date) => {
        setDateRange(prev => ({
            ...prev,
            [type]: date
        }));
    };

    const calculatePeriodStats = () => {
        const filteredAppointments = dashboardData.appointments.filter(apt => {
            if (apt.cancel) return false;
            
            const aptDate = new Date(apt.orderTime);
            if (dateRange.startDate && dateRange.endDate) {
                return aptDate >= new Date(dateRange.startDate) && 
                       aptDate <= new Date(dateRange.endDate);
            }
            return true;
        });

        // Đếm số khách hàng unique trong kỳ
        const uniqueCustomers = new Set(
            filteredAppointments.map(apt => apt.customerId)
        ).size;

        return {
            periodOrders: filteredAppointments.length,
            periodRevenue: filteredAppointments.reduce(
                (sum, apt) => sum + (apt.totalAmount || 0), 
                0
            ),
            periodCustomers: uniqueCustomers,
            periodAppointments: filteredAppointments.length
        };
    };

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div className="dashboard-manage">
            <div className="dashboard-header">
                <h1>Tổng Quan Hoạt Động</h1>
                <div className="date-picker-container">
                    <input 
                        type="date" 
                        value={dateRange.startDate}
                        onChange={(e) => handleDateChange('startDate', e.target.value)}
                    />
                    <span>đến</span>
                    <input 
                        type="date"
                        value={dateRange.endDate}
                        onChange={(e) => handleDateChange('endDate', e.target.value)}
                    />
                </div>
            </div>

            <div className="stats-container">
                {/* Phần Thống Kê Theo Thời Gian */}
                <div className="period-stats-container">
                    <h2>Thống Kê Theo Thời Gian</h2>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon orders">
                                <FaShoppingCart />
                            </div>
                            <div className="stat-info">
                                <h3>Đơn Hàng Trong Kỳ</h3>
                                <p>{calculatePeriodStats().periodOrders}</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon revenue">
                                <FaDollarSign />
                            </div>
                            <div className="stat-info">
                                <h3>Doanh Thu Trong Kỳ</h3>
                                <p>{formatCurrency(calculatePeriodStats().periodRevenue)}</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon customers">
                                <FaUsers />
                            </div>
                            <div className="stat-info">
                                <h3>Khách Hàng Trong Kỳ</h3>
                                <p>{calculatePeriodStats().periodCustomers}</p>
                            </div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon appointments">
                                <FaCalendarCheck />
                            </div>
                            <div className="stat-info">
                                <h3>Lịch Hẹn Trong Kỳ</h3>
                                <p>{calculatePeriodStats().periodAppointments}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phần Tổng Số Liệu */}
                <div className="total-stats-container">
                    <h2>Tổng Số Liệu</h2>
                    <div className="total-stats-grid">
                        <div className="total-stat-card">
                            <div className="stat-icon customers">
                                <FaUsers />
                            </div>
                            <div className="stat-info">
                                <h3>Tổng Khách Hàng</h3>
                                <p>{dashboardData.totalCustomers || 'Chưa cập nhật'}</p>
                            </div>
                        </div>

                        <div className="total-stat-card">
                            <div className="stat-icon appointments">
                                <FaCalendarCheck />
                            </div>
                            <div className="stat-info">
                                <h3>Tổng Lịch Hẹn</h3>
                                <p>{dashboardData.totalAppointments || 'Chưa cập nhật'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="top-stats-container">
                    <h2>Thống Kê Hàng Đầu</h2>
                    <div className="top-stats-grid">
                        <div className="top-stat-card">
                            <h3>Top Bác Sĩ</h3>
                            <div className="top-list">
                                {topStats.topDoctors.map((doctor, index) => (
                                    <div key={doctor.id} className="top-item">
                                        <div className="rank">{index + 1}</div>
                                        <div className="info">
                                            <span className="name">{doctor.name}</span>
                                            <span className="id">Mã bác sĩ: {doctor.id}</span>
                                            <span className="count">{doctor.appointmentCount} cuộc hẹn</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="top-stat-card">
                            <h3>Top Khách Hàng</h3>
                            <div className="top-list">
                                {topStats.topCustomers.map((customer, index) => (
                                    <div key={customer.id} className="top-item">
                                        <div className="rank">{index + 1}</div>
                                        <div className="info">
                                            <span className="name">{customer.name}</span>
                                            <span className="id">Mã khách hàng: {customer.id}</span>
                                            <span className="count">{customer.appointmentCount} lần đặt</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="top-stat-card">
                            <h3>Dịch Vụ Phổ Biến Nhất</h3>
                            <div className="top-list">
                                {topStats.topServices.map((service) => (
                                    <div key={service.id} className="top-item">
                                        <div className="rank">1</div>
                                        <div className="info">
                                            <span className="name">{service.name}</span>
                                            <span className="id">Mã dịch vụ: {service.id}</span>
                                            <span className="count">{service.appointmentCount} lần đặt</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="chart-section">
                {/* Biểu đồ theo tuần */}
                <div className="chart-container">
                    <h2>Biểu Đồ 7 Ngày Gần Đây</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={weeklyData || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#666" fontSize={12} />
                            <YAxis 
                                yAxisId="left" 
                                orientation="left"
                                stroke="#8884d8"
                            />
                            <YAxis 
                                yAxisId="right" 
                                orientation="right"
                                stroke="#82ca9d"
                            />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="left" dataKey="revenue" name="Doanh Thu (nghìn đồng)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="orders" name="Số Đơn Hàng" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Biểu đồ theo tháng */}
                <div className="chart-container">
                    <h2>Biểu Đồ Theo Tháng</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={monthlyData || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#666" fontSize={12} />
                            <YAxis 
                                yAxisId="left" 
                                orientation="left"
                                stroke="#8884d8"
                            />
                            <YAxis 
                                yAxisId="right" 
                                orientation="right"
                                stroke="#82ca9d"
                            />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="left" dataKey="revenue" name="Doanh Thu (nghìn đồng)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="orders" name="Số Đơn Hàng" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Biểu đồ theo năm */}
                <div className="chart-container">
                    <h2>Biểu Đồ Theo Năm</h2>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={yearlyData || []} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" stroke="#666" fontSize={12} />
                            <YAxis 
                                yAxisId="left" 
                                orientation="left"
                                stroke="#8884d8"
                            />
                            <YAxis 
                                yAxisId="right" 
                                orientation="right"
                                stroke="#82ca9d"
                            />
                            <Tooltip />
                            <Legend />
                            <Bar yAxisId="left" dataKey="revenue" name="Doanh Thu (nghìn đồng)" fill="#8884d8" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="orders" name="Số Đơn Hàng" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="recent-activities">
                <h2>Hoạt Động Gần Đây</h2>
                <div className="activity-list">
                    {upcomingAppointments
                        .sort((a, b) => b.appointmentId - a.appointmentId)
                        .map((appointment, index) => (
                        <div key={appointment.appointmentId} className="activity-item">
                            <div className="activity-info">
                                <div className="activity-header">
                                    <span className="appointment-id">
                                        Mã cuộc hẹn: #{appointment.appointmentId}
                                    </span>
                                    <span className="appointment-time">
                                        Thời gian tạo: {formatCreatedTime(appointment.appointmentTime)}
                                    </span>
                                </div>
                                <h3 className="service-name">{appointment.appointmentName}</h3>
                                <div className="appointment-details">
                                    <div className="detail-row">
                                        <span className="label">Thời gian khám:</span>
                                        <span className="value">
                                            {formatDateTime(appointment.bookingDate, appointment.bookingTime)}
                                        </span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Khách hàng:</span>
                                        <span className="value">{appointment.customerName}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Bác sĩ:</span>
                                        <span className="value">{appointment.doctorName}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Địa điểm:</span>
                                        <span className="value">
                                            {appointment.address ? 
                                                (appointment.address.includes('null') ? 'Trung tâm' : appointment.address)
                                                : 'Chưa cập nhật'
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="appointment-status" 
                                     style={{backgroundColor: getStatusColor(appointment.appointmentStatus)}}>
                                    {appointment.appointmentStatus}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardManage;
