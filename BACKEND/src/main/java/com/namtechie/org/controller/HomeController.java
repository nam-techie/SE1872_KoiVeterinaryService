package com.namtechie.org.controller;

import com.namtechie.org.model.Schedule;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.sql.Date;
import java.sql.Time;
import java.util.List;
import java.util.Map;

@Controller
public class HomeController {

    @Autowired
    private AppointmentService appointmentService;

//    @Autowired
//    private ScheduleService scheduleService;
//    @GetMapping(value = "/testFreeScheduleWithTime")
//    public ResponseEntity testFreeScheduleWithTime() {
//        return ResponseEntity.ok(appointmentService.findAppointmentByDoctorIdAndBookingDateAndBookingTime((long) 1, Date.valueOf("2024-10-16"), Time.valueOf("14:00:00")));
//    }



}
