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


    const [topStats, setTopStats] = useState({
        topCustomers: [],
        topServices: [],
        topDoctors: []
    });


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


            // Xử lý dữ liệu cho các biểu đồ
            const monthData = processMonthlyData(response.data.appointments || []);
            const weekData = processWeeklyData(response.data.appointments || []);
            const yearData = processYearlyData(response.data.appointments || []);


            setMonthlyData(monthData);
            setWeeklyData(weekData);
            setYearlyData(yearData);

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


        // Đm số khách hàng unique trong kỳ
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


    const fetchUpcomingAppointments = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/admin/getAppointment7DaysUpComing');
            // Sắp xếp theo appointmentId giảm dần (ID lớn nhất lên đầu)
            const sortedAppointments = response.data.sort((a, b) => b.appointmentId - a.appointmentId);
            setUpcomingAppointments(sortedAppointments);
        } catch (err) {
            console.error('Error fetching upcoming appointments:', err);
        }
    }, []);


    useEffect(() => {
        fetchUpcomingAppointments();
    }, [fetchUpcomingAppointments]);


    const fetchTopStats = useCallback(async () => {
        try {
            const response = await axiosInstance.get('/admin/findTop3Variable');
            setTopStats(response.data);
        } catch (err) {
            console.error('Error fetching top stats:', err);
        }
    }, []);


    useEffect(() => {
        fetchTopStats();
    }, [fetchTopStats]);


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
        yearlyData,
        topStats
    };
};


const processMonthlyData = (appointments) => {
    // Lấy năm hiện tại
    const currentYear = new Date().getFullYear();
    
    // Lọc chỉ lấy dữ liệu của năm hiện tại
    const appointmentsInCurrentYear = appointments.filter(apt => {
        const date = new Date(apt.orderTime);
        return date.getFullYear() === currentYear;
    });

    // Khởi tạo dữ liệu cho 12 tháng
    const monthlyStats = new Map();
    for (let i = 1; i <= 12; i++) {
        monthlyStats.set(`T${i}`, {
            name: `T${i}`,
            revenue: 0,
            orders: 0
        });
    }

    // Tính toán dữ liệu cho từng tháng
    appointmentsInCurrentYear.forEach(apt => {
        if (!apt.cancel) { // Chỉ tính các lịch hẹn không bị hủy
            const date = new Date(apt.orderTime);
            const monthKey = `T${date.getMonth() + 1}`;
            const stats = monthlyStats.get(monthKey);
            
            stats.revenue += apt.totalAmount || 0;
            stats.orders += 1;
        }
    });

    // Chuyển đổi Map thành mảng và sắp xếp theo thứ tự tháng
    return Array.from(monthlyStats.values());
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


// Thêm hàm xử lý dữ liệu theo năm
const processYearlyData = (appointments) => {
    // Lấy năm hiện tại
    const currentYear = new Date().getFullYear();

    // Tạo mảng 3 năm gần nhất
    const yearlyStats = new Map();

    // Khởi tạo dữ liệu cho 3 năm
    for(let i = 0; i < 3; i++) {
        const year = currentYear - i;
        yearlyStats.set(year.toString(), {
            name: `Năm ${year}`,
            revenue: 0,
            orders: 0
        });
    }


    // Lọc và tính toán dữ liệu
    appointments.forEach(apt => {
        const date = new Date(apt.orderTime);
        const year = date.getFullYear();

        if (yearlyStats.has(year.toString()) && !apt.cancel) {
            const stats = yearlyStats.get(year.toString());
            stats.revenue += apt.totalAmount || 0;
            stats.orders += 1;
        }
    });


    // Chuyển đổi Map thành mảng và sắp xếp theo năm giảm dần
    return Array.from(yearlyStats.values())
        .sort((a, b) => {
            const yearA = parseInt(a.name.split(' ')[1]);
            const yearB = parseInt(b.name.split(' ')[1]);
            return yearB - yearA;
        });
};


export default useDashboard;





