package com.namtechie.org.controller;

import com.namtechie.org.model.UpdateDoctorLogin;
import com.namtechie.org.model.request.ForgotPasswordRequest;
import com.namtechie.org.model.request.LoginRequest;
import com.namtechie.org.model.request.OTPRequest;
import com.namtechie.org.model.request.RegisterRequest;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/updateAccount")
    public ResponseEntity updateAccount(UpdateDoctorLogin updateInfo) {
        authenticationService.updateAccount(updateInfo);
        return ResponseEntity.ok("Thay đổi thông tin tài khoản thành công!");
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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        // Cắt bỏ tiền tố "Bearer " nếu token có tiền tố
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        authenticationService.logout(token);
        return ResponseEntity.ok("Đăng xuất thành công.");
    }

//    @GetMapping("/loginByGoogle")
//    public String loginByGoogle(@AuthenticationPrincipal OAuth2User principal, Model model) {
//        // Gọi hàm loginByGoogle trong service để thực hiện logic và lấy AccountResponse
//        AccountResponse accountResponse = authenticationService.loginByGoogle();
//
//        // Thêm thông tin vào Model để hiển thị trên trang HTML
//        model.addAttribute("name", accountResponse.getUsername());
//        model.addAttribute("email", accountResponse.getEmail());
//        model.addAttribute("token", accountResponse.getToken());
//
//        // Trả về trang loginSuccess.html
//        return "loginSuccess";
//    }

    }
