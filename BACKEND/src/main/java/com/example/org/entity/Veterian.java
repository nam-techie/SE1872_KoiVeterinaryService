package com.example.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Veterian {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    @JsonBackReference
    private Account account;

    @OneToMany(mappedBy = "veterian", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<VeterianSchedule> veterianSchedules;

    @OneToMany(mappedBy = "veterian", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnoreProperties({"veterian"})
    @JsonIgnore
    private List<Appointment> appointment;

    @OneToOne(mappedBy = "veterian", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private VeterianInfo veterianInfo;

    @Column(length = 255)
    private String fullname;


    @Column(length = 255)
    private String phone;

    @Column
    private Integer experience;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

}
