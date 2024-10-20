package com.namtechie.org.model;

import lombok.Data;

@Data
public class VeterianConfirmRequest {
    boolean isConfirmed;
    long id;
    String note;
}
