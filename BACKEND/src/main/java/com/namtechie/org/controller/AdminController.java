package com.namtechie.org.controller;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customers;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.model.request.VeterinaryRequest;
import com.namtechie.org.service.AuthenticationService;
//import com.namtechie.org.service.CustomerService;
import com.namtechie.org.service.DoctorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin")
@RestController
@PreAuthorize("hasAuthority('ADMIN')") // set từng thằng
@SecurityRequirement(name = "api")
public class AdminController {
    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    DoctorService doctorService;

//    @Autowired
//    CustomerService customerService;

    //APi down is provide for ADMIN
    @PutMapping("/setAccountVeterinary/{email}")
    public ResponseEntity<String> setAccountVeterinary(@PathVariable String email) {
        authenticationService.setVeterinaryAccount(email);
        return new ResponseEntity<>("Tài khoản bác sĩ đã được tạo thành công.", HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/registerVeterinary")
    public ResponseEntity registerVeterinary(@Valid @RequestBody VeterinaryRequest veterinaryRequest) {
        AccountResponse newAccount = authenticationService.registerVeterinary(veterinaryRequest);
        return ResponseEntity.ok(newAccount);
    }

    @GetMapping("/listAccount")
    public ResponseEntity get() {
        List<Account> accounts = authenticationService.getAllAccount();
        return ResponseEntity.ok(accounts);
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<String> deleteAccount(@RequestParam String email) {
        authenticationService.deleteAccount(email);
        return new ResponseEntity<>("Đã xóa thành công.", HttpStatus.ACCEPTED);
    }

    @GetMapping("/listAllVeterinary")
    public ResponseEntity getAllDoctor(){
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @DeleteMapping("/deleteVeterinaryInfo")
    public ResponseEntity deleteDoctor(long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Xóa thông tin bác sĩ thành công!");
    }

//    @GetMapping("/listInfoCustomer")
//    public List<Customers> getAllInfoCustomer(){
//        return customerService.getAllCustomers();
//    }
//



}
