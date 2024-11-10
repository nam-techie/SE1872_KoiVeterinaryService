package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

@Data
@NonNull
public class InfoKoiResponse {

    String name;

    String breed;

    int age;

    String color;

    float weight;

    String healthStatus;

}

