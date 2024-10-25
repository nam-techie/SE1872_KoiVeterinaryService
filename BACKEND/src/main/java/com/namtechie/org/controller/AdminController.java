package com.namtechie.org.controller;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customers;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.exception.NotFoundException;
import com.namtechie.org.model.request.*;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.model.response.AdminAccountResponse;
import com.namtechie.org.model.response.DoctorInfoResponse;
import com.namtechie.org.repository.DoctorRepository;
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
    DoctorRepository doctorRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    ModelMapper modelMapper;

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

    @GetMapping("/getInfoDoctor/{doctorId}")
    public DoctorInfoResponse getInfoDoctor(@PathVariable long doctorId) {
        DoctorInfoResponse doctorInfoResponse = doctorService.getAllInfoDoctor(doctorId);
        return doctorInfoResponse;
    }

    @GetMapping("/listAllVeterinary")
    public List<Doctor> getAllDoctor() {
        List<Doctor> listDoctor = doctorRepository.findAll();
        return listDoctor;
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

    @PutMapping("/updateInfoAccount")
    public ResponseEntity<String> updateInfoAccount(@RequestBody AdminAccountResponse adminAccountResponse) {
        try {
            authenticationService.updateAccountInfo(adminAccountResponse);
            return ResponseEntity.ok("Cập nhật thông tin tài khoản thành công");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DuplicateEntity e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/updateDoctorInfo/{phone}")
    public ResponseEntity<String> updateDoctorInfo(@PathVariable String phone, @RequestBody DoctorRequest doctorRequest) {
        try {
            doctorService.updateInfoDoctor(phone, doctorRequest);
            return ResponseEntity.ok("Cập nhật thông tin bác sĩ thành công");
        } catch (DuplicateEntity e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/addDoctor")
    public ResponseEntity<String> addDoctor(@RequestBody UpdateDoctor updateDoctor) {
        try {
            doctorService.addDoctor(updateDoctor);
            return ResponseEntity.status(HttpStatus.CREATED).body("Bác sĩ đã được thêm thành công");
        } catch (DuplicateEntity e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi trong quá trình thêm bác sĩ");
        }
    }



}
