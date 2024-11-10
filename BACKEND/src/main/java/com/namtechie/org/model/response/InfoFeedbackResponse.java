package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

@Data
@NonNull
public class InfoFeedbackResponse {
    int rate;
    String feedback;

}
