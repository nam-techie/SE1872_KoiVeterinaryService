package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

@Data
@NonNull
public class InfoCustomerResponse {
    String username;
    String email;
    String fullName;
    String phone;
    String address;
}
