//package com.namtechie.org.service;
//
//import com.namtechie.org.entity.Account;
//import com.namtechie.org.entity.Customers;
//import com.namtechie.org.model.request.CustomerInfoRequest;
//import com.namtechie.org.model.response.InfoCustomerResponse;
//import com.namtechie.org.repository.CustomersRepository;
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Objects;
//
//@Service
//public class CustomerService {
//    @Autowired
//    CustomersRepository customerRepository;
//
//    @Autowired
//    AuthenticationService authenticationService;
//
//    @Autowired
//    ModelMapper modelMapper;
//
//    public InfoCustomerResponse getInfoCustomer() {
//        try {
//            // Lấy tài khoản hiện tại
//            Account currentAccount = authenticationService.getCurrentAccount();
//
//            // Tìm khách hàng dựa trên tài khoản
//            Customers currentCustomer = customerRepository.findByAccountId(currentAccount.getId());
//
//            // Kiểm tra nếu không tìm thấy khách hàng
//            if (currentCustomer == null) {
//                throw new RuntimeException("Không tìm thấy thông tin khách hàng cho tài khoản này.");
//            }
//
//            InfoCustomerResponse response = new InfoCustomerResponse();
//            response.setUsername(currentAccount.getUsername());
//            response.setEmail(currentAccount.getEmail());
//            response.setPhone(currentCustomer.getPhoneNumber());
//            response.setFullName(currentCustomer.getFullName());
//            response.setAddress(currentCustomer.getAddress());
//
//            return response;
//        } catch (RuntimeException e) {
//            // Bắt lỗi RuntimeException và ném lại với thông tin lỗi rõ ràng hơn
//            e.printStackTrace();
//            throw new RuntimeException("Đã xảy ra lỗi trong quá trình lấy thông tin khách hàng: " + e.getMessage());
//        } catch (Exception e) {
//            // Bắt các lỗi khác và ném lỗi với mã 500 (Internal Server Error)
//            e.printStackTrace();
//            throw new RuntimeException("Lỗi hệ thống: " + e.getMessage());
//        }
//    }
//
//
//    public CustomerInfoRequest updateCustomerInfo(CustomerInfoRequest customerInfo) {
//        try {
//            // Lấy tài khoản hiện tại của người dùng đã xác thực
//            Account curruntAccount = authenticationService.getCurrentAccount();
//
//            // Kiểm tra xem khách hàng có tồn tại không, nếu không thì khởi tạo mới
//            Customers customer = customerRepository.findByAccountId(curruntAccount.getId());
//            if (customer == null) {
//                customer = new Customers();  // Khởi tạo đối tượng Customers mới
//                customer.setAccount(curruntAccount);  // Liên kết với tài khoản
//            }
//
//            // So sánh và cập nhật các giá trị
//            if (!Objects.equals(customerInfo.getFullName(), customer.getFullName())){
//                customer.setFullName(customerInfo.getFullName());
//            }
//            if (!Objects.equals(customerInfo.getPhoneNumber(), customer.getPhoneNumber())) {
//                customer.setPhoneNumber(customerInfo.getPhoneNumber());
//            }
//            if (!Objects.equals(customerInfo.getAddress(), customer.getAddress())) {
//                customer.setAddress(customerInfo.getAddress());
//            }
//
//            // Lưu thông tin cập nhật vào database
//            customerRepository.save(customer);
//            return modelMapper.map(customer, CustomerInfoRequest.class);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException("Đã xảy ra lỗi trong quá trình cập nhật thông tin khách hàng.");
//        }
//    }
//
//    public List<Customers> getAllCustomers() {
//        return customerRepository.findAll();
//    }
//
//
//}
