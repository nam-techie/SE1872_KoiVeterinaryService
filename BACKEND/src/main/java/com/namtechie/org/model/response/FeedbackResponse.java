package com.namtechie.org.model.response;

import com.namtechie.org.entity.Appointment;

import java.sql.Date;

public class FeedbackResponse {
    private long id;
    private Appointment appointment;
    private int rating;
    private String comment;
    private Date created_date;
}
