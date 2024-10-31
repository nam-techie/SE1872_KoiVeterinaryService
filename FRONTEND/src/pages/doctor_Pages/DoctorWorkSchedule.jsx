import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/vi';
import styles from './styles/DoctorWorkSchedule.module.css';
import { DoctorNavBar } from "../../components/Navbar.jsx";
import useDoctorWork from './hooks/useDoctorWork';
import LoadingCat from '../../components/LoadingCat.jsx';

moment.locale('vi');
const localizer = momentLocalizer(moment);

function DoctorWorkSchedule() {
    const { appointments, loading, error } = useDoctorWork();

    const eventStyleGetter = (event) => {
        let backgroundColor = '';
        
        switch (event.status) {
            case 'Chờ bác sĩ xác nhận':
                backgroundColor = '#fc0e0e';
                break;
            case 'Đã xác nhận':
                backgroundColor = '#1b4df2';
                break;
            case 'Đang cung cấp dịch vụ':
                backgroundColor = '#067715';
                break;
            case 'Đã hoàn thành':
                backgroundColor = '#95bf16';
                break;
            case 'Đã hủy lịch':
                backgroundColor = '#808080';
                break;
            default:
                backgroundColor = '#3174ad';
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

    if (loading) return <LoadingCat />;
    if (error) return <div>Có lỗi xảy ra: {error}</div>;

    return (
        <>
            <DoctorNavBar />
            <div className={styles.workScheduleWrapper}>
                <h2>Lịch Làm Việc của Bác Sĩ</h2>
                <Calendar
                    localizer={localizer}
                    events={appointments}
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
