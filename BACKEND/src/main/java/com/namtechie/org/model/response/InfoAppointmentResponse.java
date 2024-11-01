package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Data
@NonNull
public class InfoAppointmentResponse {
    Timestamp appointmentTime;
    Date appointmentDate;
    String serviceType;
    Time time;
    String address;
    String status;
    String doctorName;
    boolean isDoctorAssigned;
}

