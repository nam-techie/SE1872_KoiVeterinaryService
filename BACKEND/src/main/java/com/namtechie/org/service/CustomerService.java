package com.namtechie.org.service;

import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Customers;
import com.namtechie.org.model.request.CustomerInfoRequest;
import com.namtechie.org.model.response.CustomerProfileUpdateResponse;
import com.namtechie.org.model.response.InfoCustomerResponse;
import com.namtechie.org.repository.AccountRepository;
import com.namtechie.org.repository.CustomerRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    ModelMapper modelMapper;


    public InfoCustomerResponse getInfoCustomer() {
        try {
            // Lấy tài khoản hiện tại
            Account currentAccount = authenticationService.getCurrentAccount();

            // Tìm khách hàng dựa trên tài khoản
            Customers currentCustomer = customerRepository.findByAccountId(currentAccount.getId());

            // Kiểm tra nếu không tìm thấy khách hàng
            if (currentCustomer == null) {
                throw new RuntimeException("Không tìm thấy thông tin khách hàng cho tài khoản này.");
            }

            InfoCustomerResponse response = new InfoCustomerResponse();
            response.setUsername(currentAccount.getUsername());
            response.setEmail(currentAccount.getEmail());
            response.setPhone(currentCustomer.getPhone());
            response.setFullName(currentCustomer.getFullName());
            response.setAddress(currentCustomer.getAddress());

            return response;
        } catch (RuntimeException e) {
            // Bắt lỗi RuntimeException và ném lại với thông tin lỗi rõ ràng hơn
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình lấy thông tin khách hàng: " + e.getMessage());
        } catch (Exception e) {
            // Bắt các lỗi khác và ném lỗi với mã 500 (Internal Server Error)
            e.printStackTrace();
            throw new RuntimeException("Lỗi hệ thống: " + e.getMessage());
        }
    }


    public CustomerInfoRequest updateCustomerInfo(CustomerInfoRequest customerInfo) {
        try {
            // Lấy tài khoản hiện tại của người dùng đã xác thực
            Account curruntAccount = authenticationService.getCurrentAccount();
            if (customerInfo.getEmail().equals(curruntAccount.getEmail()) || !accountRepository.existsByEmail(customerInfo.getEmail())) {
                curruntAccount.setEmail(customerInfo.getEmail());
            }

            // Kiểm tra xem khách hàng có tồn tại không, nếu không thì khởi tạo mới
            Customers customer = customerRepository.findByAccountId(curruntAccount.getId());
            if (customer == null) {
                Customers newCustomer = new Customers();
                newCustomer.setPhone(customerInfo.getPhoneNumber());
                newCustomer.setFullName(customerInfo.getFullName());
                newCustomer.setAddress(customerInfo.getAddress());
                customerRepository.save(newCustomer);
            } else {
                // Kiểm tra email trùng lặp

                if (customerInfo.getPhoneNumber().equals(customer.getPhone()) || !customerRepository.existsByPhone(customerInfo.getPhoneNumber())) {
                    customer.setPhone(customerInfo.getPhoneNumber());
                }

                // Cập nhật các giá trị khác
                if (!Objects.equals(customerInfo.getFullName(), customer.getFullName())) {
                    customer.setFullName(customerInfo.getFullName());
                }
                if (!Objects.equals(customerInfo.getAddress(), customer.getAddress())) {
                    customer.setAddress(customerInfo.getAddress());
                }
                customerRepository.save(customer);
            }


            // Lưu thông tin cập nhật vào database
            accountRepository.save(curruntAccount);
            return modelMapper.map(customer, CustomerInfoRequest.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình cập nhật thông tin khách hàng.");
        }
    }


    public void updateProfile(long accountId, CustomerProfileUpdateResponse cusUpdate) {
        Account account = accountRepository.findAccountById(accountId);
        try {
            if (account != null) {
                account.setEmail(cusUpdate.getEmail());

                Customers customer = customerRepository.findByAccountId(accountId);
                customer.setFullName(cusUpdate.getCustomerUsername());
                customer.setPhone(cusUpdate.getPhoneNumber());
                customer.setAddress(cusUpdate.getAddress());
                customerRepository.save(customer);
            } else {
                throw new RuntimeException("Error123");
            }
        } catch (RuntimeException e) {
            throw new RuntimeException("Error");
        }


    }


    public List<Customers> getAllCustomers() {
        return customerRepository.findAll();
    }


}
