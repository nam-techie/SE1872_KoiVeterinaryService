package com.namtechie.org.model.response;

import jakarta.persistence.PostLoad;
import jakarta.persistence.PostPersist;
import lombok.Data;


import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

@Data
public class AppointmentStatusResponse {
    long appointmentId;
    Date appointmentDate;
    Time appointmentTime;
    String serviceType;
    String appointmentStatus;


}
