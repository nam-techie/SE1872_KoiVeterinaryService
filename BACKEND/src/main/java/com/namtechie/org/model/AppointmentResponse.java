package com.namtechie.org.model;

import lombok.Data;

import java.sql.Time;
import java.sql.Date;

@Data
public class AppointmentResponse {
     long id;
     long customerID;
     long doctorID;
     long serviceID;
     long appointmentDetailID;
     long appointmentStatusID;
     long zoneID;
     boolean isCancel;
     boolean isDoctorAssigned;

}
