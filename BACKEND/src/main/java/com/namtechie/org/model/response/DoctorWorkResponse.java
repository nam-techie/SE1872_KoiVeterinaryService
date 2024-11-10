package com.namtechie.org.model.response;

import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class DoctorWorkResponse {
    long appointmentId;
    String serviceType;
    Date appointmentDate;
    Time appointmentTimeStart;
    Time appointmentTimeEnd;
    String appointmentStatus;
}
