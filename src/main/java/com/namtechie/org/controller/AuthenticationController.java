package com.namtechie.org.controller;

import com.namtechie.org.model.AccountResponse;
import com.namtechie.org.model.RegisterRequest;
import com.namtechie.org.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
@SecurityRequirement(name = "api")
public class AuthenticationController {

    @Autowired
    AuthenticationService authenticationService;
    @PostMapping(value = "/register", produces = "application/json")
    public ResponseEntity register(@Valid @RequestBody RegisterRequest registerRequest) {
        AccountResponse newAccount = authenticationService.register(registerRequest);
        return ResponseEntity.ok(newAccount);
    }
}
