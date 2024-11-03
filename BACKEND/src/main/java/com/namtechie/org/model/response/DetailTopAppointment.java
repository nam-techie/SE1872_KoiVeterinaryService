package com.namtechie.org.model.response;

import com.namtechie.org.model.CustomerInfo;
import com.namtechie.org.model.DoctorInfoTop3;
import com.namtechie.org.model.ServiceInfo;
import lombok.Data;
import java.util.List;

@Data
public class DetailTopAppointment {
    private List<CustomerInfo> topCustomers;
    private List<ServiceInfo> topServices;
    private List<DoctorInfoTop3> topDoctors;
}
