import { DoctorNavBar } from "../../components/Navbar.jsx";
import { Card, Row, Col } from 'antd';
import styles from '../doctor_Pages/styles/DoctorDashBoard.module.css';
import  avatar from "../../assets/homePage_images/doctorAvatar.jpg";

function DoctorDashBoard() {
    // Mock data for doctor information with image URL
    const doctorInfo = {
        id: 1,
        account_id: 101,
        fullname: "Bác Sĩ A",
        sex: true,
        phone: "0123456789",
        experience: 10,
        image_url: avatar
    };

    // Mock data for dashboard stats
    const dashboardInfo = {
        totalAppointmentsToday: 8,
        unconfirmedAppointments: 3,
        totalFeedback: 5
    };

    return (
        <>
            <DoctorNavBar />
            <div className={styles.doctorDashBoardWrapper}>
                <div className={styles.doctorDashBoardContainer}>
                    {/* Left side: Doctor Information */}
                    <div className={styles.doctorInfoSection}>
                        <h2>{doctorInfo.fullname}</h2>
                        <img
                            src={doctorInfo.image_url}
                            alt="Doctor Avatar"
                            className={styles.doctorAvatar} // Class for styling the image
                        />
                        <p><strong>Sex:</strong> {doctorInfo.sex ? "Male" : "Female"}</p>
                        <p><strong>Phone:</strong> {doctorInfo.phone}</p>
                        <p><strong>Experience:</strong> {doctorInfo.experience} years</p>
                    </div>

                    {/* Right side: Dashboard with 3 vertical sections */}
                    <div className={styles.dashboardStatsSection}>
                        <Row gutter={[16, 16]} style={{ height: '100%' }}>
                            <Col span={24}>
                                <Card
                                    bordered={false}
                                    className={`${styles.statCard} ${styles.appointmentsCard}`}
                                >
                                    <h1>Chào bác sĩ! Hôm nay anh đã nhận được {dashboardInfo.totalAppointmentsToday} lịch đặt</h1>
                                    <p>Ấn vào đây để hoàn thành Nhé</p>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card
                                    bordered={false}
                                    className={`${styles.statCard} ${styles.unconfirmedCard}`}
                                >
                                    <h1>Chào bác sĩ! Có {dashboardInfo.unconfirmedAppointments} đơn chưa hoàn thành</h1>
                                    <p>Ấn vào đây để hoàn thành Nhé</p>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card
                                    bordered={false}
                                    className={`${styles.statCard} ${styles.feedbackCard}`}
                                >
                                    <h1>Chào bác sĩ! Hôm nay anh đã nhận được {dashboardInfo.totalFeedback} đánh giá</h1>
                                    <p>Ấn vào đây để hoàn thành Nhé</p>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorDashBoard;
