package com.namtechie.org.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.sql.Date;

@Data
@NoArgsConstructor
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
