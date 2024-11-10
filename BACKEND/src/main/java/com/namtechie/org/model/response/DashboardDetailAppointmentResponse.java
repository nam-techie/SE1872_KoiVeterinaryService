package com.namtechie.org.model.response;

import lombok.Data;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

@Data
public class DashboardDetailAppointmentResponse {
    long appointmentId;
    String appointmentName;
    Date bookingDate;
    Time bookingTime;
    Timestamp appointmentTime;
    String appointmentStatus;
    String doctorName;
    String customerName;
    String address;
}
