package com.namtechie.org.controller;

import com.namtechie.org.model.response.PaymentResponse;
import com.namtechie.org.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/payment/{id}")
    public ResponseEntity  sendPayment(@PathVariable long id) {
        PaymentResponse paymentResponse = paymentService.generatePayment(id);
        return ResponseEntity.ok(paymentResponse);
    }
}
