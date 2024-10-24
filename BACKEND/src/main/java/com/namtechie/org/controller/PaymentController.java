package com.namtechie.org.controller;

import com.namtechie.org.model.request.ServiceTypeRequestAll;
import com.namtechie.org.model.response.PaymentDepositResponse;
import com.namtechie.org.model.response.PaymentResponse;
import com.namtechie.org.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")

public class PaymentController {
    @Autowired
    private PaymentService paymentService;

//    @GetMapping("/payment/{id}")
//    public ResponseEntity  sendPayment(@PathVariable long id) {
//        PaymentResponse paymentResponse = paymentService.generatePayment(id);
//        return ResponseEntity.ok(paymentResponse);
//    }

    @GetMapping("/generatePayment/{id}")
    public ResponseEntity  generatePayment(@PathVariable long id) {
        PaymentDepositResponse paymentDepositResponse = paymentService.generatePaymentDeposit(id);
        return ResponseEntity.ok(paymentDepositResponse);
    }

    @PostMapping("/PaymentTotal")
    public ResponseEntity paymentTotal(@RequestBody ServiceTypeRequestAll serviceTypeRequestAll) {
        paymentService.updateTotalFee(serviceTypeRequestAll);
        return ResponseEntity.ok("Da luu thanh cong");
    }
}
