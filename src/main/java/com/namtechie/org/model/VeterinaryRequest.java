package com.namtechie.org.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VeterinaryRequest {

    @NotBlank(message = "Họ và Tên không được để trống")
    @Size(min = 1, max = 100, message = "Họ và Tên phải từ 1 đến 100 ký tự")
    @Pattern(regexp = "^[a-zA-Z ]+$",
            message = "Họ và Tên chỉ được chứa chữ cái thường, chữ hoa và khoảng trắng, không bao gồm số hoặc ký tự đặc biệt")
    @Column(nullable = false, length = 100)
    String fullName;


    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    @Pattern(regexp = "^[^\\s]+$", message = "Email không được chứa dấu cách")
    @Column(nullable = false, unique = true)
    String email;
}
