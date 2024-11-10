package com.namtechie.org.model.request;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AppointmentDetail {
    long appointmentId;
    Timestamp orderTime;
    long totalAmount;
    long customerId;
    long doctorId;
    long serviceId;
    long zoneId;
    boolean cancel;

}
