package com.namtechie.org.model.response;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class PaymentResponse {
    private Long appointmentId;
    private long totalPrice;
    private long serviceFee;
    private long zoneFee;

}
