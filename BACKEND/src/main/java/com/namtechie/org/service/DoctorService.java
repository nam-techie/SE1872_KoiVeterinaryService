package com.namtechie.org.service;


import com.namtechie.org.entity.*;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.exception.NotFoundException;
import com.namtechie.org.model.request.DoctorRequest;
import com.namtechie.org.model.request.MedicalFishResquest;
import com.namtechie.org.model.request.UpdateDoctor;
import com.namtechie.org.model.request.VeterinaryRequest;
import com.namtechie.org.model.response.CloudinaryResponse;
import com.namtechie.org.model.response.DoctorInfoResponse;
import com.namtechie.org.repository.*;
import com.namtechie.org.repository.DoctorInfoRepository;
import com.namtechie.org.util.FileUpLoadUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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
    AppointmentRepository appointmentRepository;

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    AppointmentStatusRepository appointmentStatusRepository;


    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MedicalRecordedRepository medicalRecordedRepository;

    @Autowired
    ModelMapper modelMapper;
    @Autowired
    private CloudinaryService cloudinaryService;


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


    public List<Doctor> getAllInfoDoctor() {
        List<Doctor> doctors = doctorRepository.findAll();
        return doctors;
    }

    public DoctorInfoResponse getAllInfoDoctor(long doctorId) {
        DoctorInfoResponse doctorInfoResponse = new DoctorInfoResponse();

        Doctor doctor = doctorRepository.findDoctorById(doctorId);
        doctorInfoResponse.setFullName(doctor.getFullName());
        doctorInfoResponse.setPhone(doctor.getPhone());
        doctorInfoResponse.setExperience(doctor.getExperience());
        doctorInfoResponse.setImageUrl(doctor.getImageUrl());

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

            // Xử lý upload ảnh nếu có
            if (doctorRequest.getImageUrl() != null && !doctorRequest.getImageUrl().isEmpty()) {
                uploadImage(updateDoctor.getId(), doctorRequest.getImageUrl());
            }




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

    public Doctor addInfoVeterinary(DoctorRequest doctorRequest) {
        try {
            // Lấy tài khoản hiện tại của người dùng đã xác thực
            Account currentAccount = getCurrentAccount();
//            if (!currentAccount.getRole().equals(Role.VETERINARY.name())) {
//                throw new RuntimeException("Chỉ tài khoản của bác sĩ mới có thể thực hiện hành động này.");
//            } check tài khỏan hiện tại thì có token và role VETERINARY rồi nên ko cần check lại

            // Kiểm tra xem bác sĩ có tồn tại không, nếu không thì khởi tạo mới
            Doctor doctor = doctorRepository.findByAccountId(currentAccount.getId());
            if (doctor == null) {
                doctor = new Doctor();  // Khởi tạo đối tượng Doctor mới
                doctor.setAccount(currentAccount);  // Liên kết với tài khoản
            }

            // Xét trường hợp nếu user ko nhập gì thì ko update
            if (!doctorRequest.getFullName().equals(doctor.getFullName())) {
                doctor.setFullName(doctorRequest.getFullName());
            }
            if (!doctorRequest.getPhone().equals(doctor.getPhone())) {
                doctor.setPhone(doctorRequest.getPhone());
            }

            // Lưu đối tượng Doctor vào cơ sở dữ liệu
            return doctorRepository.save(doctor);

        } catch (Exception e) {
            // Log lỗi hoặc xử lý các ngoại lệ khác nếu cần
            e.printStackTrace();
            throw new RuntimeException("Đã xảy ra lỗi trong quá trình thêm thông tin bác sĩ. Vui lòng thử lại sau.");
        }
    }

    public void updateWorkingStatus(long id, String notes) {

        Appointment appointment = appointmentRepository.findAppointmentById(id);
        AppointmentStatus appointmentStatus  = new AppointmentStatus();

        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Dang cung cap dich vu");
        appointmentStatus.setNotes(notes);

        appointmentStatusRepository.save(appointmentStatus);
    }

//    public void doneWorkingStatus(long id, String notes) {
//
//        Appointment appointment = appointmentRepository.findAppointmentById(id);
//        AppointmentStatus appointmentStatus  = new AppointmentStatus();
//
//        appointmentStatus.setAppointment(appointment);
//        appointmentStatus.setStatus("Done");
//        appointmentStatus.setNotes(notes);
//
//        appointmentStatusRepository.save(appointmentStatus);
//    }

    public MedicalFishResquest createFishInfor(long appointmentId, MedicalFishResquest medicalFishRequests) {
        // Tìm Appointment theo ID
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        if (appointment == null) {
            throw new IllegalArgumentException("Không tìm thấy đơn hàng khám bệnh với ID: " + appointmentId);
        }

        // Lưu thông tin cho mỗi loại cá koi
        MedicalRecorded medicalRecorded = new MedicalRecorded();
            medicalRecorded.setAppointment(appointment); // Liên kết với đơn hàng (appointment)
            medicalRecorded.setName(medicalFishRequests.getName());
            medicalRecorded.setBreed(medicalFishRequests.getBreed());
            medicalRecorded.setAge(medicalFishRequests.getAge());
            medicalRecorded.setColor(medicalFishRequests.getColor());
            medicalRecorded.setWeight(medicalFishRequests.getWeight());
            medicalRecorded.setHealthStatus(medicalFishRequests.getHealthStatus());

            medicalRecordedRepository.save(medicalRecorded); // Lưu từng loại cá koi


        // Cập nhật lại danh sách MedicalRecorded cho Appointment
        appointment.setMedicalRecorded(medicalRecorded);
        appointmentRepository.save(appointment);

        return medicalFishRequests; // Trả về danh sách các MedicalFishResquest đã lưu
    }


    @Transactional
    public void uploadImage(final long id, final MultipartFile file) {
        System.out.println("Url Image: "+file);
        final Doctor doctor = doctorRepository.findDoctorById(id);
        if (doctor == null) {
            throw new NotFoundException("Không tìm thấy bác sĩ");
        }

        FileUpLoadUtil.assertAllowed(file, FileUpLoadUtil.IMAGE_PATTERN);
        final String fileName = FileUpLoadUtil.getFileName(file.getOriginalFilename());
        final CloudinaryResponse cloudinaryResponse = cloudinaryService.uploadFile(file, fileName);
        doctor.setImageUrl(cloudinaryResponse.getUrl());
        doctorRepository.save(doctor);
    }


}
