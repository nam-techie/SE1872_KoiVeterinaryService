package com.namtechie.org.controller;

import com.namtechie.org.entity.Doctor;
import com.namtechie.org.model.UpdateDoctorLogin;
import com.namtechie.org.model.request.DoctorRequest;
import com.namtechie.org.service.DoctorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/veterinary")
@RestController
@PreAuthorize("hasAuthority('VETERINARY')") // set từng thằng
@SecurityRequirement(name = "api")

public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @PutMapping("/updateInfo")
    public ResponseEntity updateInforVeterinary(DoctorRequest doctorRequest) {
        Doctor updateDoctor = doctorService.addInfoVeterinary(doctorRequest);
        return ResponseEntity.ok(updateDoctor);
    }

    @PutMapping("/updateAccount")
    public ResponseEntity updateAccount(UpdateDoctorLogin updateInfo) {
        doctorService.updateAccount(updateInfo);
        return ResponseEntity.ok("Thay đổi thông tin tài khoản bác sĩ thành công!");
    }




}
