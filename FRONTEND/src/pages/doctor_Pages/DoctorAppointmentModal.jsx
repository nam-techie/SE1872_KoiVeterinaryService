import React, { useState, useEffect } from "react";
import {
    Button,
    Card,
    Typography,
    Grid,
    Dialog,
    DialogContent,
    DialogActions,
} from "@mui/material";

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
};

const DocktorModal = ({ appointmentID, open, onClose }) => {
    const [appointmentData, setAppointmentDetails] = useState({});
    console.log("check appointmentID", appointmentID);

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
    }, [appointmentID]); // Run effect only when appointmentID changes`

    const consultationDetails = appointmentData.consultationDetails || {};

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            sx={{ overflowX: "hidden" }}
        >
            <h1
                style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "1.5rem", // Kích thước font tương tự DialogTitle
                    fontWeight: 500, // Độ đậm chữ tương tự
                    margin: "0", // Không có margin
                    padding: "16px 0", // Padding tương tự DialogTitle
                }}
            >
                Mã Lịch Hẹn: {appointmentID}
            </h1>
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
                </Card>
                <DialogActions>
                    <Button
                        variant="contained"
                        onClick={onClose}
                        color="primary"
                    >
                        Đóng
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default DocktorModal;
