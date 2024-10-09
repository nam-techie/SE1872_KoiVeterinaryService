package com.example.org.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private long basePrice;

    @Column(nullable = false)
    private String description;

    @OneToMany(mappedBy = "serviceType", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Appointment> appointments;
}
