package com.namtechie.org.model.response;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.namtechie.org.entity.Appointment;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class FishResponse {
    private long id;

    private long appointmentId;

    private String name;

    private String breed;

    private int age;

    private String color;

    private float weight;

    private String healthStatus;

}
