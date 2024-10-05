package com.namtechie.org.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequestDTO {
    private Long customerID; // Chỉ lấy ID
    private Long veterianID; // Chỉ lấy ID
    private String serviceType;
    private Date requestDate;
    private Date preferredDate;
    private String status;
    private String phone;
    private String address;
}
