package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private List<DoctorsSchedules> doctorsSchedulesList;

    @OneToOne(mappedBy = "doctor", cascade = CascadeType.ALL)
    @JsonManagedReference
    private DoctorInfo doctorInfo;

    @Column(length = 255)
    private String fullName;

    @Column(length = 255)
    private String phone;

    @Column
    private Integer experience;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;
}
