package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class DoctorRequest {
    String fullName;
    String specialty;
    String phone;
    String introduction;
    String training;
    String workExperience;
    String achievements;
    String researchPapers;

}
