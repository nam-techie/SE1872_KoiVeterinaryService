package com.namtechie.org.controller;

import com.namtechie.org.entity.*;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.exception.NotFoundException;
import com.namtechie.org.model.request.*;
import com.namtechie.org.model.response.*;
import com.namtechie.org.repository.DoctorRepository;
import com.namtechie.org.repository.FeedbackRepository;
import com.namtechie.org.repository.MedicalRecordedRepository;
import com.namtechie.org.repository.ServiceTypeRepository;
import com.namtechie.org.service.*;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/admin")
@RestController
@PreAuthorize("hasAuthority('ADMIN')") // set từng thằng
@SecurityRequirement(name = "api")
public class AdminController {
    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    DoctorService doctorService;

    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private ServiceTypesService serviceTypesService;
    @Autowired
    private MedicalRecordedRepository medicalRecordedRepository;
    @Autowired
    private AppointmentService appointmentService;

    //APi down is provide for ADMIN
    @PutMapping("/setAccountVeterinary/{email}")
    public ResponseEntity<String> setAccountVeterinary(@PathVariable String email) {
        authenticationService.setVeterinaryAccount(email);
        return new ResponseEntity<>("Tài khoản bác sĩ đã được tạo thành công.", HttpStatus.ACCEPTED);
    }

    @PostMapping(value = "/createAccountVeterinary")
    public AccountResponse registerVeterinary(@Valid @RequestBody VeterinaryRequest veterinaryRequest) {
        AccountResponse newAccount = authenticationService.registerVeterinary(veterinaryRequest);
        System.out.println(newAccount.toString());
        return newAccount;
    }

    @PostMapping(value = "/createAccount")
    public ResponseEntity<?> createAccountForAdmin(@Valid @RequestBody AdminAccountRequest adminAccountRequest) {
        try {
            AccountResponse newAccount = authenticationService.createAccountForAdmin(adminAccountRequest);
            return ResponseEntity.ok(newAccount);
        } catch (DuplicateEntity e) {
            System.out.println(e.toString());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi trong quá trình đăng ký, vui lòng thử lại sau.");
        }
    }

    @GetMapping("/listAccount")
    public List<Account> getAllAccount() {
        List<Account> accounts = authenticationService.getAllAccount();
        return accounts;
    }

    @DeleteMapping("/deleteAccount")
    public ResponseEntity<String> deleteAccount(@RequestParam String email) {
        authenticationService.deleteAccount(email);
        return new ResponseEntity<>("Đã xóa thành công.", HttpStatus.ACCEPTED);
    }

    @PutMapping("/restoreAccount/{email}")
    public ResponseEntity<String> restoreAccount(@PathVariable String email) {
        authenticationService.restoreAccount(email);
        return new ResponseEntity<>("Đã khôi phục thành công.", HttpStatus.ACCEPTED);
    }

    @PutMapping("/updateAccountRole/{email}/{role}")
    public ResponseEntity<String> updateAccountRole(@PathVariable String email, @PathVariable String role) {
        authenticationService.updateRole(email, role);
        return new ResponseEntity<>("Đã cập nhật thành công.", HttpStatus.ACCEPTED);
    }

    @GetMapping("/getInfoDoctor/{doctorId}")
    public DoctorInfoResponse getInfoDoctor(@PathVariable long doctorId) {
        DoctorInfoResponse doctorInfoResponse = doctorService.getAllInfoDoctor(doctorId);
        return doctorInfoResponse;
    }

    @GetMapping("/listAllVeterinary")
    public List<Doctor> getAllDoctor() {
        List<Doctor> listDoctor = doctorRepository.findAll();
        return listDoctor;
    }

    @DeleteMapping("/deleteVeterinaryInfo")
    public ResponseEntity deleteDoctor(long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok("Xóa thông tin bác sĩ thành công!");
    }


    @GetMapping("/getInfoAdmin")
    public ResponseEntity<?> getInfoAdmin() {
        try {
            Account currentAccount = authenticationService.getCurrentAccount();
            AdminInfoRequest accountAdmin = modelMapper.map(currentAccount, AdminInfoRequest.class);
            return ResponseEntity.ok(accountAdmin);
        } catch (Exception e) {
            e.printStackTrace(); // Log lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi lấy thông tin admin: " + e.getMessage());
        }
    }

    @PutMapping("/updateInfoAdmin")
    public ResponseEntity updateInfoAdmin(@ModelAttribute AdminInfoRequest adminInfoRequest) {
        AdminInfoRequest newUpdate = authenticationService.updateAdminInfo(adminInfoRequest);
        return ResponseEntity.ok(newUpdate);
    }

    @GetMapping("/listInfoCustomer")
    public List<Customers> getAllInfoCustomer() {
        return customerService.getAllCustomers();
    }

