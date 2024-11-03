package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class CancelReasonRequest {
    long appointmentId;
    String cancelReason;
}
