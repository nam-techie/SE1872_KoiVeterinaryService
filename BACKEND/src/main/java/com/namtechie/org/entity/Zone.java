package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "NVARCHAR(MAX)")
    private String name;
    
    private long fee;

    @OneToMany(mappedBy = "zone", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"zone"})
    private List<Appointment> appointment;
}
