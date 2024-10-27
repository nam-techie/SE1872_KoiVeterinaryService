package com.namtechie.org.model.request;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;


@Data
public class AppointmentRequest {
    long serviceTypeId;

    @Pattern(regexp = "(84|0[35789])\\d{8}", message="Invalid Vietnamese Phone")
    String phone;

    String description;
    long zoneId;
    String address;
    long doctorId;
    Date bookingDate;
    Time bookingTime;

}
