import { useState, useEffect, useCallback } from 'react';
import { axiosInstance } from '../../../service/apiRequest';

// Interface cho kiểu dữ liệu trả về từ API
const useDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        appointments: [], // List các appointment
        totalCustomers: 0,
        totalAppointments: 0
    });
    const [monthlyData, setMonthlyData] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);
    const [yearlyData, setYearlyData] = useState([]);
    const [dashboardStats, setDashboardStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        totalAppointments: 0
    });

    // Mock data cho hoạt động gần đây
    const recentActivities = [
        {
            time: "09:30 - 02/03/2024",
            title: "Khám Định Kỳ",
            description: "Khách hàng: Nguyễn Văn A - Cá: Koi Kohaku - Dịch vụ: Khám tổng quát",
            status: "Đã hoàn thành"
        },
        {
            time: "14:00 - 02/03/2024",
            title: "Điều Trị Bệnh",
            description: "Khách hàng: Trần Thị B - Cá: Koi Showa - Dịch vụ: Điều trị đốm trắng",
            status: "Đang xử lý"
        },
        {
            time: "10:15 - 01/03/2024",
            title: "Tư Vấn Dinh Dưỡng",
            description: "Khách hàng: Lê Văn C - Cá: Koi Sanke - Dịch vụ: Tư vấn chế độ ăn",
            status: "Đã hoàn thành"
        },
        {
            time: "16:45 - 01/03/2024",
            title: "Khám Khẩn Cấp",
            description: "Khách hàng: Phạm Thị D - Cá: Koi Asagi - Dịch vụ: Cấp cứu",
            status: "Đã hoàn thành"
        },
        {
            time: "11:30 - 28/02/2024",
            title: "Kiểm Tra Nước",
            description: "Khách hàng: Hoàng Văn E - Hồ: A01 - Dịch vụ: Kiểm tra chất lượng nước",
            status: "Đã hoàn thành"
        }
    ];

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null
    });
    const [timeFilter, setTimeFilter] = useState('month');

    const [upcomingAppointments, setUpcomingAppointments] = useState([]);

    const handleTimeFilterChange = useCallback((filterType) => {
        setTimeFilter(filterType);
        const now = new Date();
        let startDate, endDate;

        switch (filterType) {
            case 'week':
                // Lấy dữ liệu 7 ngày gần nhất
                startDate = new Date(now.setDate(now.getDate() - 7));
                endDate = new Date();
                break;
            case 'month':
                // Lấy dữ liệu tháng hiện tại
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
                endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                break;
            case 'year':
                // Lấy dữ liệu năm hiện tại
                startDate = new Date(now.getFullYear(), 0, 1);
                endDate = new Date(now.getFullYear(), 11, 31);
                break;
            default:
                startDate = null;
                endDate = null;
        }

        setDateRange({ startDate, endDate });
    }, []);

    // Hàm gọi API thật
    const fetchDashboardData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/listDashboardTotalRequest');
            console.log('API Response:', response.data);
            
            setDashboardData({
                appointments: response.data.appointments || [],
                totalCustomers: response.data.totalCustomers,
                totalAppointments: response.data.totalAppointments
            });

            // Xử lý dữ liệu cho biểu đồ
            const processedData = processMonthlyData(response.data.appointments || []);
            setMonthlyData(processedData);
            
            setError(null);
        } catch (err) {
            console.error('API Error:', err);
            setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
        } finally {
            setLoading(false);
        }
    }, []);

    // Tính toán thống kê từ API thật
    const calculateStats = useCallback(() => {
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
            periodOrders: filteredAppointments.length || 0,
            periodRevenue: filteredAppointments.reduce(
                (sum, apt) => sum + (apt.totalAmount || 0), 
                0
            ),
            periodCustomers: uniqueCustomers || 0,
            periodAppointments: filteredAppointments.length || 0
        };
    }, [dashboardData, dateRange]);

    // Gọi API khi component mount
    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // Hàm cập nhật dateRange
    const updateDateRange = (startDate, endDate) => {
        setDateRange({ startDate, endDate });
    };

    // Thêm log để kiểm tra state sau khi cập nhật
    useEffect(() => {
        console.log('Dashboard Data Updated:', dashboardData);
    }, [dashboardData]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu cho cả 3 loại
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/admin/listDashboardTotalRequest');
                console.log('API Response:', response.data);
                
                setDashboardData({
                    appointments: response.data.appointments || [],
                    totalCustomers: response.data.totalCustomers,
                    totalAppointments: response.data.totalAppointments
                });

                // Xử lý dữ liệu cho các biểu đồ
                const weekData = processWeeklyData(response.data.appointments || []);
                const monthData = processMonthlyData(response.data.appointments || []);
                
                setWeeklyData(weekData);
                setMonthlyData(monthData);
                
                setError(null);
            } catch (err) {
                console.error('API Error:', err);
                setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchDashboardStats = async () => {
            try {
                const response = await axiosInstance.get('/admin/dashboard-stats');
                setDashboardStats({
                    totalOrders: response.data.totalOrders || 0,
                    totalRevenue: response.data.totalRevenue || 0,
                    totalCustomers: response.data.totalCustomers || 0,
                    totalAppointments: response.data.totalAppointments || 0
                });
            } catch (error) {
                console.error('Error fetching dashboard stats:', error);
            }
        };

        fetchDashboardStats();
    }, []);

    const fetchUpcomingAppointments = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/admin/getAppointment7DaysUpComing');
            // Sắp xếp dữ liệu ngay khi nhận về
            const sortedAppointments = response.data.sort((a, b) => a.appointmentId - b.appointmentId);
            setUpcomingAppointments(sortedAppointments);
        } catch (err) {
            console.error('Error fetching upcoming appointments:', err);
        }
    }, []);

    useEffect(() => {
        fetchUpcomingAppointments();
    }, [fetchUpcomingAppointments]);

    return {
        dashboardStats,
        dashboardData,
        monthlyData,
        weeklyData,
        loading,
        error,
        dateRange,
        updateDateRange,
        recentActivities,
        upcomingAppointments,
        yearlyData
    };
};

