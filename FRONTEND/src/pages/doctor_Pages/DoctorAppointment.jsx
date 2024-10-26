import { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, List } from 'antd';
import styles from '../../styles/DoctorAppointment.module.css';
import {DoctorNavBar} from "../../components/Navbar.jsx"; // Assuming you're using CSS Modules

function DoctorAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [isRejectModalVisible, setRejectModalVisible] = useState(false);
    const [isMedicalFormVisible, setMedicalFormVisible] = useState(false);
    const [medicalRecord, setMedicalRecord] = useState({
        name: '',
        breed: '',
        age: '',
        color: '',
        weight: '',
        health_status: ''
    });

    // Mock data for appointments (since you don’t have real data)
    useEffect(() => {
        const mockAppointments = [
            {
                id: 1,
                customer_name: "John Doe",
                status: "Created",
                veterian_id: 101,
            },
            {
                id: 2,
                customer_name: "Jane Smith",
                status: "DoctorAccept",
                veterian_id: 101,
            },
            {
                id: 3,
                customer_name: "Alice Johnson",
                status: "Incost",
                veterian_id: 101,
            },
        ];
        setAppointments(mockAppointments);
    }, []);

    // Confirm appointment
    const confirmAppointment = (appointmentId) => {
        setAppointments(prev => prev.map(app => app.id === appointmentId ? { ...app, status: 'DoctorAccept' } : app));
    };

    // Reject appointment
    const rejectAppointment = () => {
        if (!selectedAppointment) return;
        setAppointments(prev => prev.map(app => app.id === selectedAppointment.id ? { ...app, status: 'Canceled' } : app));
        setRejectModalVisible(false);
    };

    // Submit medical record
    const submitMedicalRecord = () => {
        console.log("Medical Record Submitted", medicalRecord);
        setMedicalFormVisible(false);
    };

    return (
        <>
            <DoctorNavBar/>
            <div className={styles.doctorAppointmentContainer}>
                <h1 className={styles.doctorAppointmentHeader}>Your Appointments</h1>
                <List
                    className={styles.doctorAppointmentList}
                    itemLayout="horizontal"
                    dataSource={appointments}
                    renderItem={appointment => (
                        <List.Item className={styles.doctorAppointmentListItem}>
                            <List.Item.Meta
                                title={`Appointment with ${appointment.customer_name}`}
                                description={`Status: ${appointment.status}`}
                            />
                            <div className={styles.doctorAppointmentActions}>
                                {appointment.status === 'Created' && (
                                    <>
                                        <Button className={styles.doctorAppointmentButton}
                                                onClick={() => confirmAppointment(appointment.id)}>Confirm</Button>
                                        <Button className={styles.doctorAppointmentButton} onClick={() => {
                                            setRejectModalVisible(true);
                                            setSelectedAppointment(appointment);
                                        }}>Reject</Button>
                                    </>
                                )}
                                {appointment.status === 'DoctorAccept' && (
                                    <Button className={styles.doctorAppointmentButton} disabled={false}>Execute</Button>
                                )}
                                {appointment.status === 'Incost' && (
                                    <Button className={styles.doctorAppointmentButton} onClick={() => {
                                        setMedicalFormVisible(true);
                                        setSelectedAppointment(appointment);
                                    }}>Complete</Button>
                                )}
                            </div>
                        </List.Item>
                    )}
                />

                {/* Reject Reason Modal */}
                <Modal
                    title="Reject Appointment"
                    visible={isRejectModalVisible}
                    onCancel={() => setRejectModalVisible(false)}
                    onOk={rejectAppointment}
                >
                    <Input.TextArea
                        placeholder="Enter reason for rejection"
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                    />
                </Modal>

                {/* Medical Record Form */}
                <Modal
                    title="Medical Record"
                    visible={isMedicalFormVisible}
                    onCancel={() => setMedicalFormVisible(false)}
                    onOk={submitMedicalRecord}
                >
                    <Form layout="vertical">
                        <Form.Item label="Name" required>
                            <Input value={medicalRecord.name}
                                   onChange={(e) => setMedicalRecord(prev => ({...prev, name: e.target.value}))}/>
                        </Form.Item>
                        <Form.Item label="Breed">
                            <Input value={medicalRecord.breed}
                                   onChange={(e) => setMedicalRecord(prev => ({...prev, breed: e.target.value}))}/>
                        </Form.Item>
                        <Form.Item label="Age">
                            <Input value={medicalRecord.age}
                                   onChange={(e) => setMedicalRecord(prev => ({...prev, age: e.target.value}))}/>
                        </Form.Item>
                        <Form.Item label="Color">
                            <Input value={medicalRecord.color}
                                   onChange={(e) => setMedicalRecord(prev => ({...prev, color: e.target.value}))}/>
                        </Form.Item>
                        <Form.Item label="Weight">
                            <Input value={medicalRecord.weight}
                                   onChange={(e) => setMedicalRecord(prev => ({...prev, weight: e.target.value}))}/>
                        </Form.Item>
                        <Form.Item label="Health Status" required>
                            <Input value={medicalRecord.health_status} onChange={(e) => setMedicalRecord(prev => ({
                                ...prev,
                                health_status: e.target.value
                            }))}/>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>

    );
}

export default DoctorAppointment;
