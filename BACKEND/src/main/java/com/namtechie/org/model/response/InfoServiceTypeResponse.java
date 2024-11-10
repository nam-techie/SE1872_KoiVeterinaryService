package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

@Data
@NonNull
public class InfoServiceTypeResponse {
    long serviceTypeId;
    String serviceTypeName;
    long serviceTypePrice;
    boolean statusPayment;
    }
