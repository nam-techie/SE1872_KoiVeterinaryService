package com.namtechie.org.model.request;

import lombok.Data;
import lombok.NonNull;

@Data
@NonNull
public class ServiceTypeRequestAll {
    private String name;

    private String breed;

    private int age;

    private String color;

    private float weight;

    private String healthStatus;

    boolean serviceTypeId5;
    boolean serviceTypeId6;
    boolean serviceTypeId7;
    boolean serviceTypeId8;
    boolean serviceTypeId9;
    String notes;

}
