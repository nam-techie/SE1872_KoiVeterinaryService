package com.namtechie.org.controller;

import com.namtechie.org.entity.Account;
import com.namtechie.org.model.*;
import com.namtechie.org.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
@SecurityRequirement(name = "api")
public class AuthenticationController {
    // DI: Dependency Injection
    @Autowired
    AuthenticationService authenticationService;

    //API provide for CUSTOMER

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterRequest registerRequest){
        // nhờ thằng AuthenticationService => tạo dùm cái account
        AccountResponse newAccount = authenticationService.register(registerRequest);
        return ResponseEntity.ok(newAccount);
    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequest loginRequest){
        // nhờ thằng AuthenticationService => tạo dùm cái account
        AccountResponse newAccount = authenticationService.login(loginRequest);
        return ResponseEntity.ok(newAccount);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity forgotPassword(@RequestBody @Valid ForgotPasswordRequest forgotPasswordRequest){
        authenticationService.forgotPassword(forgotPasswordRequest);
        return ResponseEntity.ok("Đã yêu cầu mục quên mật khẩu. Vui lòng kiểm tra hộp thư để xác nhận!");
    }

    @PostMapping("/reset-password")
    public ResponseEntity resetPassword(@RequestBody OTPRequest otpRequest){
        authenticationService.resetPassword(otpRequest);
        return ResponseEntity.ok("Thay đổi mật khẩu thành công!");
    }

    //APi down is provide for ADMIN

    @PreAuthorize("hasAuthority('ADMIN')") // set từng thằng
    @PutMapping("/admin/setAccountVeterinary/{email}")
    public ResponseEntity<String> setAccountVeterinary(@PathVariable String email) {
        authenticationService.setVeterinaryAccount(email);
        return new ResponseEntity<>("Tài khoản bác sĩ đã được tạo thành công.", HttpStatus.ACCEPTED);
    }

    @PreAuthorize("hasAuthority('ADMIN')") // set từng thằng
    @GetMapping("/admin")
    public ResponseEntity get() {
        List<Account> accounts = authenticationService.getAllAccount();
        return ResponseEntity.ok(accounts);
    }

    @PreAuthorize("hasAuthority('ADMIN')") // set từng thằng
    @PostMapping(value = "/admin/registerVeterinary")
    public ResponseEntity registerVeterinary(@Valid @RequestBody VeterinaryRequest veterinaryRequest) {
        AccountResponse newAccount = authenticationService.registerVeterinary(veterinaryRequest);
        return ResponseEntity.ok(newAccount);
    }

    @PreAuthorize("hasAuthority('ADMIN')") // set từng thằng
    @DeleteMapping("/admin")
    public ResponseEntity<String> deleteAccount(@RequestParam String email) {
        authenticationService.deleteAccount(email);
        return new ResponseEntity<>("Đã xóa thành công.", HttpStatus.ACCEPTED);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        // Cắt bỏ tiền tố "Bearer " nếu token có tiền tố
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        authenticationService.logout(token);
        return ResponseEntity.ok("Đăng xuất thành công.");
    }

}
