package com.namtechie.org.model.request;


import lombok.Data;

@Data
public class RegisterRequest {
    String username;
    String email;
    String password;
    String confirmPassword;
}
