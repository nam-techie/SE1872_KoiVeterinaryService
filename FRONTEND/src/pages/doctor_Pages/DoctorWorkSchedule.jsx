import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/vi'; // Thêm ngôn ngữ tiếng Việt cho moment
import styles from '../doctor_Pages/styles/DoctorWorkSchedule.module.css';
import { DoctorNavBar } from "../../components/Navbar.jsx";

moment.locale('vi'); // Thiết lập locale cho moment thành tiếng Việt

const localizer = momentLocalizer(moment);

function DoctorWorkSchedule() {
    // Sử dụng useState để lưu trữ mock data tạm thời
    const [events, setEvents] = useState([]);

    // useEffect để giả lập việc gọi API
    useEffect(() => {
        // Giả lập việc gọi API và nhận dữ liệu sự kiện sau 2 giây
        const fetchData = () => {
            const mockEvents = [
                {
                    title: 'Chờ bác sĩ xác nhận',
                    start: new Date(2024, 9, 27, 9, 0),
                    end: new Date(2024, 9, 27, 12, 0),
                },
                {
                    title: 'Đã xác nhận',
                    start: new Date(2024, 9, 28, 13, 0),
                    end: new Date(2024, 9, 28, 15, 0),
                },
                {
                    title: 'Đang cung cấp dịch vụ',
                    start: new Date(2024, 9, 29, 8, 0),
                    end: new Date(2024, 9, 29, 10, 0),
                },
                {
                    title: 'Đã hoàn thành',
                    start: new Date(2024, 9, 29, 14, 0),
                    end: new Date(2024, 9, 29, 16, 0),
                },
                {
                    title: 'Chờ bác sĩ xác nhận',
                    start: new Date(2024, 9, 30, 10, 0),
                    end: new Date(2024, 9, 30, 11, 30),
                }
            ];

            // Cập nhật events sau 2 giây (giả lập việc nhận dữ liệu từ API)
            setTimeout(() => setEvents(mockEvents), 2000);
        };

        fetchData();
    }, []); // useEffect sẽ chỉ chạy một lần khi component được mount

    // Thêm hàm eventPropGetter để tùy chỉnh style cho từng sự kiện
    const eventStyleGetter = (event) => {
        let backgroundColor = '';
        
        switch (event.title) {
            case 'Chờ bác sĩ xác nhận':
                backgroundColor = '#fc0e0e'; // màu đỏ
                break;
            case 'Đã xác nhận':
                backgroundColor = '#1b4df2'; // màu xanh nước
                break;
            case 'Đang cung cấp dịch vụ':
                backgroundColor = '#067715'; // màu xanh lá
                break;
            case 'Đã hoàn thành':
                backgroundColor = '#95bf16'; // màu vàng
                break;
            default:
                backgroundColor = '#3174ad'; // màu mặc định
        }

        return {
            style: {
                backgroundColor,
                borderRadius: '5px',
                opacity: 0.8,
                color: 'white',
                border: 'none',
                display: 'block'
            }
        };
    };

    return (
        <>
            <DoctorNavBar />
            <div className={styles.workScheduleWrapper}>
                <h2>Lịch Làm Việc của Bác Sĩ</h2>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    eventPropGetter={eventStyleGetter}
                    messages={{
                        today: 'Hôm nay',
                        previous: 'Trước',
                        next: 'Sau',
                        day: 'Ngày',
                        week: 'Tuần',
                        month: 'Tháng',
                        date: 'Ngày',
                        time: 'Thời gian',
                        event: 'Sự kiện',
                        noEventsInRange: 'Không có sự kiện nào trong khoảng thời gian này.',
                    }}
                    views={['day', 'week', 'month']}
                />
            </div>
        </>
    );
}

export default DoctorWorkSchedule;
