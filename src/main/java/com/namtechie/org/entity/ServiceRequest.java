package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "ServiceRequests")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceRequestID;

    @ManyToOne
    @JoinColumn(name = "customerID", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "veterianID", nullable = false)
    private Veterian veterian;

    @Column(nullable = false)
    private String serviceType;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date requestDate;


    @Column(nullable = false)
    private Date preferredDate;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String address;

}
