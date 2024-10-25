package com.namtechie.org.entity;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Time;

@Entity
@Data
public class DoctorsSchedules {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    private String workDay;
    private Time startTime;
    private Time endTime;
}
