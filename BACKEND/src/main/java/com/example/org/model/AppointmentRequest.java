package com.example.org.model;

import lombok.Data;

import java.sql.Date;
import java.sql.Time;


@Data
public class AppointmentRequest {
    long serviceTypeId;
    String phone;
    String description;
    long zoneId;
    String address;
    long veterianId;
    Date bookingDate;
    Time bookingTime;

}
