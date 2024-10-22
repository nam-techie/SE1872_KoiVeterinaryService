package com.namtechie.org.model.response;

import lombok.Data;

@Data
public class AccountResponse {
    String token;
    public AccountResponse(String token) {
        this.token = token;
    }
}
