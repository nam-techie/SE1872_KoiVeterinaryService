package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class CancelRequest {
    long appointmentId;
    String notes;
}