    @PutMapping("/updateInfoAccount")
    public ResponseEntity<String> updateInfoAccount(@RequestBody AdminAccountResponse adminAccountResponse) {
        try {
            authenticationService.updateAccountInfo(adminAccountResponse);
            return ResponseEntity.ok("Cập nhật thông tin tài khoản thành công");
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (DuplicateEntity e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/updateDoctorInfo/{phone}")
    public ResponseEntity<String> updateDoctorInfo(
            @PathVariable String phone,
            @ModelAttribute DoctorRequest doctorRequest) {  // Thay @RequestBody bằng @ModelAttribute
        try {
            doctorService.updateInfoDoctor(phone, doctorRequest);
            return ResponseEntity.ok("Cập nhật thông tin bác sĩ thành công");
        } catch (DuplicateEntity e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/addDoctor")
    public ResponseEntity<String> addDoctor(@RequestBody UpdateDoctor updateDoctor) {
        try {
            doctorService.addDoctor(updateDoctor);
            return ResponseEntity.status(HttpStatus.CREATED).body("Bác sĩ đã được thêm thành công");
        } catch (DuplicateEntity e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đã xảy ra lỗi trong quá trình thêm bác sĩ");
        }
    }

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/listAllFeedback")
    public List<FeedBack> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    @DeleteMapping("/deleteFeedback/{id}")
    public ResponseEntity<String> deleteFeedback(@PathVariable long id) {
        feedbackService.deleteFeedback(id);
        return new ResponseEntity<>("Đã xóa thành công.", HttpStatus.ACCEPTED);
    }

    @PutMapping("/restoreFeedback/{id}")
    public ResponseEntity<String> restoreFeedback(@PathVariable long id) {
        feedbackService.restoreFeedback(id);
        return new ResponseEntity<>("Đã khôi phục thành công.", HttpStatus.ACCEPTED);
    }

    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @GetMapping("/listAllServiceType")
    public List<ServiceType> getAllServiceType() {
        return serviceTypeRepository.findAll();
    }

    @DeleteMapping("/deleteServiceType/{id}")
    public ResponseEntity<String> deleteServiceType(@PathVariable long id) {
        serviceTypesService.deleteService(id);
        return new ResponseEntity<>("Đã xóa thành công.", HttpStatus.ACCEPTED);
    }

    @PutMapping("/restoreServiceType/{id}")
    public ResponseEntity<String> restoreServiceType(@PathVariable long id) {
        serviceTypesService.restoreService(id);
        return new ResponseEntity<>("Đã khôi phục thành công.", HttpStatus.ACCEPTED);
    }

    @PutMapping("/editServiceType/{id}")
    public ResponseEntity<String> editServiceType(@PathVariable long id, @RequestBody ServiceRequest serviceRequest) {
        try {
            serviceTypesService.editService(id, serviceRequest);
            return new ResponseEntity<>("Đã cập nhật thông tin dịch vụ thành công", HttpStatus.ACCEPTED);
        } catch (DuplicateEntity e) {
            return new ResponseEntity<>("Dịch vụ đã tồn tại!", HttpStatus.CONFLICT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Dữ liệu không hợp lệ!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/addNewService")
    public ResponseEntity<String> addNewService(@RequestBody ServiceRequest serviceRequest) {
        try {
            serviceTypesService.addService(serviceRequest);
            return new ResponseEntity<>("Đã thêm thông tin dịch vụ thành công", HttpStatus.CREATED);
        } catch (DuplicateEntity e) {
            return new ResponseEntity<>("Dịch vụ đã tồn tại!", HttpStatus.CONFLICT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Dữ liệu không hợp lệ!", HttpStatus.BAD_REQUEST);
        }
    }

    @Autowired
    private MedicalRecordedRepository recordedRepository;

    @Autowired
    private MedicalRecordedService medicalRecordedService;

    @GetMapping("/listAllFish")
    public List<FishResponse> getAllFish() {
        return medicalRecordedService.findAllFish();
    }

    @PutMapping("/editInfoFish")
    public ResponseEntity<String> editInfoFish(@RequestBody FishRequest fishRequest) {
        try {
            medicalRecordedService.updateInfoFish(fishRequest);
            return new ResponseEntity<>("Đã thêm thay đổi thôn tin hồ sơ bệnh nhân thành công", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>("Dữ liệu không hợp lệ!", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/listAppointment")
    public ResponseEntity<List<AppointmentResponse>> getAllAppointment() {
        try {
            List<AppointmentResponse> appointments = appointmentService.getListAppoint();
            return new ResponseEntity<>(appointments, HttpStatus.OK);  // Trả về HTTP 200 OK
        } catch (Exception e) {
            // Log lỗi ra nếu cần
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);  // Trả về HTTP 500 nếu có lỗi
        }
    }

    @PutMapping("/cancelAppointmentByAdmin/{appointmentId}")
    public ResponseEntity cancelAppointmentByAdmin(@PathVariable long appointmentId) {
        appointmentService.cancelAppointmentByCustomer(appointmentId);
        return ResponseEntity.ok("Đã hủy thành công");
    }


    //AN lam
    @GetMapping("/getAppointment")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity getAppointments() {
        List<Appointment> appointmentResponses = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointmentResponses);
    }

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/confirmPaymentDeposit/{id}")
    public ResponseEntity  generatePayment(@PathVariable long id) {
        paymentService.generatePaymentDeposit(id);
        return ResponseEntity.ok("Nhận được tiền cọc thành công!");
    }

    @PostMapping("/confirmPaymentTotal/{appointmentId}")
    public ResponseEntity paymentTotal(@PathVariable long appointmentId) {
        paymentService.updateTotalFee(appointmentId);
        return ResponseEntity.ok("Da luu thanh cong");
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






}
