package com.namtechie.org.model.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    String oldPassword;
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự.")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$",
            message = "Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.")
    private String newPassword;

    private String confirmPassword;
}