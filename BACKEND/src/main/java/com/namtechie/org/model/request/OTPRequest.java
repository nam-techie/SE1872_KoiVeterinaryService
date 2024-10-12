package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class OTPRequest {
    String email;
    String password;
    String confirmPassword;
}
