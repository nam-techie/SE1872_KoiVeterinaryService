package com.namtechie.org.service;


import com.namtechie.org.entity.*;
import com.namtechie.org.model.request.DoctorRequest;
import com.namtechie.org.model.request.MedicalFishResquest;
import com.namtechie.org.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DoctorService {
    @Autowired
    DoctorRepository doctorRepository;

    @Autowired
    AccountRepository accountRepository;
    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    AppointmentStatusRepository appointmentStatusRepository;

    @Autowired
    MedicalRecordedRepository medicalRecordedRepository;


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

    public List<MedicalFishResquest> createFishInfor(long appointmentId, List<MedicalFishResquest> medicalFishRequests) {
        // Tìm Appointment theo ID
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        if (appointment == null) {
            throw new IllegalArgumentException("Không tìm thấy đơn hàng khám bệnh với ID: " + appointmentId);
        }

        // Lưu thông tin cho mỗi loại cá koi
        List<MedicalRecorded> medicalRecordedList = new ArrayList<>();
        for (MedicalFishResquest medicalFishRequest : medicalFishRequests) {
            MedicalRecorded medicalRecorded = new MedicalRecorded();
            medicalRecorded.setAppointment(appointment); // Liên kết với đơn hàng (appointment)
            medicalRecorded.setName(medicalFishRequest.getName());
            medicalRecorded.setBreed(medicalFishRequest.getBreed());
            medicalRecorded.setAge(medicalFishRequest.getAge());
            medicalRecorded.setColor(medicalFishRequest.getColor());
            medicalRecorded.setWeight(medicalFishRequest.getWeight());
            medicalRecorded.setHealthStatus(medicalFishRequest.getHealthStatus());

            medicalRecordedList.add(medicalRecorded);
            medicalRecordedRepository.save(medicalRecorded); // Lưu từng loại cá koi
        }

        // Cập nhật lại danh sách MedicalRecorded cho Appointment
        appointment.setMedicalRecorded(medicalRecordedList);
        appointmentRepository.save(appointment);

        return medicalFishRequests; // Trả về danh sách các MedicalFishResquest đã lưu
    }



}
