package com.namtechie.org.model.response;

import lombok.Data;


import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Data
public class AppointmentStatusResponse {
    long appointmentId;
    Date appointmentDate;
    Timestamp appointmentTime;
    String serviceType;
    String appointmentStatus;


}
