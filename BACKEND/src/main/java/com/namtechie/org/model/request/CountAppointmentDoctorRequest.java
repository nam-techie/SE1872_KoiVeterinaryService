package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class CountAppointmentDoctorRequest {
    long totalAppointments;
    long cancelledAppointments;
    long doneAppointments;
    long waitAppointments;
}
