package com.namtechie.org.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;


import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

@Data
public class AppointmentStatusResponse {
    long appointmentId;
    Date appointmentDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    Timestamp timestamp;
    String serviceType;
    String appointmentStatus;

}
