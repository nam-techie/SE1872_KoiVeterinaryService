package com.namtechie.org.model.response;

import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Data
public class DoctorAppointmentResponse {
    long id;
    long medicalRecordId;
    String fullNameCustomer;
    String appointmentStatus;
    String nameService;
    Timestamp createdDate;
    Time appointmentBookingTime;
    Date appointmentBookingDate;
    String nameZone;
    String addressDetails;
    String phoneNumber;
    String description;
    String isSelectDoctor;
}
