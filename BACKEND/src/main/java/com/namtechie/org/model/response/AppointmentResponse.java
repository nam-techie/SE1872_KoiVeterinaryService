package com.namtechie.org.model.response;

import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class AppointmentResponse {
     long id;
     String fullName;
     String status;
     String nameService;
     Time appointmentBookingTime;
     Date appointmentBookingDate;
     String nameZone;

}
