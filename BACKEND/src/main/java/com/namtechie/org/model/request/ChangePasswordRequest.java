package com.namtechie.org.model.request;

import lombok.Data;

@Data
public class ChangePasswordRequest {
    String oldPassword;
    String newPassword;
    String confirmPassword;
}