const processMonthlyData = (appointments) => {
    // Tạo map để lưu trữ dữ liệu theo tháng
    const monthlyStats = new Map();

    appointments.forEach(apt => {
        const date = new Date(apt.orderTime);
        const monthKey = `T${date.getMonth() + 1}`; // T1, T2, ...

        if (!monthlyStats.has(monthKey)) {
            monthlyStats.set(monthKey, {
                name: monthKey,
                revenue: 0,
                orders: 0
            });
        }

        const stats = monthlyStats.get(monthKey);
        // Chỉ tính các đơn không bị hủy
        if (!apt.cancel) {
            stats.revenue += apt.totalAmount || 0;
            stats.orders += 1;
        }
    });

    // Chuyển đổi Map thành mảng và sắp xếp theo tháng
    return Array.from(monthlyStats.values())
        .sort((a, b) => {
            const monthA = parseInt(a.name.substring(1));
            const monthB = parseInt(b.name.substring(1));
            return monthA - monthB;
        });
};

const processWeeklyData = (appointments) => {
    const last7Days = [];
    const today = new Date();
    
    // Tạo mảng 7 ngày gần nhất
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        last7Days.push({
            date: date,
            name: `Ngày ${date.getDate()}/${date.getMonth() + 1}`,
            revenue: 0,
            orders: 0
        });
    }

    // Lọc và tính toán dữ liệu cho 7 ngày
    appointments.forEach(apt => {
        const aptDate = new Date(apt.orderTime);
        const dayIndex = last7Days.findIndex(day => 
            day.date.getDate() === aptDate.getDate() &&
            day.date.getMonth() === aptDate.getMonth() &&
            day.date.getFullYear() === aptDate.getFullYear()
        );

        if (dayIndex !== -1 && !apt.cancel) {
            last7Days[dayIndex].revenue += apt.totalAmount || 0;
            last7Days[dayIndex].orders += 1;
        }
    });

    return last7Days;
};

export default useDashboard;

