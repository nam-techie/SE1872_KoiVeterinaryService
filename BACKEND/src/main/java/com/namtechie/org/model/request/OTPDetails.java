package com.namtechie.org.model.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class OTPDetails {
    String otp;
    LocalDateTime expirationTime;

    public OTPDetails(String otp, LocalDateTime expirationTime) {
        this.otp = otp;
        this.expirationTime = expirationTime;
    }

}
