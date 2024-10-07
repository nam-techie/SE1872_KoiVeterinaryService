package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class OTPRequest {
    String otp;
    String password;
    String confirmPassword;
}
