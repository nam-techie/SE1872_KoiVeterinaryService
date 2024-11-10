package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class ServiceRequest {
    String name;
    String description;
    long base_price;
}
