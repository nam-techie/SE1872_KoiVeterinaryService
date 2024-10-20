package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import lombok.Data;

import java.sql.Time;

@Entity
@Data
public class VeterianSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "veterian_id", nullable = false)
    @JsonBackReference
    private Veterian veterian;

    @Column(nullable = false)
    private String workDay;

    @Column(nullable = false)
    private Time startTime;

    @Column(nullable = false)
    private Time endTime;

}
