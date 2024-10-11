package com.example.org.controller;

import com.example.org.entity.Account;
import com.example.org.entity.Appointment;
import com.example.org.model.AppointmentResponse;
import com.example.org.model.ServiceRequest;
import com.example.org.service.AppointmentService;
import com.example.org.service.TokenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
@SecurityRequirement(name = "api")
public class AppointmentController {

    @Autowired
    TokenService tokenService;

    @Autowired
    AppointmentService appointmentService;

    @CrossOrigin(origins = "http://localhost:5741")
    @PostMapping(value = "/booking", produces = "application/json")
    public ResponseEntity bookingService(@Valid @RequestHeader("Authorization") String authorizationHeader,
                                         @RequestBody ServiceRequest serviceRequest) {

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            Account account = tokenService.getAccountByToken(token);
            if (account != null) {


            }
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:5741")
    @GetMapping(value = "/getSchedules", produces = "application/json")
    public ResponseEntity getSchedules(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            Account account = tokenService.getAccountByToken(token);
            if (account != null) {
                return null;
            }
        }
        return null;
    }

    // Thử nghiệm
    @CrossOrigin(origins = "http://localhost:5741")
    @GetMapping(value = "/testFreeSchedule", produces = "application/json")
    public ResponseEntity testFreeSchedule(@Valid @RequestParam long veterianId) {
        System.out.println("Hellllo");
        return ResponseEntity.ok(appointmentService.findFreeScheduleByVeterianId(veterianId));
    }


    @GetMapping("/getAppointment")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity getAppointments() {
        List<AppointmentResponse> appointmentResponses = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointmentResponses);
    }
}
