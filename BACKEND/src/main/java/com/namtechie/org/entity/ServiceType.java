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


    private String name;


    private long base_price;


    private String description;

    @OneToMany(mappedBy = "serviceType", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"serviceType"})
    private List<Appointment> appointment;
}
