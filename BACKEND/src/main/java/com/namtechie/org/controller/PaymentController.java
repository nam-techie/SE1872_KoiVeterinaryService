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

    @PostMapping("/generatePayment/{id}")
    public ResponseEntity  generatePayment(@PathVariable long id) {
        PaymentDepositResponse paymentDepositResponse = paymentService.generatePaymentDeposit(id);
        return ResponseEntity.ok(paymentDepositResponse);
    }

    @PostMapping("/PaymentTotal/{appointmentId}")
    public ResponseEntity paymentTotal(@PathVariable long appointmentId,@RequestBody ServiceTypeRequestAll serviceTypeRequestAll) {
        paymentService.updateTotalFee(appointmentId,serviceTypeRequestAll);
        return ResponseEntity.ok("Da luu thanh cong");
    }

    @GetMapping("/create-paymentDeposit-url/{appointmentId}")
    public ResponseEntity<String> createPaymentDepositUrl(@PathVariable long appointmentId) {
        System.out.println("hello" + appointmentId);
        try {
            String paymentUrl = paymentService.sendPaymentDeposit(appointmentId);
            return ResponseEntity.ok(paymentUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Đã xảy ra lỗi khi tạo URL thanh toán.");
        }
    }

    @PostMapping("/create-paymentTotal-url/{appointmentId}")
    public ResponseEntity<String> createPaymentTotalUrl(@PathVariable long appointmentId, @RequestBody  ServiceTypeRequestAll serviceTypeRequestAll) {
        try {
            String paymentUrl = paymentService.sendPaymentTotal(appointmentId, serviceTypeRequestAll);
            return ResponseEntity.ok(paymentUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Đã xảy ra lỗi khi tạo URL thanh toán.");
        }
    }
}
