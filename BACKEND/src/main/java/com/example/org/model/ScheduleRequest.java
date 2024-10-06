package com.example.org.model;

import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class ScheduleRequest {
    Date date;
    Time startTime;
    Time endTime;
    boolean isAvailable;

    public ScheduleRequest(Date date, Time startTime, Time endTime, boolean isAvailable) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isAvailable = isAvailable;
    }
}
