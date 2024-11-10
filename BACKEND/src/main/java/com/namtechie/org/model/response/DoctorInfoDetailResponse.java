package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

import java.util.List;
@Data
@NonNull
public class DoctorInfoDetailResponse {
    DoctorInfoResponse doctorInfo;
    List<DoctorFeedbackResponse> feedback;
}
