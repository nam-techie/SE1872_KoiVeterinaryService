package com.namtechie.org.entity;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class DoctorsSchedules {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Doctor doctor;

    private String workDay;
    private String startTime;
    private String endTime;
}
