package com.namtechie.org.controller;

import com.namtechie.org.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // API để tạo URL thanh toán dựa trên appointmentId
    @GetMapping("/create-payment-url/{appointmentId}")
    public ResponseEntity<String> createPaymentUrl(@PathVariable Long appointmentId) {
        System.out.println("hello" + appointmentId);
        try {
            String paymentUrl = paymentService.createUrl(appointmentId);
            return ResponseEntity.ok(paymentUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Đã xảy ra lỗi khi tạo URL thanh toán.");
        }
    }
}
