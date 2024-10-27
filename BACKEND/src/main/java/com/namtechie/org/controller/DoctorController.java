package com.namtechie.org.controller;

import com.namtechie.org.entity.Doctor;
import com.namtechie.org.repository.DoctorRepository;
import com.namtechie.org.service.DoctorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/veterinary")
@RestController
@PreAuthorize("hasAuthority('VETERINARY')") // set từng thằng
@SecurityRequirement(name = "api")

public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @Autowired
    private DoctorRepository doctorRepository;

//    @PutMapping("/updateInfo")
//    public ResponseEntity updateInforVeterinary(DoctorRequest doctorRequest) {
//        Doctor updateDoctor = doctorService.addInfoVeterinary(doctorRequest);
//        return ResponseEntity.ok(updateDoctor);
//    }

    @GetMapping("/listVeterinaryInfo")
    public ResponseEntity getDoctor() {
        Doctor findDoctor = doctorService.getDoctorById();
        return ResponseEntity.ok(findDoctor);
    }


}