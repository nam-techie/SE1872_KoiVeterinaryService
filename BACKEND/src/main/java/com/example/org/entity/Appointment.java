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
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    @JsonIgnoreProperties({"appointment"})
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "veterian_id", nullable = false)
    @JsonIgnoreProperties({"appointment"})
    private Veterian veterian;

    @ManyToOne
    @JoinColumn(name = "service_type_id", nullable = false)
    @JsonIgnoreProperties({"appointment"})
    private ServiceType serviceType;

    @ManyToOne
    @JoinColumn(name = "zone_id")
    @JsonIgnoreProperties({"appointment"})
    private Zone zone;

    //Quan he hai chieu voi appointmentdetail
    @OneToOne(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private AppointmentDetail appointmentDetail;

    //Quan he hai chieu voi appointmentdetail
    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<AppointmentStatus> appointmentStatus;

    @Column(nullable = false)
    private boolean isVeterianAssigned;

    @Column(nullable = false)
    private boolean isCancel;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<FeedBack> feedBack;

}
