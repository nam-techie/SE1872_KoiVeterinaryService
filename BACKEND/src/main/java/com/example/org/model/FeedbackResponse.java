package com.example.org.model;

import com.example.org.entity.Appointment;

import java.sql.Date;

public class FeedbackResponse {
    private long id;
    private Appointment appointment;
    private int rating;
    private String comment;
    private Date created_date;
}
