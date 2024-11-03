package com.namtechie.org.controller;

import com.namtechie.org.entity.Account;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.model.response.CustomerProfileUpdateResponse;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.AuthenticationService;
import com.namtechie.org.service.CustomerService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/customer")
@RestController
@PreAuthorize("hasAuthority('CUSTOMER')")
@SecurityRequirement(name = "api")
public class AccountController {
@Autowired
CustomerService customerService;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private AuthenticationService authenticationService;

    @CrossOrigin(origins = "http://localhost:5741")
    @GetMapping(value = "/getDoctors", produces = "application/json")
    public ResponseEntity getSchedules() {
        System.out.println("Hllo");
        return ResponseEntity.ok(appointmentService.findAllDoctor());
    }

    @PutMapping("/updateProfile/{Id}")
    public ResponseEntity updateProfile(@PathVariable int Id, @RequestBody CustomerProfileUpdateResponse account) {
        customerService.updateProfile(Id, account);
        return ResponseEntity.ok(account);
    }



}
