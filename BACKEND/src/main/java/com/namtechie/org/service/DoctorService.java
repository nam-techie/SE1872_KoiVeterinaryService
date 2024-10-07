package com.namtechie.org.service;


import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.entity.Role;
import com.namtechie.org.model.UpdateDoctorLogin;
import com.namtechie.org.model.request.DoctorRequest;
import com.namtechie.org.repository.AccountRepository;
import com.namtechie.org.repository.DoctorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    ModelMapper modelMapper;

    public Account getCurrentAccount() {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return accountRepository.findAccountById(account.getId());
    }

    public Doctor addInfoVeterinary(DoctorRequest doctorRequest) {
        try {
            // Lấy tài khoản hiện tại của người dùng đã xác thực
            Account currentAccount = getCurrentAccount();
            // Kiểm tra nếu tài khoản hiện tại đã có bác sĩ nào được liên kết hay chưa
            boolean existingDoctor = doctorRepository.existsByAccountId(currentAccount.getId());

            if (!currentAccount.getRole().equals(Role.VETERINARY.name())) {
                throw new RuntimeException("Chỉ tài khoản của bác sĩ mới có thể thực hiện hành động này.");
            } else if (existingDoctor) {
                throw new IllegalArgumentException("Tài khoản này đã có thông tin bác sĩ.");
            }

            // Tạo đối tượng Doctor mới và thiết lập các thuộc tính
            Doctor doctor = new Doctor();
            doctor.setFullname(doctorRequest.getFullName());
            doctor.setExperience(doctorRequest.getExperience());
            doctor.setSpecialty(doctorRequest.getSpecialty());
            doctor.setAccount(currentAccount);

            // Lưu đối tượng Doctor vào cơ sở dữ liệu
            return doctorRepository.save(doctor);

        } catch (IllegalArgumentException e) {
            // Xử lý trường hợp tài khoản đã có bác sĩ
            throw new RuntimeException("Tài khoản này đã có thông tin của bác sĩ.");
        } catch (Exception e) {
            // Log lỗi hoặc xử lý các ngoại lệ khác nếu cần
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình thêm thông tin bác sĩ. Vui lòng thử lại sau.");
        }
    }

    public void updateAccount(UpdateDoctorLogin updateInfo) {
        try {
            Account currentAccount = getCurrentAccount();
            if (!currentAccount.getRole().equals(Role.VETERINARY.name())) {
                throw new RuntimeException("Chỉ tài khoản của bác sĩ mới có thể thực hiện hành động này.");
            } else if (!updateInfo.getPassword().equals(updateInfo.getConfirmPassword())) {
                throw new IllegalArgumentException("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            }
            currentAccount.setUsername(updateInfo.getUsername());
            currentAccount.setPassword(passwordEncoder.encode(updateInfo.getPassword()));
            accountRepository.save(currentAccount);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình cập nhật tài khoản. Vui lòng thử lại sau.");
        }
    }

}
