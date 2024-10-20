package com.namtechie.org.model;

import lombok.Data;

@Data
public class FeedbackRequest {
    long appointmentId;
    int rating;
    String comment;

}
