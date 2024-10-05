package com.namtechie.org.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
public class RegisterRequest {
    @NotBlank(message = "Tên đăng nhập không được để trống")
    @Size(min = 3, message = "Tên đăng nhập phải có từ 3 ký tự trở lên!!!")
    @Pattern(regexp = "^[^\\s]+$", message = "Tên đăng nhập không được chứa dấu cách")
    @Column(nullable = false, length = 50, unique = true)
    String username;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, message = "Mật khẩu phải có ít nhất 6 ký tự")
    @Pattern(regexp = "^[^\\s]+$", message = "Mật khẩu không được chứa dấu cách")
    @Column(nullable = false)
    String password;

    @NotBlank(message = "Xác nhận mật khẩu không được để trống")
    String confirmPassword;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    @Pattern(regexp = "^[^\\s]+$", message = "Email không được chứa dấu cách")
    @Column(nullable = false, unique = true)
    String email;


}
