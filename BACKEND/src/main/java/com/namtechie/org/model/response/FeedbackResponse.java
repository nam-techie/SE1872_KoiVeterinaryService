package com.namtechie.org.model.response;

import com.namtechie.org.entity.Appointment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import java.sql.Date;
@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackResponse {
    String username;
    int rating;
    String comment;
    Date created_date;
}
