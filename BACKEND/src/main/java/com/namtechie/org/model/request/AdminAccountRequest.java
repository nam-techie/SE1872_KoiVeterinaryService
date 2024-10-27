package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class AdminAccountRequest {
    String email;
    String role;
    String username;
}
