package com.namtechie.org.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorInfoTop3 {
    private long id;
    private String name;
    private long appointmentCount;
}
