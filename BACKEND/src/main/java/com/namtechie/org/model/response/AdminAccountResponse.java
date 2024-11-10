package com.namtechie.org.model.response;

import lombok.Data;

@Data
public class AdminAccountResponse {
    String originalUsername;
    String email;
    String role;
    String username;
}
