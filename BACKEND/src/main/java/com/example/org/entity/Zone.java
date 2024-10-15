package com.example.org.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private long fee;

    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"zone"})
    private List<Appointment> appointment;
}
