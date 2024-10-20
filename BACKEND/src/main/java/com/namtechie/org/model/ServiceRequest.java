package com.namtechie.org.model;

import lombok.Data;

import java.util.Map;

@Data
public class ServiceRequest {
    private long serviceId;
    private String serviceName;
    private Map<String, Object> serviceDetails;
}
