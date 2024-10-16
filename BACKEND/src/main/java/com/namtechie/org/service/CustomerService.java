package com.namtechie.org.service;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customers;
import com.namtechie.org.model.request.CustomerInfoRequest;
import com.namtechie.org.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ModelMapper modelMapper;

    public Customers getCustomerById() {
        Account curruntAccount = authenticationService.getCurrentAccount();
        return customerRepository.findByAccountId(curruntAccount.getId());
    }

    public CustomerInfoRequest updateCustomerInfo(CustomerInfoRequest customerInfo) {
        try {
            // Lấy tài khoản hiện tại của người dùng đã xác thực
            Account curruntAccount = authenticationService.getCurrentAccount();

            // Kiểm tra xem bác sĩ có tồn tại không, nếu không thì khởi tạo mới
            Customers customer = customerRepository.findByAccountId(curruntAccount.getId());
            if (customer == null) {
                customer = new Customers();  // Khởi tạo đối tượng Doctor mới
                customer.setAccount(curruntAccount);  // Liên kết với tài khoản
            }

            if (!customerInfo.getFullName().equals(customer.getFullname())) {
                customer.setFullname(customerInfo.getFullName());
            }
            if (!customerInfo.getPhone().equals(customer.getPhone())) {
                customer.setPhone(customerInfo.getPhone());
            }
            if (!customerInfo.getAddress().equals(customer.getAddress())) {
                customer.setAddress(customerInfo.getAddress());
            }

            customerRepository.save(customer);
            return modelMapper.map(customer, CustomerInfoRequest.class);
        } catch (Exception e) {
            // Log lỗi hoặc xử lý các ngoại lệ khác nếu cần
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình thêm thông tin bác sĩ. Vui lòng thử lại sau.");
        }
    }

    public List<Customers> getAllCustomers() {
        return customerRepository.findAll();
    }


}
