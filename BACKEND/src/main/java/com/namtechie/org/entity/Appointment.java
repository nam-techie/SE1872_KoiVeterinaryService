package com.namtechie.org.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "customers_id", nullable = false)
    @JsonBackReference
    private Customers customers;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    @JsonBackReference
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "service_type_id", nullable = false)
    @JsonBackReference
    private ServiceType serviceType;

    @ManyToOne
    @JoinColumn(name = "zone_id")
    @JsonBackReference
    private Zone zone;

    //Quan he hai chieu voi appointmentdetail
    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private AppointmentDetail appointmentDetail;

    @Column(nullable = false)
    private boolean isVeterianAssigned;

    @Column(nullable = false)
    private boolean isCancel;

}
