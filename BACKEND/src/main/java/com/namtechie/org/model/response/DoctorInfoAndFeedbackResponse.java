package com.namtechie.org.model.response;

import com.namtechie.org.entity.FeedBack;
import lombok.Data;

import java.util.List;

@Data
public class DoctorInfoAndFeedbackResponse {
    DoctorInfoResponse doctorInfo;
    List<FeedbackResponse> feedback;
}
