package com.namtechie.org.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponeDTO {
    private Long serviceRequestID;
    private String fullNameCustomer;
    private String fullNameVeterian;
    private String serviceType;
    private Date requestDate;
    private Date preferredDate;
    private String address;
    private String status = "Pending";
}
