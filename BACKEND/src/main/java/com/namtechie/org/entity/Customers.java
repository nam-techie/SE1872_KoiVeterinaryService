package com.namtechie.org.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @Column(name = "fullName", length = 255)
    private String fullName;

    @Column(name = "phoneNumber", length = 50)
    private String phoneNumber;

    @Column(name = "address", length = 255)
    private String address;
}
