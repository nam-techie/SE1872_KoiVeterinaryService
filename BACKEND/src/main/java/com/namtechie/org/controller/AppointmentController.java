package com.namtechie.org.controller;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.AppointmentStatus;
import com.namtechie.org.entity.Veterian;
import com.namtechie.org.model.AppointmentRequest;
import com.namtechie.org.model.ServiceRequest;
import com.namtechie.org.model.VeterianConfirmRequest;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.TokenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
@SecurityRequirement(name = "api")
public class AppointmentController {

    @Autowired
    TokenService tokenService;

    @Autowired
    AppointmentService appointmentService;

    @CrossOrigin(origins = "http://localhost:5741")
    @PostMapping(value = "/booking", produces = "application/json")
    public ResponseEntity bookingService(@Valid @RequestHeader("Authorization") String authorizationHeader,
                                         @RequestBody ServiceRequest serviceRequest) {

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            Account account = tokenService.getAccountByToken(token);
            if (account != null) {


            }
        }
        return null;
    }

    @CrossOrigin(origins = "http://localhost:5741")
    @GetMapping(value = "/getSchedules", produces = "application/json")
    public ResponseEntity getSchedules(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            Account account = tokenService.getAccountByToken(token);
            if (account != null) {
                return null;
            }
        }
        return null;
    }

    // Thử nghiệm
    @CrossOrigin(origins = "http://localhost:5741")
    @GetMapping(value = "/testFreeSchedule", produces = "application/json")
    public ResponseEntity testFreeSchedule(@Valid @RequestParam long veterianId) {
        System.out.println("Hellllo");
        return ResponseEntity.ok(appointmentService.findFreeScheduleByVeterianId(veterianId));
    }


    @PostMapping("/createAppointment")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity createAppointment(@Valid @RequestBody AppointmentRequest appointmentRequest) {
        Appointment appointment = appointmentService.createAppointment(appointmentRequest);
        return ResponseEntity.ok(appointment);
    }


    @GetMapping("/getAppointment")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity getAppointments() {
        List<Appointment> appointmentResponses = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointmentResponses);
    }


    @PutMapping("/isVeterianConfirm")
    @PreAuthorize("hasAuthority('VETERIAN')")
    public ResponseEntity isConfirm(@Valid @RequestBody VeterianConfirmRequest veterianConfirmRequest) {
        AppointmentStatus appointmentStatus = appointmentService.confirmVeterianAppointment(veterianConfirmRequest);
        return ResponseEntity.ok(appointmentStatus);
    }

    @GetMapping("/getVeterianAuto")
    public ResponseEntity getVeterianAuto(@Param("BookingDate")String bookingDate, @Param("BookingTime") String bookingTimeStr) {
        Veterian veterian = appointmentService.findAvailableVeterian(bookingDate, bookingTimeStr);
        return ResponseEntity.ok(veterian);
    }

}
