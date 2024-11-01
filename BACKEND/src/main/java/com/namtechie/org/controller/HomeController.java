package com.namtechie.org.controller;

import com.namtechie.org.entity.Doctor;
import com.namtechie.org.entity.ServiceType;
import com.namtechie.org.model.Schedule;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.DoctorService;
import com.namtechie.org.service.ScheduleService;
import com.namtechie.org.service.ServiceTypesService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/customer")
@RestController
@SecurityRequirement(name = "api")
public class HomeController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    ServiceTypesService serviceTypesService;

//    @Autowired
//    private ScheduleService scheduleService;
//    @GetMapping(value = "/testFreeScheduleWithTime")
//    public ResponseEntity testFreeScheduleWithTime() {
//        return ResponseEntity.ok(appointmentService.findAppointmentByDoctorIdAndBookingDateAndBookingTime((long) 1, Date.valueOf("2024-10-16"), Time.valueOf("14:00:00")));
//    }

    @GetMapping("/getAllDoctor")
    public ResponseEntity<List<Doctor>> getAllDoctor() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }


    //Tạm thời bở nó ở đây đợi nó có nhà mới
    //Toi nghĩ Service Type thằng nào lấy xem chả được nhỉ?
    @GetMapping(value = "/getAllServiceType", produces = "application/json")
    public List<ServiceType> getAllServiceType() {
        return serviceTypesService.findService();
    }
}
