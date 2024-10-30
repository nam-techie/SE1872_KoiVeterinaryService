import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import TreatmentCostTable from "./statement_of_expenses";

// Mock Data for Appointment Details
const appointmentDetails = {
    id: "DH0001",
    bookingDate: "27/10/2024",
    bookingTime: "14:00",
    customerName: "Kiều Trọng Khánh",
    phone: "012345789",
    address: "D1, FPT",
    consultationDetails: {
        service: "Khám tại nhà",
        issue: "Nổ bị đau",
        consultationDate: "30/10/2024",
        consultationTime: "16:00",
        doctor: "Phân bổ bởi trung tâm",
        location: "1A Trần Hưng Đạo, HCM",
    },
    status: "7",
    totalCost: 4000000,
};

const treatmentCosts = {
    items: [
        {
            name: "Dịch vụ 1",
            quantity: 1,
            unitPrice: 3000000,
            totalPrice: 3000000,
        },
        {
            name: "Dịch vụ 2",
            quantity: 2,
            unitPrice: 3000000,
            totalPrice: 6000000,
        },
        {
            name: "Dịch vụ 3",
            quantity: 1,
            unitPrice: 3000000,
            totalPrice: 3000000,
        },
    ],
    subTotal: 12000000,
    tax: 860000,
    grandTotal: 12860000,
};
const AppointmentModal = ({ appointmentID, steps, open, onClose }) => {
    const [appointmentData, setAppointmentDetails] = useState({});

    const getAppointmentDetails = (id) => {
        // Simulate fetching appointment details based on ID
        return appointmentDetails; // Return the mock data directly for now
    };

    useEffect(() => {
        if (appointmentID) {
            // Check if appointmentID is valid
            const response = getAppointmentDetails(appointmentID);
            setAppointmentDetails(response);
        }
    }, [appointmentID]); // Run effect only when appointmentID changes

    // Check if consultationDetails exists before accessing its properties
    const consultationDetails = appointmentData.consultationDetails || {};

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
            <DialogTitle>Mã Lịch Hẹn: {appointmentData.id}</DialogTitle>
            <DialogContent>
                <Card
                    style={{
                        padding: "20px",
                        borderRadius: "16px",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6">
                            MÃ LỊCH HẸN: {appointmentData.id}
                        </Typography>
                        {Number(appointmentData.status) < 4 && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={onClose}
                            >
                                Hủy lịch hẹn
                            </Button>
                        )}
                    </Grid>

                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        style={{ marginTop: "10px" }}
                    >
                        Ngày đặt: {appointmentData.bookingDate} - Giờ:{" "}
                        {appointmentData.bookingTime}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Họ tên KH: {appointmentData.customerName}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        SĐT: {appointmentData.phone}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Địa chỉ: {appointmentData.address}
                    </Typography>

                    <Card
                        style={{
                            marginTop: "20px",
                            padding: "16px",
                            backgroundColor: "#fafafa",
                        }}
                    >
                        <Typography variant="h6">Chi tiết lịch hẹn</Typography>
                        <Grid
                            container
                            spacing={2}
                            style={{ marginTop: "10px" }}
                        >
                            <Grid item xs={6}>
                                <Typography>
                                    Dịch vụ:{" "}
                                    {consultationDetails.service || "N/A"}
                                </Typography>
                                <Typography>
                                    Miêu tả vấn đề:{" "}
                                    {consultationDetails.issue || "N/A"}
                                </Typography>
                                <Typography>
                                    Địa chỉ chi tiết:{" "}
                                    {appointmentData.address || "N/A"}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography>
                                    Ngày khám:{" "}
                                    {consultationDetails.consultationDate ||
                                        "N/A"}
                                </Typography>
                                <Typography>
                                    Giờ khám:{" "}
                                    {consultationDetails.consultationTime ||
                                        "N/A"}
                                </Typography>
                                <Typography>
                                    Bác sĩ:{" "}
                                    {consultationDetails.doctor || "N/A"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Card>

                    <Stepper
                        activeStep={Number(appointmentData.status) || 0}
                        style={{ marginTop: "20px" }}
                    >
                        {steps.map((label, index) => (
                            <Step key={`${label}-${index}`}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {(appointmentData.status == "2" ||
                        appointmentData.status == "5") && (
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            style={{ marginTop: "20px" }}
                        >
                            <Typography variant="h6" color="primary">
                                TỔNG TIỀN CẦN THANH TOÁN:{" "}
                                {appointmentData.totalCost || "N/A"}
                            </Typography>
                            <Button variant="contained" color="secondary">
                                Thanh Toán
                            </Button>
                        </Grid>
                    )}
                </Card>
                {appointmentData.status == "7" && <TreatmentCostTable />}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose} color="primary">
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AppointmentModal;
