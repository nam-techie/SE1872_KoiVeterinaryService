package com.namtechie.org.model.response;

import lombok.Data;

@Data
public class InfoServiceTypeResponse {
    long serviceTypeId;
    String serviceTypeName;
    long serviceTypePrice;
    boolean statusPayment;
    }
