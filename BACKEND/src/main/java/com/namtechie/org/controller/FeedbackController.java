package com.namtechie.org.controller;

import com.namtechie.org.entity.FeedBack;
import com.namtechie.org.model.request.FeedbackRequest;
import com.namtechie.org.service.FeedbackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/customer")
@SecurityRequirement(name = "api")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/createFeedback/{appointmentId}")
    public ResponseEntity createFeedback(@PathVariable long appointmentId,@RequestBody FeedbackRequest feedBack) {
        FeedBack feedBack1 = feedbackService.createFeedbackService(appointmentId,feedBack);
        return ResponseEntity.ok(feedBack1);
    }

    @GetMapping("/getFeedbackAdmin")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity getFeedbackAdmin() {
        List<FeedBack> feedBack = feedbackService.getFeedback();
        return ResponseEntity.ok(feedBack);
    }

    @GetMapping("/getFeedbackCustomer/{id}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity getFeedbackCustomer(@PathVariable long id) {
        FeedBack feedBack = feedbackService.getFeedbackCustomer(id);
        return ResponseEntity.ok(feedBack);
    }
}
