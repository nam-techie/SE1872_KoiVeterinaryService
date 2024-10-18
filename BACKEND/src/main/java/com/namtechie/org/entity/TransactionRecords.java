package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class TransactionRecords {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    @JsonBackReference
    private Payment payment;

    @OneToOne
    @JoinColumn(name = "appointment_status_id", nullable = false)
    @JsonBackReference
    private AppointmentStatus appointmentStatus;

    private int transactionMethod;
    private int transactionType;
    private Float price;
    private Timestamp transactionDate;
    private String status;
    private String notes;
}
