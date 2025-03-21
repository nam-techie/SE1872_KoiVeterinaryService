package com.namtechie.org.model.response;


import com.namtechie.org.entity.Doctor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;


@Data
@NonNull
@AllArgsConstructor
@NoArgsConstructor
public class DoctorResponse {
    Doctor doctor;
    double rateAverage;
    String qualification;


}
