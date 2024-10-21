package com.namtechie.org.model;

import lombok.Data;

@Data
public class DoctorConfirmRequest {
    boolean isConfirmed;
    long id;
    String note;
}
