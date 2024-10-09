package com.example.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private List<VeterianSchedule> veterianSchedules;

    @OneToMany(mappedBy = "veterian", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Appointment> appointments;

    @OneToOne(mappedBy = "veterian", cascade = CascadeType.ALL)
    @JsonManagedReference
    private VeterianInfo veterianInfo;

    @Column(length = 255)
    private String fullname;

    @Column
    private Boolean sex;

    @Column(length = 255)
    private String phone;

    @Column
    private Integer experience;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

}
