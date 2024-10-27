package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @OneToOne
    @JoinColumn(name = "appointment_id",nullable = false)
    @JsonBackReference
    private Appointment appointment;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonBackReference
    private List<PaymentDetail> transactions;

    @Column
    private long totalFee;

    @Column
    @CreationTimestamp
    private Timestamp updateTime;

}
