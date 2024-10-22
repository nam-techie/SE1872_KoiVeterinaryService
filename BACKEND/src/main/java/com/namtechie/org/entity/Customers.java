package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Entity
@Data
public class Customers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @OneToMany(mappedBy = "customers", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Appointment> appointments;

    @Column(name = "fullname", length = 255)
    private String fullname;

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
