package com.namtechie.org.model;

import lombok.Data;

@Data
public class UpdateDoctorLogin {
    String username;
    String password;
    String confirmPassword;
}
