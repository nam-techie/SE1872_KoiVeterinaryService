package com.namtechie.org.model.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class DoctorRequest {
    String fullName;
    String phone;
    Integer experience;
    String specialty;
    String description;
    String qualification;
    MultipartFile ImageUrl;
}
