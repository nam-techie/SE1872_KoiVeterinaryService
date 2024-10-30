import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/vi'; // Thêm ngôn ngữ tiếng Việt cho moment
import styles from './styles/DoctorSchedulePage.module.css';
import { DoctorNavBar } from "../../components/Navbar.jsx";

moment.locale('vi'); // Thiết lập locale cho moment thành tiếng Việt

const localizer = momentLocalizer(moment);

function DoctorSchedulePage() {
    // Sử dụng useState để lưu trữ mock data tạm thời
    const [events, setEvents] = useState([]);

    // useEffect để giả lập việc gọi API
    useEffect(() => {
        // Giả lập việc gọi API và nhận dữ liệu sự kiện sau 2 giây
        const fetchData = () => {
            const mockEvents = [
                {
                    title: 'Khám bệnh',
                    start: new Date(2024, 9, 27, 9, 0), // October 20, 2024, 9:00 AM
                    end: new Date(2024, 9, 27, 12, 0),  // October 20, 2024, 12:00 PM
                },
                {
                    title: 'Họp nội bộ',
                    start: new Date(2024, 9, 28, 13, 0), // October 21, 2024, 1:00 PM
                    end: new Date(2024, 9, 28, 15, 0),   // October 21, 2024, 3:00 PM
                },
                // Thêm sự kiện mẫu khác nếu cần
            ];

            // Cập nhật events sau 2 giây (giả lập việc nhận dữ liệu từ API)
            setTimeout(() => setEvents(mockEvents), 2000);
        };

        fetchData();
    }, []); // useEffect sẽ chỉ chạy một lần khi component được mount

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
                    views={['day', 'week', 'month']} // Chỉ hiển thị các view mong muốn
                />
            </div>
        </>
    );
}

export default DoctorSchedulePage;
