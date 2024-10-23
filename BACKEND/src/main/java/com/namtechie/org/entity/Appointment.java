package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "customers_id", nullable = false)
    @JsonIgnoreProperties({"appointment"})
    private Customers customers;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonIgnoreProperties({"appointment"})
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "service_type_id", nullable = false)
    @JsonIgnoreProperties({"appointment"})
    private ServiceType serviceType;

    @ManyToOne
    @JoinColumn(name = "zone_id")
    @JsonIgnoreProperties({"appointment"})
    private Zone zone;

    //Quan he hai chieu voi appointment_info
    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private AppointmentInfo appointmentInfo;

    //Quan he hai chieu voi appointmentStatus
    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<AppointmentStatus> appointmentStatus;

    @Column(nullable = false)
    private boolean isDoctorAssigned;

    @Column(nullable = false)
    private boolean isCancel;

    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    @JsonIgnore
    private FeedBack feedBack;

}
