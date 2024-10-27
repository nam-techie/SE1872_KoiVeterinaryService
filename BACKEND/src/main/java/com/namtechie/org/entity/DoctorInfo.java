package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DoctorInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonBackReference
    private Doctor doctor;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String description;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String specialty;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String qualification;
}


