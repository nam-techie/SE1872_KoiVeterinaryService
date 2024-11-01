package com.namtechie.org.model.response;

import lombok.Data;
import lombok.NonNull;

@Data
@NonNull
public class InfoCusResponse {
    String fullName;
    String address;
    String phone;
}
