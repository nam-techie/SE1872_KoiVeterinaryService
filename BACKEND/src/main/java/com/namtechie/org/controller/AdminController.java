package com.namtechie.org.controller;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customers;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.model.request.AdminAccountRequest;
import com.namtechie.org.model.request.AdminInfoRequest;
import com.namtechie.org.model.request.CustomerInfoRequest;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.model.request.VeterinaryRequest;
import com.namtechie.org.service.AuthenticationService;
import com.namtechie.org.service.CustomerService;
import com.namtechie.org.service.DoctorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
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

    @Autowired
    CustomerService customerService;
    @Autowired
    private ModelMapper modelMapper;

    //APi down is provide for ADMIN
    @PutMapping("/setAccountVeterinary/{email}")
    public ResponseEntity<String> setAccountVeterinary(@PathVariable String email) {
        authenticationService.setVeterinaryAccount(email);
        return new ResponseEntity<>("Tài khoản bác sĩ đã được tạo thành công.", HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/createAccountVeterinary")
    public AccountResponse registerVeterinary(@Valid @RequestBody VeterinaryRequest veterinaryRequest) {
        AccountResponse newAccount = authenticationService.registerVeterinary(veterinaryRequest);
        System.out.println(newAccount.toString());
        return newAccount;
    }

    @PostMapping(value = "/createAccount")
    public ResponseEntity<?> createAccountForAdmin(@Valid @RequestBody AdminAccountRequest adminAccountRequest) {
        try {
            AccountResponse newAccount = authenticationService.createAccountForAdmin(adminAccountRequest);
            return ResponseEntity.ok(newAccount);
        } catch (DuplicateEntity e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại sau.");
        }
    }

    @GetMapping("/listAccount")
    public List<Account> getAllAccount() {
        List<Account> accounts = authenticationService.getAllAccount();
        return accounts;
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<String> deleteAccount(@RequestParam String email) {
        authenticationService.deleteAccount(email);
        return new ResponseEntity<>("Đã xóa thành công.", HttpStatus.ACCEPTED);
    }

    @PutMapping("/restoreAccount/{email}")
    public ResponseEntity<String> restoreAccount(@PathVariable String email) {
        authenticationService.restoreAccount(email);
        return new ResponseEntity<>("Đã khôi phục thành công.", HttpStatus.ACCEPTED);
    }

    @PutMapping("/updateAccountRole/{email}/{role}")
    public ResponseEntity<String> updateAccountRole(@PathVariable String email, @PathVariable String role) {
        authenticationService.updateRole(email, role);
        return new ResponseEntity<>("Đã cập nhật thành công.", HttpStatus.ACCEPTED);
    }






    @GetMapping("/listAllVeterinary")
    public ResponseEntity getAllDoctor() {
        List<Doctor> doctors = doctorService.getAllDoctors();
        return ResponseEntity.ok(doctors);
    }

    @DeleteMapping("/deleteVeterinaryInfo")
    public ResponseEntity deleteDoctor(long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Xóa thông tin bác sĩ thành công!");
    }


    @GetMapping("/getInfoAdmin")
    public ResponseEntity getInfoAdmin() {
        Account currentAccount = authenticationService.getCurrentAccount();
        AdminInfoRequest accountAdmin = modelMapper.map(currentAccount, AdminInfoRequest.class);
        return ResponseEntity.ok(accountAdmin);
    }

    @PutMapping("/updateInfoAdmin")
    public ResponseEntity updateInfoAdmin(@ModelAttribute AdminInfoRequest adminInfoRequest) {
        AdminInfoRequest newUpdate = authenticationService.updateAdminInfo(adminInfoRequest);
        return ResponseEntity.ok(newUpdate);
    }

    @GetMapping("/listInfoCustomer")
    public List<Customers> getAllInfoCustomer() {
        return customerService.getAllCustomers();
    }


}
