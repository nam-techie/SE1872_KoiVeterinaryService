package com.namtechie.org.model;

import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class Schedule {
    Date date;
    Time startTime;
    Time endTime;
    boolean isAvailable;

    public Schedule(Date date, Time startTime, Time endTime, boolean isAvailable) {
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isAvailable = isAvailable;
    }
}
