package com.namtechie.org.controller;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.entity.ServiceType;
import com.namtechie.org.entity.Zone;
import com.namtechie.org.model.Schedule;
import com.namtechie.org.service.*;
import com.namtechie.org.model.request.AppointmentRequest;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.TokenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/customer")
@RestController
@PreAuthorize("hasAuthority('CUSTOMER')")
@SecurityRequirement(name = "api")
public class AppointmentController {

    @Autowired
    ScheduleService scheduleService;

    @Autowired
    ZoneService zoneService;

    @Autowired
    ServiceTypesService serviceTypesService;

    @Autowired
    TokenService tokenService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    PaymentService paymentService;

    @GetMapping(value = "/getFreeScheduleByDoctorId")
    public ResponseEntity<Map<String, List<Schedule>>> getFreeScheduleByDoctorId(@RequestParam long doctorId) {

        return ResponseEntity.ok(scheduleService.findFreeScheduleByDoctorId(doctorId));

    }

    @GetMapping(value = "/getFreeScheduleWithTime", produces = "application/json")
    public ResponseEntity<Map<String, List<Schedule>>> getFreeScheduleWithTime() {
        return ResponseEntity.ok(scheduleService.findFreeSchedule());
    }

    @GetMapping(value = "/testFreeScheduleWithTime")
    public ResponseEntity testFreeScheduleWithTime() {
        return ResponseEntity.ok(appointmentService.findAppointmentByDoctorIdAndBookingDateAndBookingTime((long) 1, Date.valueOf("2024-10-16"), Time.valueOf("14:00:00")));
    }

    @GetMapping(value = "/getFreeSchedule")
    public ResponseEntity<Map<String, List<Schedule>>> getFreeSchedule() {
            return ResponseEntity.ok(scheduleService.findFreeScheduleOfSession());
    }

    @PostMapping("/createAppointment")
    public ResponseEntity createAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        Appointment appointment = appointmentService.createAppointment(appointmentRequest);
        return ResponseEntity.ok("Thêm dịch vụ thành công! Chờ bác sĩ phản hồi!!!");
    }


    //Tạm thời bỏ lấy Zone ở đây.
    //Cái này còn hơi đắng đo mà chắc cần token mà
    @GetMapping(value = "/getAllZone", produces = "application/json")
    public List<Zone> getAllZone() {
            return zoneService.findAll();
    }

    //Tạm thời bở nó ở đây đợi nó có nhà mới
    //Toi nghĩ Service Type thằng nào lấy xem chả được nhỉ?
    @GetMapping(value = "/getAllServiceType", produces = "application/json")
    public List<ServiceType> getAllServiceType() {
        return serviceTypesService.findService();
    }


    //Nằm dỡ ní ơi
    @GetMapping("/getAllDoctor")
    public ResponseEntity<List<Doctor>> getAllDoctor() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/getDoctorAuto")
    public ResponseEntity getVeterianAuto(@Param("BookingDate") String bookingDate, @Param("BookingTime") String bookingTimeStr) {
        Doctor doctor = appointmentService.findAvailableDoctor(bookingDate, bookingTimeStr);
        return ResponseEntity.ok(doctor);
    }

}

