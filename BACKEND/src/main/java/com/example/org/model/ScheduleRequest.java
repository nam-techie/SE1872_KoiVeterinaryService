package com.example.org.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Date;

@Data
@NoArgsConstructor
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
