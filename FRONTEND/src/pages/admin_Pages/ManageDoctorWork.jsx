import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/vi';
import Select from 'react-select';
import { FaCalendarAlt, FaUserMd, FaFilter } from 'react-icons/fa';
import './styles/ManageDoctorWork.css';
import useDoctorWork from './hooks/useDoctorWork';


moment.locale('vi');
const localizer = momentLocalizer(moment);


const ManageDoctorWork = () => {
    const { appointments, loading, error } = useDoctorWork();
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [view, setView] = useState('month');


    // Thêm option "Tất cả bác sĩ" vào đầu danh sách
    const doctorOptions = [
        { value: 'all', label: 'Tất cả bác sĩ' },
        ...[...new Set(appointments.map(apt => apt.doctorName))].map(name => ({
            value: name,
            label: name
        }))
    ];


    // Data cho trạng thái
    const statusOptions = [
        { value: 'all', label: 'Tất cả trạng thái' },
        { value: 'Chờ bác sĩ xác nhận', label: 'Chờ xác nhận' },
        { value: 'Đã xác nhận', label: 'Đã xác nhận' },
        { value: 'Đang cung cấp dịch vụ', label: 'Đang thực hiện' },
        { value: 'Đã hoàn thành', label: 'Đã hoàn thành' },
        { value: 'Đã hủy lịch', label: 'Đã hủy' }
    ];


    const filteredEvents = appointments.filter(appointment => {
        if (selectedDoctor && selectedDoctor.value !== 'all' && appointment.doctorName !== selectedDoctor.value) {
            return false;
        }
        if (selectedStatus && selectedStatus.value !== 'all' && appointment.status !== selectedStatus.value) {
            return false;
        }
        return true;
    });


    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;


    const eventStyleGetter = (event) => {
        let style = {
            backgroundColor: '#3174ad',
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: 'none',
            display: 'block'
        };


        // Đặt màu sắc dựa trên trạng thái
        switch (event.status) {
            case 'Thanh toán tiền dịch vụ thành công':
                style.backgroundColor = '#28a745'; // Xanh lá - đã hoàn thành
                break;
            case 'Đã đánh giá':
                style.backgroundColor = '#17a2b8'; // Xanh dương nhạt - đã đánh giá
                break;
            case 'Đang cung cấp dịch vụ':
                style.backgroundColor = '#007bff'; // Xanh dương - đang thực hiện
                break;
            case 'Đã hủy lịch':
                style.backgroundColor = '#dc3545'; // Đỏ - đã hủy
                break;
            case 'Chờ bác sĩ xác nhận':
                style.backgroundColor = '#ffc107'; // Vàng - chờ xác nhận
                break;
            default:
                break;
        }


        return { style };
    };


    const handleSelectEvent = (event) => {
        // Xử lý khi click vào một sự kiện
        console.log('Selected event:', event);
    };


    return (
        <div className="manage-doctor-work">
            <div className="header">
                <h1><FaCalendarAlt /> Quản Lý Lịch Làm Việc Bác Sĩ</h1>
            </div>


            <div className="filters">
                <div className="filter-item">
                    <FaUserMd className="filter-icon" />
                    <Select
                        value={selectedDoctor}
                        onChange={setSelectedDoctor}
                        options={doctorOptions}
                        placeholder="Chọn bác sĩ..."
                        className="select-filter"
                        isClearable={true}
                        isSearchable={true}
                    />
                </div>


                <div className="filter-item">
                    <FaFilter className="filter-icon" />
                    <Select
                        value={selectedStatus}
                        onChange={setSelectedStatus}
                        options={statusOptions}
                        placeholder="Lọc theo trạng thái..."
                        className="select-filter"
                    />
                </div>


                <div className="view-controls">
                    <button
                        className={`view-btn ${view === 'month' ? 'active' : ''}`}
                        onClick={() => setView('month')}
                    >
                        Tháng
                    </button>
                    <button
                        className={`view-btn ${view === 'week' ? 'active' : ''}`}
                        onClick={() => setView('week')}
                    >
                        Tuần
                    </button>
                    <button
                        className={`view-btn ${view === 'day' ? 'active' : ''}`}
                        onClick={() => setView('day')}
                    >
                        Ngày
                    </button>
                </div>
            </div>


            <div className="calendar-container">
                <Calendar
                    localizer={localizer}
                    events={filteredEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 'calc(100vh - 200px)' }}
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleSelectEvent}
                    view={view}
                    onView={setView}
                    messages={{
                        today: 'Hôm nay',
                        previous: 'Trước',
                        next: 'Sau',
                        month: 'Tháng',
                        week: 'Tuần',
                        day: 'Ngày',
                        agenda: 'Lịch trình',
                        date: 'Ngày',
                        time: 'Thời gian',
                        event: 'Sự kiện',
                        noEventsInRange: 'Không có cuộc hẹn nào trong khoảng thời gian này'
                    }}
                    popup
                    selectable
                />
            </div>
        </div>
    );
};


export default ManageDoctorWork;


