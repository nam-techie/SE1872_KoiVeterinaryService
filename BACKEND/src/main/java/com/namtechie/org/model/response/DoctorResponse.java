package com.namtechie.org.model.response;

import com.namtechie.org.entity.Doctor;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
@NonNull
public class DoctorResponse {
    Doctor doctor;
    double rateAverage;
}
