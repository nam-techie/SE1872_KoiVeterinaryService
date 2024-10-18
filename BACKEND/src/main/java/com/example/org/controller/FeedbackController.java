package com.example.org.controller;

import com.example.org.entity.FeedBack;
import com.example.org.model.FeedbackRequest;
import com.example.org.model.FeedbackResponse;
import com.example.org.service.FeedbackService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "api")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;
    @PostMapping("/createFeedback")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity createFeedback(@RequestBody FeedbackRequest feedBack) {
        FeedBack feedBack1 = feedbackService.createFeedbackService(feedBack);
        return ResponseEntity.ok(feedBack1);
    }

//    @GetMapping("/getFeedback")
//    public ResponseEntity getFeedback() {
//        List<FeedbackResponse> feedBack = feedbackService.getFeedback();
//        return ResponseEntity.ok(feedBack);
//    }
}
