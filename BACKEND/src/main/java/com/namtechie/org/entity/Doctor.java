package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne
    @JoinColumn(name = "account_id", nullable = false)
    @JsonBackReference
    private Account account;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<DoctorSchedule> veterianSchedules;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnoreProperties({"doctor"})
    @JsonIgnore
    private List<Appointment> appointment;

    @OneToOne(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private DoctorInfo doctorInfo;

    @Column(length = 255)
    private String fullname;


    @Column(length = 255)
    private String phone;

    @Column
    private Integer experience;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

}
