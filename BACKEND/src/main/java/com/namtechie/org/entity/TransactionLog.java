package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


import java.sql.Timestamp;

@Entity
@Data
public class TransactionLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    @Column(nullable = false)
    private long price;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    @JsonBackReference
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "appointment_status_id", nullable = false)
    @JsonBackReference
    private AppointmentStatus appointmentStatus;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Timestamp date;

    @Column(nullable = false)
    private int transactionType;

    @Column(nullable = false)
    private int transactionMethod;


}
