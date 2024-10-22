package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class DoctorRequest {
    String fullName;
    String phone;
    Integer experience;
    String specialty;
    String description;
    String qualification;
}
