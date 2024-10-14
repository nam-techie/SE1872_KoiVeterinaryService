package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private long fee;

    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Appointment> appointments;

}
