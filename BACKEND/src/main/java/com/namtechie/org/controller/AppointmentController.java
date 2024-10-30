package com.namtechie.org.controller;

import com.namtechie.org.entity.*;
import com.namtechie.org.model.Schedule;
import com.namtechie.org.model.response.AppointmentResponse;
import com.namtechie.org.model.response.AppointmentStatusResponse;
import com.namtechie.org.repository.AppointmentRepository;
import com.namtechie.org.service.*;
import com.namtechie.org.model.request.AppointmentRequest;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.TokenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
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
    private AppointmentRepository appointmentRepository;

    @Autowired
    PaymentService paymentService;


    @GetMapping("/getListFreeDoctor")
    public ResponseEntity<List<Object[]>> getListFreeDoctor() {
        List<Object[]> doctorAppointmentCounts = appointmentRepository.findDoctorAppointmentCounts();
        return ResponseEntity.ok(doctorAppointmentCounts);
    }

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

    @GetMapping("/listAppointment/{username}")
    public List<AppointmentStatusResponse> listAppointmentCustomer(@PathVariable String username ) {
        List<AppointmentStatusResponse> listAppointment = appointmentService.getListAppointmentCustomer(username);
        return listAppointment;
    }

    @GetMapping("/findAppointmentDoctorById/{accountId}")
    @PreAuthorize("hasAuthority('VETERINARY')")
    public ResponseEntity findAppointmentDoctorById(@PathVariable long accountId) {
        List<Appointment> appointmentResponses = appointmentService.findAppointmentByAccountId(accountId);
        return ResponseEntity.ok(appointmentResponses);
    }

//    @GetMapping("/findAppoinmentId/{accountId}")
//    @PreAuthorize("hasAuthority('VETERINARY')")
//    public ResponseEntity findAppoinmentId(@PathVariable long accountId) {
//        long appointmentId = appointmentService.findAppointmentIdStep(accountId);
//        return ResponseEntity.ok(appointmentId);
//    }
//
//    @GetMapping("/getAppointmentIdForUser/{accountId}")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
//    public ResponseEntity getAppointmentIdForUser(@PathVariable long accountId) {
//        long appointmentId = appointmentService.getAppointmentIdForUser(accountId);
//        return ResponseEntity.ok(appointmentId);
//    }



    @PutMapping("/cancelAppointmentByCustomer/{appointmentId}")
    public ResponseEntity cancelAppointmentByCustomer(@PathVariable long appointmentId) {
        appointmentService.cancelAppointmentByCustomer(appointmentId);
        return ResponseEntity.ok("Đã hủy thành công");
    }



//    @GetMapping("/countAppointment/{id}")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
//    public ResponseEntity countAppointment(@PathVariable long id,@Param("BookingDate") String bookingDate) {
//        int count = appointmentService.countAppointmentsForDoctorOnDate(id, bookingDate);
//        return ResponseEntity.ok(count);
//    }

    @GetMapping("/getDoctorhaveAppointmentMin")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity getDoctorhaveAppointmentMin(@Param("BookingDate") String bookingDate, @Param("BookingTime") String bookingTime) {
        Doctor doctor = appointmentService.findAvailableDoctor(bookingDate, bookingTime);
        return ResponseEntity.ok(doctor);
    }

    @GetMapping("/listAppointment/{id}")
    public ResponseEntity<AppointmentResponse> getAllAppointment(@PathVariable long id) {
        try {
            AppointmentResponse appointment = appointmentService.getListAppoint(id);
            return new ResponseEntity<>(appointment, HttpStatus.OK);  // Trả về HTTP 200 OK
        } catch (Exception e) {
            // Log lỗi ra nếu cần
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // Trả về HTTP 500 nếu có lỗi
        }
    }
}

