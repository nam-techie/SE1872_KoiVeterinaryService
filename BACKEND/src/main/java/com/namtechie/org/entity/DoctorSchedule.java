package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import lombok.Data;

import java.sql.Time;

@Entity
@Data
public class DoctorSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonBackReference
    private Doctor doctor;

    @Column(nullable = false)
    private String workDay;

    @Column(nullable = false)
    private Time startTime;

    @Column(nullable = false)
    private Time endTime;

}
