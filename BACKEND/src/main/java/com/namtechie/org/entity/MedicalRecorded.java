package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class MedicalRecorded {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "appointment_id",nullable = false)
    @JsonBackReference
    private Appointment appointment;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String name;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String breed;

    private int age;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String color;

    private float weight;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String healthStatus;
}