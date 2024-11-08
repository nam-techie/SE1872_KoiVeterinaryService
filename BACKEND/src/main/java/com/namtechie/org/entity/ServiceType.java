package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class ServiceType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String name;


    private long base_price;

    @Column(columnDefinition = "TEXT")
    private String description;

    private boolean isDeleted;

    @OneToMany(mappedBy = "serviceType", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"serviceType"})
    @JsonIgnore
    private List<Appointment> appointment;
}