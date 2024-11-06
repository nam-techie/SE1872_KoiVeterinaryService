package com.namtechie.org.controller;

import com.namtechie.org.entity.*;
import com.namtechie.org.exception.BadCredentialsException;
import com.namtechie.org.exception.DoctorNotAvailableException;
import com.namtechie.org.exception.InvalidPhoneNumberException;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.model.Schedule;
import com.namtechie.org.model.request.*;
import com.namtechie.org.model.response.AppointmentResponse;
import com.namtechie.org.model.response.AppointmentStatusResponse;
import com.namtechie.org.model.response.InfoCustomerResponse;
import com.namtechie.org.model.response.InfoResponse;
import com.namtechie.org.repository.AppointmentRepository;
import com.namtechie.org.repository.PaymentDetailRepository;
import com.namtechie.org.repository.ZoneRepository;
import com.namtechie.org.service.*;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.TokenService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/customer")
@RestController
@PreAuthorize("hasAuthority('CUSTOMER')")
@SecurityRequirement(name = "api")
public class AppointmentController {

    @Autowired
    ZoneRepository zoneRepository;

    @Autowired
    ScheduleService scheduleService;

    @Autowired
    ZoneService zoneService;

    @Autowired
    CustomerService customerService;

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

    @Autowired
    PaymentDetailRepository paymentDetailRepository;

    @Autowired
    AuthenticationService authenticationService;


    @GetMapping("/listTrueStatus/{paymentId}")
    public ResponseEntity<List<PaymentDetail>> listFalseStatus(@PathVariable long paymentId) {
        List<PaymentDetail> paymentDetails = paymentDetailRepository.findListByPaymentIdAndStatus(paymentId, true);
        return ResponseEntity.ok(paymentDetails);
    }

    @GetMapping("/listAppointmentDetail/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentDetail(@PathVariable long id) {
        try {
            AppointmentResponse appointment = appointmentService.getAppointmentDetail(id);
            return new ResponseEntity<>(appointment, HttpStatus.OK);  // Trả về HTTP 200 OK
        } catch (Exception e) {
            // Log lỗi ra nếu cần
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // Trả về HTTP 500 nếu có lỗi
        }
    }


    @GetMapping("/getListFreeDoctor")
    public ResponseEntity<List<Object[]>> getListFreeDoctor() {
        List<Object[]> doctorAppointmentCounts = appointmentRepository.findDoctorAppointmentCounts();
        return ResponseEntity.ok(doctorAppointmentCounts);
    }

    @GetMapping(value = "/getFreeScheduleByDoctorId")
    public ResponseEntity<Map<String, List<Schedule>>> getFreeScheduleByDoctorId(@RequestParam long doctorId) {

        return ResponseEntity.ok(scheduleService.findFreeScheduleByDoctorId(doctorId, false));

    }

    @GetMapping(value = "/getFreeScheduleWithTime", produces = "application/json")
    public ResponseEntity<Map<String, List<Schedule>>> getFreeScheduleWithTime() {
        return ResponseEntity.ok(scheduleService.findFreeSchedule());
    }

    @GetMapping(value = "/testFreeScheduleWithTime")
    public ResponseEntity testFreeScheduleWithTime() {
        return ResponseEntity.ok(appointmentService.findAppointmentByDoctorIdAndBookingDateAndBookingTime((long) 2, Date.valueOf("2024-11-10"), Time.valueOf("14:00:00")));
    }

    @GetMapping(value = "/getFreeSchedule")
    public ResponseEntity<Map<String, List<Schedule>>> getFreeSchedule() {
        return ResponseEntity.ok(scheduleService.findFreeScheduleOfSession());
    }

    @PostMapping(value = "/createAppointment", produces = "application/json" )
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        try {
            Appointment appointment = appointmentService.createAppointment(appointmentRequest);
            return ResponseEntity.ok(appointment);
        } catch (DoctorNotAvailableException | InvalidPhoneNumberException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Hết giờ làm việc của bác sĩ");
        }
    }




    @GetMapping(value = "/getAllZone", produces = "application/json")
    public List<Zone> getAllZone() {
        List<Zone> zoneList = new ArrayList<>();
        List<Zone> allZones = zoneRepository.findAll();

        // Lọc các zone có ID từ 2 đến 14
        for (Zone zone : allZones) {
            if (zone.getId() >= 2 && zone.getId() <= 14) {
                zoneList.add(zone);
            }
        }
        return zoneList;
    }




    //Nằm dỡ ní ơi


//    @GetMapping("/getDoctorAuto")
//    public ResponseEntity getVeterianAuto(@Param("BookingDate") String bookingDate, @Param("BookingTime") String bookingTimeStr) {
//        Doctor doctor = appointmentService.findAvailableDoctor(bookingDate, bookingTimeStr);
//        return ResponseEntity.ok(doctor);
//    }

    @GetMapping("/listAppointmentUser")
    public List<AppointmentStatusResponse> listAppointmentCustomer() {
        List<AppointmentStatusResponse> listAppointment = appointmentService.getListAppointmentCustomer();
        return listAppointment;
    }




