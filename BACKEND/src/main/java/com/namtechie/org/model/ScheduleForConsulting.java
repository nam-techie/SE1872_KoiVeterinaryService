package com.namtechie.org.model;

import com.namtechie.org.entity.Doctor;
import lombok.Data;

import java.sql.Time;

@Data
public class ScheduleForConsulting {
    private Doctor doctor;
    private Time bookingTime;

}
