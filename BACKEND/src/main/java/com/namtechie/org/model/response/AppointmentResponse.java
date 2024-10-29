package com.namtechie.org.model.response;

import com.namtechie.org.entity.PaymentDetail;
import lombok.Data;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Data
public class AppointmentResponse {
     long id;
     String fullNameCustomer;
     String fullNameDoctor;
     String appointmentStatus;
     String nameService;
     Timestamp createdDate;
     Time appointmentBookingTime;
     Date appointmentBookingDate;
     String nameZone;
     String addressDetails;
     String phoneNumber;
     String description;
     long totalPrice;
     long price;
     String moreServiceTypeName;


}
