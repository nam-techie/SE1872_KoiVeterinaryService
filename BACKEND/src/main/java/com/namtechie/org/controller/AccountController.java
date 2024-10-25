package com.namtechie.org.controller;

import com.namtechie.org.service.AppointmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
@RestController
@SecurityRequirement(name = "api")
public class AccountController {

    @Autowired
    private AppointmentService appointmentService;

    @CrossOrigin(origins = "http://localhost:5741")
    @GetMapping(value = "/getDoctors", produces = "application/json")
    public ResponseEntity getSchedules() {
        System.out.println("Hllo");
        return ResponseEntity.ok(appointmentService.findAllDoctor());
    }

}
