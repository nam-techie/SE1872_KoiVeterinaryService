import { useState, useEffect } from 'react';
import { Button, Modal, List, Tag, Descriptions, message } from 'antd';
import styles from '../doctor_Pages/styles/DoctorAppointment.module.css';
import { DoctorNavBar } from "../../components/Navbar.jsx";

function DoctorAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isDetailModalVisible, setDetailModalVisible] = useState(false);

    // Mock data for appointments
    useEffect(() => {
        const mockAppointments = [
            {
                id: 1,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations"
            },

            {
                id: 2,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations"
            },

            {
                id: 3,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations"
            },

            {
                id: 4,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations"
            },

            {
                id: 5,
                customer_name: "John Doe",
                service: "General Checkup",
                status: "Pending",
                date: "2023-05-15",
                time: "10:00 AM",
                pet_name: "Max",
                pet_type: "Dog",
                pet_breed: "Golden Retriever",
                note: "Annual checkup and vaccinations"
            },
            // ... more mock appointments ...
        ];
        setAppointments(mockAppointments);
    }, []);

    const handleStatusChange = (appointmentId, newStatus) => {
        setAppointments(prev => prev.map(app =>
            app.id === appointmentId ? { ...app, status: newStatus } : app
        ));
        message.success(`Cuộc hẹn đã ${getStatusText(newStatus).toLowerCase()} thành công`);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'gold';
            case 'Confirmed': return 'green';
            case 'Rejected': return 'red';
            case 'Completed': return 'blue';
            default: return 'default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Pending': return 'Đang chờ';
            case 'Confirmed': return 'Đã xác nhận';
            case 'Rejected': return 'Đã từ chối';
            case 'Completed': return 'Đã hoàn thành';
            default: return status;
        }
    };

    return (
        <>
            <DoctorNavBar />
            <div className={styles.doctorAppointmentContainer}>
                <h1 className={styles.doctorAppointmentHeader}>Quản lý lịch hẹn</h1>
                <List
                    className={styles.doctorAppointmentList}
                    itemLayout="horizontal"
                    dataSource={appointments}
                    renderItem={appointment => (
                        <List.Item className={styles.doctorAppointmentListItem}>
                            <List.Item.Meta
                                title={`${appointment.customer_name} - ${appointment.service}`}
                                description={
                                    <>
                                        <p>Ngày: {appointment.date} | Giờ: {appointment.time}</p>
                                        <Tag color={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Tag>
                                    </>
                                }
                            />
                            <div className={styles.doctorAppointmentActions}>
                                <Button
                                    className={styles.doctorAppointmentButton}
                                    onClick={() => {
                                        setSelectedAppointment(appointment);
                                        setDetailModalVisible(true);
                                    }}
                                >
                                    Xem chi tiết
                                </Button>
                                {appointment.status === 'Pending' && (
                                    <>
                                        <Button
                                            className={styles.doctorAppointmentButton}
                                            onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                                        >
                                            Xác nhận
                                        </Button>
                                        <Button
                                            className={`${styles.doctorAppointmentButton} ${styles.danger}`}
                                            onClick={() => handleStatusChange(appointment.id, 'Rejected')}
                                        >
                                            Từ chối
                                        </Button>
                                    </>
                                )}
                                {appointment.status === 'Confirmed' && (
                                    <Button
                                        className={styles.doctorAppointmentButton}
                                        onClick={() => handleStatusChange(appointment.id, 'Completed')}
                                    >
                                        Hoàn thành
                                    </Button>
                                )}
                            </div>
                        </List.Item>
                    )}
                />

                {/* Appointment Detail Modal */}
                <Modal
                    title="Chi tiết lịch hẹn"
                    visible={isDetailModalVisible}
                    onCancel={() => setDetailModalVisible(false)}
                    footer={null}
                    width={700}
                >
                    {selectedAppointment && (
                        <Descriptions bordered column={2}>
                            <Descriptions.Item label="Họ và tên Khách hàng">{selectedAppointment.customer_name}</Descriptions.Item>
                            <Descriptions.Item label="Dịch vụ">{selectedAppointment.service}</Descriptions.Item>
                            <Descriptions.Item label="Ngày">{selectedAppointment.date}</Descriptions.Item>
                            <Descriptions.Item label="Giờ">{selectedAppointment.time}</Descriptions.Item>
                            <Descriptions.Item label="Tên cá Koi">{selectedAppointment.pet_name}</Descriptions.Item>
                            <Descriptions.Item label="Loại">{selectedAppointment.pet_type}</Descriptions.Item>
                            <Descriptions.Item label="Giống">
                                {selectedAppointment.pet_breed}
                            </Descriptions.Item>
                            <Descriptions.Item label="Trạng thái">
                                <Tag color={getStatusColor(selectedAppointment.status)}>
                                    {getStatusText(selectedAppointment.status)}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ghi chú" span={2}>
                                {selectedAppointment.note}
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                </Modal>
            </div>
        </>
    );
}

export default DoctorAppointment;
