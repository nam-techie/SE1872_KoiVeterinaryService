package com.namtechie.org.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data

public class DoctorInfoResponse {
    String fullName;
    String phone;
    Integer experience;
    String specialty;
    String description;
    String qualification;
    String ImageUrl;
    double rate;
}
