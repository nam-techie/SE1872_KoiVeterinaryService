package com.namtechie.org.model.request;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class CustomerInfoRequest {

    @Pattern(regexp = "^[a-zA-Z ]+$", message = "Họ và tên chỉ được dùng chữ cái (không sử dụng chữ số và kí tự)!!!!")
    String fullName;

    @Pattern(regexp = "\\d+", message = "Chỉ được phép sử dụng chữ số!")
    String phoneNumber;

    String address;
}
