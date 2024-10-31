package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;


import java.sql.Timestamp;

@Entity
@Data
public class PaymentDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;


    private long price;

    @ManyToOne
    @JoinColumn(name = "payment_id", nullable = false)
    @JsonBackReference
    private Payment payment;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String transactionType;


    private String transactionMethod;

    @CreationTimestamp
    private Timestamp transactionDate;

    private boolean status;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String notes;

}