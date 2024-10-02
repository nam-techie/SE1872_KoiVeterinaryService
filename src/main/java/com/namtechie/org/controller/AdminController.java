package com.namtechie.org.controller;

import com.namtechie.org.entity.Account;
import com.namtechie.org.model.AccountResponse;
import com.namtechie.org.model.RegisterRequest;
import com.namtechie.org.model.VeterinaryRequest;
import com.namtechie.org.repository.AccountRepository;
import com.namtechie.org.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/admin")
@RestController
@CrossOrigin("*")
@SecurityRequirement(name = "admin")
@PreAuthorize("hasAuthority('ADMIN')") // set từng thằng
public class AdminController {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    private AccountRepository accountRepository;


    @PutMapping("/setAccountVeterinary/{email}")
    public ResponseEntity<String> setAccountVeterinary(@PathVariable String email) {
        authenticationService.setVeterinaryAccount(email);
        return new ResponseEntity<>("Tài khoản bác sĩ đã được tạo thành công.", HttpStatus.ACCEPTED);
    }

    @GetMapping
    public ResponseEntity get() {
        List<Account> accounts = authenticationService.getAllAccount();
        return ResponseEntity.ok(accounts);
    }

    @PostMapping(value = "/registerVeterinary", produces = "application/json")
    public ResponseEntity registerVeterinary(@Valid @RequestBody VeterinaryRequest veterinaryRequest) {
        AccountResponse newAccount = authenticationService.registerVeterinary(veterinaryRequest);
        return ResponseEntity.ok(newAccount);
    }




}


