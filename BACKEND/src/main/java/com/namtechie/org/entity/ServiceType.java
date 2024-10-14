package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private long base_price;

    @OneToMany(mappedBy = "serviceType", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Appointment> appointments;

}
