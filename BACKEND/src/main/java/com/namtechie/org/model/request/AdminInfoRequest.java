package com.namtechie.org.model.request;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AdminInfoRequest {
    String username;

    String email;

    String password;

}
