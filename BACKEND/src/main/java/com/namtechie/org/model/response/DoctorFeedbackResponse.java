package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

import java.util.Date;

@Data
@NonNull
public class DoctorFeedbackResponse {
    long id;
    String username;
    long rating;
    Date createdDate;
    String serviceName;
    String comments;
}

