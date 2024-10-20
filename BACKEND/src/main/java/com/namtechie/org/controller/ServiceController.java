package com.namtechie.org.controller;

import com.namtechie.org.entity.ServiceType;
import com.namtechie.org.entity.Zone;
import com.namtechie.org.service.AppointmentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
@SecurityRequirement(name = "api")
public class ServiceController {

    @Autowired
    AppointmentService appointmentService;

    // Gửi danh sách các loại dịch vụ
    @CrossOrigin(origins = "http://localhost:5741")
    @GetMapping(value = "/service-types", produces = "application/json")
    public ResponseEntity<List<ServiceType>> getAllServiceType() {
        return ResponseEntity.ok(appointmentService.findAllServiceType());
    }

    // Gửi danh sách các loại khu vực
    @CrossOrigin(origins = "http://localhost:5741")
    @GetMapping(value = "/zones", produces = "application/json")
    public ResponseEntity<List<Zone>> getAllZone() {
        return ResponseEntity.ok(appointmentService.findAllZone());
    }

    //Gửi danh sách thời gian rảnh của bác sĩ
    @CrossOrigin(origins =  "http://localhost:5741")
    @GetMapping(value = "/free-schedule", produces = "application/json")
    public ResponseEntity<List<ServiceType>> getFreeServiceType(@Valid @RequestBody long veterianId) {
        return null;
    }

}
