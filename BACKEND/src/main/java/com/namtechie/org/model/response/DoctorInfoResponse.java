package com.namtechie.org.model.response;

import lombok.Data;

@Data
public class DoctorInfoResponse {
    String fullName;
    String phone;
    Integer experience;
    String specialty;
    String description;
    String qualification;
    String ImageUrl;
}
