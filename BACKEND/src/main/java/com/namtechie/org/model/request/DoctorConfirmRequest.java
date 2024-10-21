package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class DoctorConfirmRequest {
    boolean isConfirmed;
    long id;
    String note;
}
