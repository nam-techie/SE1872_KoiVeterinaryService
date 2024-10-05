package com.namtechie.org.service;

import com.namtechie.org.dto.ServiceRequestDTO;
import com.namtechie.org.entity.Customer;
import com.namtechie.org.entity.ServiceRequest;
import com.namtechie.org.entity.Veterian;
import com.namtechie.org.repository.CustomerRepository;
import com.namtechie.org.repository.ServiceRequestRepository;
import com.namtechie.org.repository.VeterianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;



@Service
public class ServiceRequestService implements UserDetailsService {
    @Autowired
    ServiceRequestRepository serviceRequestRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VeterianRepository veterianRepository;

    public ServiceRequest createServiceRequests(ServiceRequest serviceRequest) {
        ServiceRequest request = serviceRequestRepository.save(serviceRequest);
        return request;
    }
    public ServiceRequest convertDTOtoEntity(ServiceRequestDTO dto) {
        ServiceRequest serviceRequest = new ServiceRequest();

        // Tìm đối tượng Customer theo customerID
        Customer customer = customerRepository.findById(dto.getCustomerID())
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        serviceRequest.setCustomer(customer);

        // Tìm đối tượng Veterian theo veterianID
        Veterian veterian = veterianRepository.findById(dto.getVeterianID())
                .orElseThrow(() -> new RuntimeException("Veterian not found"));
        serviceRequest.setVeterian(veterian);

        // Gán các thuộc tính khác
        serviceRequest.setServiceType(dto.getServiceType());
        serviceRequest.setRequestDate(dto.getRequestDate());
        serviceRequest.setPreferredDate(dto.getPreferredDate());
        serviceRequest.setStatus(dto.getStatus());
        serviceRequest.setPhone(dto.getPhone());
        serviceRequest.setAddress(dto.getAddress());

        return serviceRequest;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return customerRepository.findCustomerByFullname(username);
    }
}
