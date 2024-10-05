package com.example.org.model;

import lombok.Data;

@Data
public class AccountResponse {
    long id;
    String username;
    String email;
    String role;
    String token;
}
