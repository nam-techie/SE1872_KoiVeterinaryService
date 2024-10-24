package com.namtechie.org.model.response;

import lombok.Data;

@Data
public class PaymentDepositResponse {
    private Long appointmentId;
    private long depositPrice;
}