//
//    @GetMapping("/getAppointmentIdForUser/{accountId}")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
//    public ResponseEntity getAppointmentIdForUser(@PathVariable long accountId) {
//        long appointmentId = appointmentService.getAppointmentIdForUser(accountId);
//        return ResponseEntity.ok(appointmentId);
//    }



    @PutMapping("/cancelAppointmentByCustomer")
    public ResponseEntity cancelAppointmentByCustomer(@RequestBody CancelRequest cancelRequest) {
        appointmentService.cancelAppointmentByCustomer(cancelRequest);
        return ResponseEntity.ok("Đã hủy thành công");
    }



//    @GetMapping("/countAppointment/{id}")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
//    public ResponseEntity countAppointment(@PathVariable long id,@Param("BookingDate") String bookingDate) {
//        int count = appointmentService.countAppointmentsForDoctorOnDate(id, bookingDate);
//        return ResponseEntity.ok(count);
//    }

//    @GetMapping("/getDoctorhaveAppointmentMin")
//    @PreAuthorize("hasAuthority('CUSTOMER')")
//    public ResponseEntity getDoctorhaveAppointmentMin(@Param("BookingDate") String bookingDate, @Param("BookingTime") String bookingTime) {
//        Doctor doctor = appointmentService.findAvailableDoctor(bookingDate, bookingTime);
//        return ResponseEntity.ok(doctor);
//    }

    @PostMapping("/sendUrlPayment/{appointmentId}")
    public ResponseEntity<String> createPaymentTotalUrl(@PathVariable long appointmentId) {
        try {
            Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
            ServiceType type = appointment.getServiceType();
            if (type.getId() == 1) {
                AppointmentStatus appointmentStatus = appointmentService.confirmDoctorAppointment(appointmentId);
            }
            String paymentUrl = paymentService.returnUrlPayment(appointmentId);
            return ResponseEntity.ok(paymentUrl);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Đã xảy ra lỗi khi tạo URL thanh toán.");
        }
    }

    @Autowired
    FeedbackService feedbackService;

    @PostMapping("/createFeedback/{appointmentId}")
    public ResponseEntity createFeedback(@PathVariable long appointmentId, @RequestBody FeedbackRequest feedBack) {
        FeedBack feedBack1 = feedbackService.createFeedbackService(appointmentId, feedBack);
        return ResponseEntity.ok(feedBack1);
    }

    @GetMapping("/getFullInfoCustomer/{appointmentId}")
    public ResponseEntity<?> getFullInfoCustomer(@PathVariable long appointmentId) {
        try {
            InfoResponse infoResponse = appointmentService.getFullInfoAppointment(appointmentId);
            return ResponseEntity.ok(infoResponse);
        } catch (Exception e) {
            // Log lỗi
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Có lỗi xảy ra khi lấy thông tin: " + e.getMessage());
        }
    }

    @GetMapping("/getInfoCustomer")
    public ResponseEntity<InfoCustomerResponse> getInfoCustomer() {
        InfoCustomerResponse customerInfo = customerService.getInfoCustomer();
        return ResponseEntity.ok(customerInfo);
    }

    @PutMapping("/updateInfoCustomer")
    public ResponseEntity updateInfoCustomer(@RequestBody CustomerInfoRequest customerInfo) {
        CustomerInfoRequest newUpdate = customerService.updateCustomerInfo(customerInfo);
        return ResponseEntity.ok(newUpdate);
    }

    @PostMapping("/confirmPayment/{appointmentId}")
    public ResponseEntity<String> confirmPayment(@PathVariable long appointmentId) {
        try {
            paymentService.acceptStatus(appointmentId);
            return ResponseEntity.ok("Đã lưu thành công");
        } catch (IllegalArgumentException e) {
            // Bắt lỗi khi không tìm thấy cuộc hẹn hoặc trạng thái mới nhất
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (RuntimeException e) {
            // Bắt các lỗi runtime khác và trả về lỗi server
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xử lý thanh toán: " + e.getMessage());
        } catch (Exception e) {
            // Bắt các lỗi chung khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra: " + e.getMessage());
        }
    }


    @PostMapping("/changePasswordCustomer")
    public ResponseEntity<String> changePasswordCustomer(@Valid @RequestBody ChangePasswordRequest changePasswordRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            // Lấy thông báo lỗi từ `BindingResult`
            StringBuilder errorMessage = new StringBuilder();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage.toString());
        }

        try {
            authenticationService.changePassword(changePasswordRequest);
            return ResponseEntity.ok("Mật khẩu đã được thay đổi thành công.");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu cũ không đúng.");
        } catch (DuplicateEntity e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu mới và xác nhận mật khẩu không trùng.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mật khẩu mới không được trùng với mật khẩu cũ.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi trong quá trình thay đổi mật khẩu.");
        }
    }


}

