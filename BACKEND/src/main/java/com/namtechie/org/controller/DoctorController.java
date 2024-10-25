package com.namtechie.org.controller;

import com.namtechie.org.entity.Doctor;
import com.namtechie.org.model.UpdateDoctorLogin;
import com.namtechie.org.model.request.DoctorRequest;
import com.namtechie.org.model.request.MedicalFishResquest;
import com.namtechie.org.service.DoctorService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/veterinary")
@RestController
@PreAuthorize("hasAuthority('VETERINARY')") // set từng thằng
@SecurityRequirement(name = "api")

public class DoctorController {
    @Autowired
    DoctorService doctorService;

    @PutMapping("/updateInfo")
    public ResponseEntity updateInforVeterinary(DoctorRequest doctorRequest) {
        Doctor updateDoctor = doctorService.addInfoVeterinary(doctorRequest);
        return ResponseEntity.ok(updateDoctor);
    }

    @GetMapping("/listVeterinaryInfo")
    public ResponseEntity getDoctor() {
        Doctor findDoctor = doctorService.getDoctorById();
        return ResponseEntity.ok(findDoctor);
    }


    @PutMapping("/updateWorkingStatus/{appointmentId}")
    public ResponseEntity updateWorkingStatus(@PathVariable long appointmentId, @RequestBody String notes) {
        doctorService.updateWorkingStatus(appointmentId, notes);
        return ResponseEntity.ok("Da tiep nhan dich vu");
    }

//    @PutMapping("/doneWorkingStatus/{appointmentId}")
//    public ResponseEntity doneWorkingStatus(@PathVariable  long appointmentId, @RequestBody String notes) {
//        doctorService.doneWorkingStatus(appointmentId, notes);
//        return ResponseEntity.ok("Da hoan thanh");
//    }

    @PostMapping("/createInfoFish")
    public ResponseEntity<MedicalFishResquest> addInfoFish(@RequestBody MedicalFishResquest medicalFishResquest) {
        MedicalFishResquest createFish = doctorService.createFishInfor(medicalFishResquest);
        return  ResponseEntity.ok(createFish);
    }

}
