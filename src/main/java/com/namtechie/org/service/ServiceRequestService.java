package com.namtechie.org.service;

import com.namtechie.org.dto.ServiceRequestDTO;
import com.namtechie.org.dto.ServiceResponeDTO;
import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customer;
import com.namtechie.org.entity.ServiceRequest;
import com.namtechie.org.entity.Veterian;
import com.namtechie.org.exception.AccountNotFoundException;
import com.namtechie.org.repository.AccountRepository;
import com.namtechie.org.repository.CustomerRepository;
import com.namtechie.org.repository.ServiceRequestRepository;
import com.namtechie.org.repository.VeterianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class ServiceRequestService implements UserDetailsService {
    @Autowired
    ServiceRequestRepository serviceRequestRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VeterianRepository veterianRepository;

    public ServiceRequest createServiceRequests(ServiceRequestDTO serviceRequestDTO) {
        ServiceRequest serviceRequest = convertDTOtoEntity(serviceRequestDTO);
        serviceRequest.setRequestDate(new Date());
        serviceRequest.setStatus("Pending");
        return serviceRequestRepository.save(serviceRequest);
    }


    public ServiceRequest convertDTOtoEntity(ServiceRequestDTO dto) {
        ServiceRequest serviceRequest = new ServiceRequest();

            // Tìm account dựa trên accountId được gửi trong DTO
            Optional<Account> accountOpt = accountRepository.findById(dto.getAccountID());
            if(accountOpt.isPresent()) {
                Account account = accountOpt.get();

                // Tìm hoặc tạo mới bản ghi Customer liên kết với account này
                Customer customer = customerRepository.findCustomerByAccount(account)
                    .orElse(new Customer());

                customer.setAccount(account);
                customer.setFullname(dto.getFullNameCustomer());
                customer.setPhone(dto.getPhone());
                customerRepository.save(customer);
                serviceRequest.setCustomer(customer);
            }else{
                throw new AccountNotFoundException("Account chưa tồn tại. Người dùng chưa đăng nhập");
            }

        // Tìm đối tượng Veterian theo veterianID
        try{
            Veterian veterian = veterianRepository.findVeterianByVeterianID(dto.getVeterianID());
            serviceRequest.setVeterian(veterian);
        }catch (Exception e) {
            throw new RuntimeException("Veterian not found");
        }

        // Gán các thuộc tính khác
        serviceRequest.setServiceType(dto.getServiceType());
        serviceRequest.setPreferredDate(dto.getPreferredDate());
        serviceRequest.setPhone(dto.getPhone());
        serviceRequest.setAddress(dto.getAddress());

        return serviceRequest;
    }

    public ServiceResponeDTO convertEntityToDTO(ServiceRequest serviceRequest) {
        ServiceResponeDTO serviceResponeDTO = new ServiceResponeDTO();
        serviceResponeDTO.getServiceRequestID();
        serviceResponeDTO.getFullNameCustomer();
        serviceResponeDTO.getFullNameVeterian();
        serviceResponeDTO.getServiceType();
        serviceResponeDTO.getRequestDate();
        serviceResponeDTO.setPreferredDate(serviceRequest.getPreferredDate());
        serviceResponeDTO.getAddress();
        serviceResponeDTO.getStatus();
        return serviceResponeDTO;
    }




    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return accountRepository.findAccountByUsername(username);
    }
    public List<ServiceRequest> getAllRequestServices() {
        return serviceRequestRepository.findAll();
    }
}
