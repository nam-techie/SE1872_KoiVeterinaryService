package com.namtechie.org.controller;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.AppointmentStatus;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.exception.BadCredentialsException;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.model.request.*;
import com.namtechie.org.model.response.*;
import com.namtechie.org.repository.DoctorRepository;
import com.namtechie.org.service.AppointmentService;
import com.namtechie.org.service.AuthenticationService;
import com.namtechie.org.service.DoctorService;
import com.namtechie.org.service.PaymentService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/api/veterinary")
@RestController
@PreAuthorize("hasAuthority('VETERINARY')") // set từng thằng
@SecurityRequirement(name = "api")

public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private AuthenticationService authenticationService;

//    @PutMapping("/updateInfo")
//    public ResponseEntity updateInforVeterinary(DoctorRequest doctorRequest) {
//        Doctor updateDoctor = doctorService.addInfoVeterinary(doctorRequest);
//        return ResponseEntity.ok(updateDoctor);
//    }

    @GetMapping("/listVeterinaryInfo")
    public ResponseEntity getDoctor() {
        Doctor findDoctor = doctorService.getDoctorById();
        return ResponseEntity.ok(findDoctor);
    }

    @PutMapping("/isDoctorConfirm/{appointmentId}")
    public ResponseEntity isConfirm(@PathVariable long appointmentId) {
        AppointmentStatus appointmentStatus = appointmentService.confirmDoctorAppointment(appointmentId);
        return ResponseEntity.ok(appointmentStatus);
    }

    @PutMapping("/isDoctorCancel/{status}")
    public ResponseEntity isCancel(@PathVariable boolean status, @RequestBody CancelReasonRequest cancelReasonRequest) {
        appointmentService.cancelAppointmentByDoctor(status, cancelReasonRequest);
        return ResponseEntity.ok("Đã hủy lịch thành công!!!");
    }


    @PutMapping("/updateWorkingStatus/{appointmentId}")
    public ResponseEntity updateWorkingStatus(@PathVariable long appointmentId) {
        doctorService.updateWorkingStatus(appointmentId);
        return ResponseEntity.ok("Da tiep nhan dich vu");
    }


//    @PutMapping("/doneWorkingStatus/{appointmentId}")
//    public ResponseEntity doneWorkingStatus(@PathVariable  long appointmentId, @RequestBody String notes) {
//        doctorService.doneWorkingStatus(appointmentId, notes);
//        return ResponseEntity.ok("Da hoan thanh");
//    }

//    @PostMapping("/createInfoFish/{appointmentId}")
//    @PreAuthorize("hasAuthority('VETERINARY')")
//    public ResponseEntity  addInfoFish(@PathVariable long appointmentId, @RequestBody MedicalFishResquest medicalFishResquests) {
//        MedicalFishResquest createFish = doctorService.createFishInfor(appointmentId, medicalFishResquests);
//        return ResponseEntity.ok(createFish);
//    }

    @PostMapping("/image/{id}")
    public ResponseEntity uploadImage(@PathVariable long id, @RequestPart MultipartFile file) {
        doctorService.uploadImage(id, file);
        return ResponseEntity.ok("Uploaded image successfully");
    }


    @PutMapping("/cancelAppointmentByDoctor/{appointmentId}")
    public ResponseEntity cancelAppointmentByDoctor(@PathVariable long appointmentId) {
        appointmentService.cancelAppointmentByCustomer(appointmentId);
        return ResponseEntity.ok("Đã hủy thành công");
    }


    @GetMapping("/getListAppointmentDoctor")
    public ResponseEntity getListAppointmentDoctor() {
        List<AppointmentStatusResponse> listAppointmentStatusDoctor = doctorService.getListAppointmentDoctor();

        return ResponseEntity.ok(listAppointmentStatusDoctor);
    }

    @GetMapping("/getListAppointmentDoctor/{appointmentId}")
    public ResponseEntity getAppointmentDoctor(@PathVariable long appointmentId) {
        DoctorAppointmentResponse appointmentStatusDoctor = doctorService.getAppoinmentDoctor(appointmentId);
        return ResponseEntity.ok(appointmentStatusDoctor);
    }

    @GetMapping("/getListDoctorWork")
    public ResponseEntity getListDoctorWork() {
        List<DoctorWorkResponse> listDoctorWork = doctorService.getDoctorWork();

        return ResponseEntity.ok(listDoctorWork);
    }

    @GetMapping("/findAppointmentDoctorById/{accountId}")
    @PreAuthorize("hasAuthority('VETERINARY')")
    public ResponseEntity findAppointmentDoctorById(@PathVariable long accountId) {
        List<Appointment> appointmentResponses = appointmentService.findAppointmentByAccountId(accountId);
        return ResponseEntity.ok(appointmentResponses);
    }

    @GetMapping("/findAppoinmentId/{accountId}")
    @PreAuthorize("hasAuthority('VETERINARY')")
    public ResponseEntity findAppoinmentId(@PathVariable long accountId) {
        long appointmentId = appointmentService.findAppointmentIdStep(accountId);
        return ResponseEntity.ok(appointmentId);
    }

    @Autowired
    PaymentService paymentService;

    @PostMapping("/saveServiceTypeAdd/{appointmentId}")
    public ResponseEntity saveServiceTypeAdd(@PathVariable long appointmentId, @RequestBody ServiceTypeRequestAll serviceTypeRequestAll) {
        try {
            paymentService.saveTransactionRecordedAndDoneWorking(appointmentId, serviceTypeRequestAll);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("Đã lưu hồ sơ bệnh nhân thành công");
    }

    @GetMapping("/countStatusTotal")
    public ResponseEntity<CountAppointmentDoctorRequest> countStatusTotal() {
        CountAppointmentDoctorRequest response = doctorService.countStatusTotal();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getInfoCurrentDoctor")
    public ResponseEntity<DoctorInfoAndFeedbackResponse> getInfoCurrentDoctor() {
        DoctorInfoAndFeedbackResponse currentDoctor = doctorService.getResponseInfoAndFeedback();
        return ResponseEntity.ok(currentDoctor);
    }

    @PutMapping("/updateDoctorInfoByDoctor")
    public ResponseEntity<String> updateDoctorInfo(
            @ModelAttribute DoctorRequest doctorRequest) {  // Thay @RequestBody bằng @ModelAttribute
        try {
            doctorService.updateInfoDoctorByDoctor(doctorRequest);
            return ResponseEntity.ok("Cập nhật thông tin bác sĩ thành công");
        } catch (DuplicateEntity e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/changePasswordDoctor")
    public ResponseEntity<?> changePasswordDoctor(ChangePasswordRequest changePasswordRequest) {
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