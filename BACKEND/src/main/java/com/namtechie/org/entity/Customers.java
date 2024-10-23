package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;


@Entity
@Data
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    @JsonBackReference
    private Account account;

    @OneToMany(mappedBy = "customers", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"customers"})
    private List<Appointment> appointment;


    @Column(name = "fullname", length = 255)
    private String fullName;


    @Column(name = "phone", length = 50)
    private String phone;

    @Column(name = "address", length = 255)
    private String address;

    public Customers() {

    }

    public Customers(Account account) {
        this.account = account;
    }
}
