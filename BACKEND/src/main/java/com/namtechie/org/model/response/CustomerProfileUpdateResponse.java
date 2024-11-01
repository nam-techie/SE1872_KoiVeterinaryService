package com.namtechie.org.model.response;

import lombok.Data;

@Data
public class CustomerProfileUpdateResponse {
    String customerUsername;
    String phoneNumber;
    String email;
    String address;
}
