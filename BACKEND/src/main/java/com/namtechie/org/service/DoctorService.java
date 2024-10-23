package com.namtechie.org.service;


import com.namtechie.org.entity.Account;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.entity.DoctorInfo;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.exception.NotFoundException;
import com.namtechie.org.model.request.DoctorRequest;
import com.namtechie.org.model.request.UpdateDoctor;
import com.namtechie.org.model.request.VeterinaryRequest;
import com.namtechie.org.model.response.DoctorInfoResponse;
import com.namtechie.org.repository.AccountRepository;
import com.namtechie.org.repository.DoctorInfoRepository;
import com.namtechie.org.repository.DoctorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    DoctorInfoRepository doctorInfoRepository;

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

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public void deleteDoctor(long id) {
        try {
            Doctor deleteDoctor = doctorRepository.findDoctorById(id);
            if (deleteDoctor == null) {
                throw new RuntimeException("Không có thông tin của bác sĩ bạn cần tìm!");
            }
            doctorRepository.delete(deleteDoctor);
        } catch (Exception e) {
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình xóa thông tin bác sĩ. Vui lòng thử lại sau.");
        }
    }

    public Doctor getDoctorById() {
        Account curruntAccount = getCurrentAccount();
        return doctorRepository.findDoctorById(curruntAccount.getId());
    }


    public DoctorInfoResponse getAllInfoDoctor(long doctorId) {
        DoctorInfoResponse doctorInfoResponse = new DoctorInfoResponse();

        Doctor doctor = doctorRepository.findDoctorById(doctorId);
        doctorInfoResponse.setFullName(doctor.getFullName());
        doctorInfoResponse.setPhone(doctor.getPhone());
        doctorInfoResponse.setExperience(doctor.getExperience());

        DoctorInfo doctorInfo = doctorInfoRepository.findDoctorInfoByDoctorId(doctorId);
        doctorInfoResponse.setDescription(doctorInfo.getDescription());
        doctorInfoResponse.setQualification(doctorInfo.getQualification());
        doctorInfoResponse.setSpecialty(doctorInfo.getSpecialty());

        return doctorInfoResponse;
    }

    public void updateInfoDoctor(String phone, DoctorRequest doctorRequest) {
        try {
            // Lấy bác sĩ hiện tại theo số điện thoại (phone)
            Doctor updateDoctor = doctorRepository.findDoctorByPhone(phone);
            DoctorInfo updateDoctorInfo = doctorInfoRepository.findDoctorInfoByDoctorId(updateDoctor.getId());

            // Kiểm tra nếu số điện thoại trong request khác với số hiện tại và đã tồn tại trong cơ sở dữ liệu
            if (!doctorRequest.getPhone().equals(phone) && doctorRepository.existsByPhone(doctorRequest.getPhone())) {
                throw new DuplicateEntity("Số điện thoại đã được sử dụng bởi cá nhân khác.");
            }

            // Cập nhật thông tin
            updateDoctor.setFullName(doctorRequest.getFullName());
            updateDoctor.setPhone(doctorRequest.getPhone()); // Cho phép cập nhật số điện thoại mới
            updateDoctor.setExperience(doctorRequest.getExperience());
            updateDoctorInfo.setDescription(doctorRequest.getDescription());
            updateDoctorInfo.setQualification(doctorRequest.getQualification());
            updateDoctorInfo.setSpecialty(doctorRequest.getSpecialty());

            // Lưu thông tin cập nhật
            doctorRepository.save(updateDoctor);
            doctorInfoRepository.save(updateDoctorInfo);

        } catch (DuplicateEntity e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình cập nhật thông tin bác sĩ.");
        }
    }

    public void addDoctor(UpdateDoctor updateDoctor) {
        try {
            if (accountRepository.existsByEmail(updateDoctor.getEmail())) {
                throw new DuplicateEntity("Email đã được sử dụng bởi cá nhân khác.");
            }
            VeterinaryRequest emailDoctor = modelMapper.map(updateDoctor.getEmail(), VeterinaryRequest.class);
            authenticationService.registerVeterinary(emailDoctor);

            if (doctorRepository.existsByPhone(updateDoctor.getPhone())) {
                throw new DuplicateEntity("Số điện thoại đã được sử dụng bởi cá nhân khác.");
            }
            Doctor newDoctor = new Doctor();
            DoctorInfo newDoctorInfo = new DoctorInfo();

            // Cập nhật thông tin
            newDoctor.setFullName(updateDoctor.getFullName());
            newDoctor.setPhone(updateDoctor.getPhone()); // Cho phép cập nhật số điện thoại mới
            newDoctor.setExperience(updateDoctor.getExperience());
            newDoctorInfo.setDescription(updateDoctor.getDescription());
            newDoctorInfo.setQualification(updateDoctor.getQualification());
            newDoctorInfo.setSpecialty(updateDoctor.getSpecialty());

            // Lưu thông tin cập nhật
            doctorRepository.save(newDoctor);
            doctorInfoRepository.save(newDoctorInfo);

        } catch (DuplicateEntity e) {
            throw e;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình thêm thông tin bác sĩ.");
        }
    }


}
