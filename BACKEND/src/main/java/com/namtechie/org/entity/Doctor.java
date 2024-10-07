package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Set;

@Entity
@Data
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    private String fullname;
    private String specialty;
    private String phone;
    private String introduction;
    private String training;
    private String workExperience;
    private String achievements;
    private String researchPapers;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private Set<DoctorsSchedules> schedules;
}