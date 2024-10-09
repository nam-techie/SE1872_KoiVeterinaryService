package com.example.org.controller;

import com.example.org.entity.Account;
import com.example.org.entity.Veterian;
import com.example.org.repository.VeterianRepository;
import com.example.org.service.AppointmentService;
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
    @GetMapping(value = "/getVeterians", produces = "application/json")
    public ResponseEntity getSchedules() {
        System.out.println("Hllo");
        return ResponseEntity.ok(appointmentService.findAllVeterian());
    }

}
