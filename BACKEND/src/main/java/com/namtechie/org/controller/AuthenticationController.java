package com.namtechie.org.controller;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.model.UpdateDoctorLogin;
import com.namtechie.org.model.request.*;
import com.namtechie.org.model.response.AccountResponse;
import com.namtechie.org.model.response.DoctorInfoResponse;
import com.namtechie.org.model.response.InfoCustomerResponse;
import com.namtechie.org.service.AuthenticationService;
import com.namtechie.org.service.CustomerService;
import com.namtechie.org.service.DoctorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RequestMapping("/api")
@RestController
@SecurityRequirement(name = "api")
public class AuthenticationController {
    // DI: Dependency Injection
    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    CustomerService customerService;

    @Autowired
    private DoctorService doctorService;

    //API provide for CUSTOMER

    @GetMapping("/getInfoDoctor")
    public List<Doctor> getInfoDoctor() {
        return doctorService.getAllInfoDoctor();
    }

    @GetMapping("/getDoctorDetail/{doctorId}")
    public DoctorInfoResponse getDoctorDetail(@PathVariable long doctorId) {
        DoctorInfoResponse doctorInfoResponse = doctorService.getAllInfoDoctor(doctorId);
        return doctorInfoResponse;
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterRequest registerRequest) {
        // nhờ thằng AuthenticationService => tạo dùm cái account
        AccountResponse newAccount = authenticationService.register(registerRequest);
        return ResponseEntity.ok(newAccount);
    }

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequest loginRequest) {
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
    public ResponseEntity<String> sendResetPasswordEmail(@RequestBody @Valid ForgotPasswordRequest forgotPasswordRequest) {
        authenticationService.sendResetPasswordEmail(forgotPasswordRequest);
        return ResponseEntity.ok("Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.");
    }

    @PostMapping("/validate-otp")
    public ResponseEntity<String> validateOtp(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = authenticationService.validateOtp(email, otp);
        if (isValid) {
            return ResponseEntity.ok("OTP hợp lệ.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OTP không hợp lệ hoặc đã hết hạn.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody @Valid OTPRequest otpRequest) {
        authenticationService.resetPassword(otpRequest);
        return ResponseEntity.ok("Mật khẩu của bạn đã được cập nhật thành công.");
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

    @GetMapping("/getInfoAccount")
    public Account getInfoCurruntAccount() {
        Account infoAccount = authenticationService.getCurrentAccount();
        return infoAccount;
    }


//    @PostMapping("/loginByGoogle")
//    public AccountResponse loginByGoogle(@RequestBody String idTokenString) throws Exception {
//        // Thiết lập GoogleIdTokenVerifier để xác minh token
//        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
//                GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance())
//                .setAudience(Collections.singletonList("YOUR_GOOGLE_CLIENT_ID"))  // Thay bằng Google Client ID của bạn
//                .build();
//
//        // Xác minh token ID từ Google
//        GoogleIdToken idToken = verifier.verify(idTokenString);
//
//        if (idToken != null) {
//            GoogleIdToken.Payload payload = idToken.getPayload();
//
//            // Lấy thông tin người dùng từ payload
//            String email = payload.getEmail();
//            String name = (String) payload.get("name");
//
//            // Gửi thông tin email và name đến service để xử lý đăng nhập hoặc đăng ký
//            return authenticationService.loginByGoogle(email, name);
//        } else {
//            throw new IllegalArgumentException("Invalid ID token.");
//        }
//    }


    @GetMapping("/getInfoCustomer")
    public ResponseEntity getInfoCustomer() {
        InfoCustomerResponse customerInfo = customerService.getInfoCustomer();
        return ResponseEntity.ok(customerInfo);
    }

    @PutMapping("/updateInfoCustomer")
    public ResponseEntity updateInfoCustomer(@ModelAttribute CustomerInfoRequest customerInfo) {
        CustomerInfoRequest newUpdate = customerService.updateCustomerInfo(customerInfo);
        return ResponseEntity.ok(newUpdate);
    }




    //khi nao xong thì xử lí đoạn image sau
//    @PutMapping("/updateInfoCustomer")
//    public ResponseEntity updateInfoCustomer(
//            @RequestPart("fullName") String fullName,
//            @RequestPart("phoneNumber") String phoneNumber,
//            @RequestPart("address") String address,
//            @RequestPart(value = "image", required = false) MultipartFile image) {
//
//        // Tạo một đối tượng CustomerInfoRequest từ các phần của multipart form
//        CustomerInfoRequest customerInfo = new CustomerInfoRequest();
//        customerInfo.setFullName(fullName);
//        customerInfo.setPhoneNumber(phoneNumber);
//        customerInfo.setAddress(address);
//
//        // Gọi service để xử lý cập nhật
//        CustomerInfoRequest newUpdate = customerService.updateCustomerInfo(customerInfo);
//
//        return ResponseEntity.ok(newUpdate);
//    }


//    @PostMapping("/google-login")
//    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
//        String tokenId = body.get("tokenId");
//
//        try {
//            // Sử dụng Google TokenVerifier để xác minh tokenId
//            TokenVerifier tokenVerifier = TokenVerifier.newBuilder().setAudience("YOUR_GOOGLE_CLIENT_ID").build();
//            tokenVerifier.verify(tokenId);
//
//            // Nếu xác thực thành công
//            String email = tokenVerifier.getPayload().getSubject(); // Lấy thông tin email
//
//            // Ở đây, bạn có thể tạo token JWT cho người dùng
//            String token = jwtTokenProvider.createToken(email);
//
//            // Trả về token cho frontend
//            return ResponseEntity.ok(new AuthResponse(token));
//        } catch (TokenVerifier.VerificationException e) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Xác thực Google thất bại.");
//        }
//    }

}