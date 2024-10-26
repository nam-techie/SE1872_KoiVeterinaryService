import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';
import { DoctorNavBar } from "../../components/Navbar.jsx";
import { Card, Row, Col } from 'antd';
import styles from '../doctor_Pages/styles/DoctorDashBoard.module.css';
import avatar from "../../assets/homePage_images/doctorAvatar.jpg";

function DoctorDashBoard() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Mock data for doctor information
    const [doctorInfo, setDoctorInfo] = useState({
        fullname: "Bác Sĩ A",
        phone: "0123456789",
        experience: 10,
        image_url: avatar
    });

    const dashboardInfo = {
        totalAppointmentsToday: 8,
        unconfirmedAppointments: 3,
        totalFeedback: 5
    };

    // Show modal
    const showModal = () => {
        setIsModalVisible(true);
        form.setFieldsValue(doctorInfo); // Set current doctor info to the form
    };

    // Handle cancel modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Handle form submission (updating info)
    const handleFormSubmit = (values) => {
        setDoctorInfo({ ...doctorInfo, ...values });
        setIsModalVisible(false);
    };

    return (
        <>
            <DoctorNavBar />
            <div className={styles.doctorDashBoardWrapper}>
                <div className={styles.doctorDashBoardContainer}>
                    {/* Left section: Doctor Info */}
                    <div className={styles.doctorInfoSection}>
                        <h2>{doctorInfo.fullname}</h2>
                        <img src={doctorInfo.image_url} alt="Doctor Avatar" className={styles.doctorAvatar} />
                        <p><strong>Số điện thoại:</strong> {doctorInfo.phone}</p>
                        <p><strong>Kinh nghiệm:</strong> {doctorInfo.experience} năm</p>
                        <Button type="primary" onClick={showModal}>Chỉnh sửa thông tin</Button>
                    </div>

                    {/* Right section: Dashboard Stats */}
                    <div className={styles.dashboardStatsSection}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Card bordered={false} className={`${styles.statCard} ${styles.appointmentsCard}`}>
                                    <h1>Hôm nay bạn có {dashboardInfo.totalAppointmentsToday} lịch hẹn</h1>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card bordered={false} className={`${styles.statCard} ${styles.unconfirmedCard}`}>
                                    <h1>Có {dashboardInfo.unconfirmedAppointments} đơn chưa xác nhận</h1>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>

                {/* Modal for editing personal info */}
                <Modal
                    title="Chỉnh sửa thông tin cá nhân"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleFormSubmit}
                    >
                        <Form.Item
                            label="Họ và tên"
                            name="fullname"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Kinh nghiệm (năm)"
                            name="experience"
                            rules={[{ required: true, message: 'Vui lòng nhập số năm kinh nghiệm!' }]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Lưu thông tin
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </>
    );
}

export default DoctorDashBoard;
