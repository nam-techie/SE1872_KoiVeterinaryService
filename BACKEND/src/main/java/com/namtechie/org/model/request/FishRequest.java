package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class FishRequest {
    private long appointmentId;

    private String name;

    private String breed;

    private int age;

    private String color;

    private float weight;

    private String healthStatus;
}