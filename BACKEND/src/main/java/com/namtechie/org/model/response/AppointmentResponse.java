package com.namtechie.org.model.response;

import lombok.Data;

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
