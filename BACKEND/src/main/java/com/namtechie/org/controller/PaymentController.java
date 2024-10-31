package com.namtechie.org.controller;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.AppointmentStatus;
import com.namtechie.org.model.request.ServiceTypeRequestAll;
import com.namtechie.org.model.response.PaymentDepositResponse;
import com.namtechie.org.repository.AppointmentRepository;
import com.namtechie.org.repository.AppointmentStatusRepository;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.PaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "api")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

//    @GetMapping("/payment/{id}")
//    public ResponseEntity  sendPayment(@PathVariable long id) {
//        PaymentResponse paymentResponse = paymentService.generatePayment(id);
//        return ResponseEntity.ok(paymentResponse);
//    }





    @PostMapping("/create-paymentDeposit-url/{appointmentId}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
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
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<String> createPaymentTotalUrl(@PathVariable long appointmentId) {
        try {
            String paymentUrl = paymentService.sendPaymentTotalUrlForCustomer(appointmentId);
            return ResponseEntity.ok(paymentUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Đã xảy ra lỗi khi tạo URL thanh toán.");
        }
    }



    @PostMapping("/saveServiceTypeAdd/{appointmentId}")
    @PreAuthorize("hasAuthority('VETERINARY')")
    public ResponseEntity saveServiceTypeAdd(@PathVariable long appointmentId, @RequestBody ServiceTypeRequestAll serviceTypeRequestAll) {
        try {
            paymentService.saveTransactionRecordedAndDoneWorking(appointmentId,serviceTypeRequestAll);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("Đã lưu hồ sơ bệnh nhân thành công");
    }
}
