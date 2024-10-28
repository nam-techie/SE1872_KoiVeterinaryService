import React from 'react';
import {Button, Card, Typography, Stepper, Step, StepLabel, Grid} from '@mui/material';
import {CustomerNavBar} from "../../components/Navbar.jsx";
import Footer from "../../components/Footer.jsx";  // CSS Module import
import styles from '../customer_Pages/styles/AppointmentPage.module.css';

const appointmentData = {
    id: 'DH0001',
    bookingDate: '27/10/2024',
    bookingTime: '14:00:00',
    customerName: 'Kiều Trọng Khánh',
    phone: '012345789',
    address: 'D1, FPT',
    service: 'Khám tại nhà',
    problem: 'Nó bị đau',
    detailAddress: '1A Trần Hưng Đạo, HCM',
    appointmentDate: '30/10/2024',
    appointmentTime: '16:00',
    doctor: 'Phân bổ bởi trung tâm',
    totalAmount: '4.000.000 VND',
    currentStatus: 0
};

const steps = [
    'Chờ xác nhận',
    'Đã xác nhận',
    'Chờ thanh toán phí lần 1',
    'Đã thanh toán',
    'Đang thực hiện dịch vụ',
    'Chờ thanh toán phí lần 2',
    'Đã thanh toán',
    'Hoàn thành'
];

const AppointmentPage = () => {
    return (
        <>
            <CustomerNavBar/>
            <Grid container justifyContent="center" style={{padding: '20px'}}>
                <Card style={{
                    padding: '20px',
                    maxWidth: '900px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">MÃ LỊCH HẸN: {appointmentData.id}</Typography>
                        <Button variant="outlined" color="error">HỦY LỊCH HẸN</Button>
                    </Grid>

                    <Typography variant="subtitle1" color="textSecondary" style={{marginTop: '10px'}}>
                        Ngày đặt: {appointmentData.bookingDate} - Giờ: {appointmentData.bookingTime}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">Họ tên
                        KH: {appointmentData.customerName}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">SĐT: {appointmentData.phone}</Typography>
                    <Typography variant="subtitle1" color="textSecondary">Địa
                        chỉ: {appointmentData.address}</Typography>

                    <Card style={{marginTop: '20px', padding: '16px', backgroundColor: '#fafafa'}}>
                        <Typography variant="h6">Chi tiết lịch hẹn</Typography>
                        <Grid container spacing={2} style={{marginTop: '10px'}}>
                            <Grid item xs={6}>
                                <Typography>Dịch vụ: {appointmentData.service}</Typography>
                                <Typography>Miêu tả vấn đề: {appointmentData.problem}</Typography>
                                <Typography>Địa chỉ chi tiết: {appointmentData.detailAddress}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>Ngày khám: {appointmentData.appointmentDate}</Typography>
                                <Typography>Giờ khám: {appointmentData.appointmentTime}</Typography>
                                <Typography>Bác sĩ: {appointmentData.doctor}</Typography>
                            </Grid>
                        </Grid>
                    </Card>

                    <Stepper activeStep={appointmentData.currentStatus} style={{marginTop: '20px'}}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Grid container justifyContent="space-between" alignItems="center" style={{marginTop: '20px'}}>
                        <Typography variant="h6" color="primary">TỔNG TIỀN CẦN THANH
                            TOÁN: {appointmentData.totalAmount}</Typography>
                        <Button variant="contained" color="primary">THANH TOÁN</Button>
                    </Grid>
                </Card>
            </Grid>
            <Footer/>
        </>
    );
};

export default AppointmentPage;
