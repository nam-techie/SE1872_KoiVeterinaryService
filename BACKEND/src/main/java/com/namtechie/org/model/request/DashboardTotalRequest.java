package com.namtechie.org.model.request;

import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
@NonNull
public class DashboardTotalRequest {
    List<AppointmentDetail> appointments;
    long totalCustomers;
    long totalAppointments;
}
