package com.namtechie.org.model.request;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {

    @Size(min = 6, message = "Password must be at least 6 digits!")
    String password;
}
