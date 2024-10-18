package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "appointment_id", nullable = false)
    @JsonBackReference
    private Appointment appointment;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Transaction> transaction;

    private long totalFee;

    private Timestamp updateTime;


}
