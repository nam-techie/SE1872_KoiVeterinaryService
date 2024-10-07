package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DoctorsInfo {
    @Id
    private Long doctorId;

    @OneToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private String phone;
    private String email;
    private String introduction;
    private String services;
    private String training;
    private String workExperience;
    private String achievements;
    private String researchPapers;
}
