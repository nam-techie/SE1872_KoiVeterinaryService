package com.namtechie.org.service;


import com.namtechie.org.entity.*;
import com.namtechie.org.exception.DuplicateEntity;
import com.namtechie.org.exception.NotFoundException;
import com.namtechie.org.model.request.*;
import com.namtechie.org.model.response.*;
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

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
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
    FeedbackRepository feedbackRepository;

    @Autowired
    private CloudinaryService cloudinaryService;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private FeedbackService feedbackService;


    public Account getCurrentAccount() {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return accountRepository.findAccountById(account.getId());
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<DoctorResponse> getListAllDoctors() {
        List<DoctorResponse> doctorResponses = new ArrayList<>();
        List<Doctor> doctors = doctorRepository.findAll();

        for (Doctor d : doctors) {
            DoctorResponse doctorResponse = new DoctorResponse();
            double rateAverage = 0;
            int count = 0;

            List<Appointment> appointments = appointmentRepository.findByDoctorId(d.getId());
            for (Appointment appointment : appointments) {
                FeedBack feedBack = feedbackRepository.findByAppointment(appointment);
                if (feedBack != null && !feedBack.isDeleted()) {
                    rateAverage += feedBack.getRating();
                    count++;
                }
            }

            if (!appointments.isEmpty()) {
                rateAverage /= count;
            } else {
                rateAverage = 0;
            }

            doctorResponse.setDoctor(d);
            doctorResponse.setRateAverage(rateAverage);
            doctorResponses.add(doctorResponse);
        }
        return doctorResponses;
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
        return doctorRepository.findByAccountId(curruntAccount.getId());
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

    public DoctorInfoDetailResponse infoDetailDoctor(long doctorId) {
        DoctorInfoDetailResponse response = new DoctorInfoDetailResponse();
        DoctorInfoResponse doctorInfoResponse = getAllInfoDoctor(doctorId);
        List<DoctorFeedbackResponse> feedbackResponses = new ArrayList<>();

        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctorId);
        int count = 1;

        for (Appointment appointment : appointments) {
            FeedBack feedBack = feedbackRepository.findByAppointment(appointment);
            if (feedBack != null && !feedBack.isDeleted()) { // Kiểm tra isDeleted trực tiếp
                DoctorFeedbackResponse feedbackResponse = new DoctorFeedbackResponse();
                feedbackResponse.setId(count++); // Đặt id theo số thứ tự của feedback
                Customers customer = appointment.getCustomers();
                feedbackResponse.setUsername(customer.getFullName());
                feedbackResponse.setRating(feedBack.getRating());
                feedbackResponse.setCreatedDate(feedBack.getCreated_date());
                ServiceType serviceType = appointment.getServiceType();
                feedbackResponse.setServiceName(serviceType.getName());
                feedbackResponse.setComments(feedBack.getComment());

                feedbackResponses.add(feedbackResponse);
            }
        }

        response.setDoctorInfo(doctorInfoResponse);
        response.setFeedback(feedbackResponses);
        return response;
    }


    public void updateInfoDoctor(String phone, DoctorRequest doctorRequest) {
        try {
            System.out.println(doctorRequest);
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
            // Kiểm tra email đã tồn tại chưa
            if (accountRepository.existsByEmail(updateDoctor.getEmail())) {
                throw new DuplicateEntity("Email đã được sử dụng bởi cá nhân khác.");
            }

            // Tạo tài khoản mới
            VeterinaryRequest emailDoctor = new VeterinaryRequest();
            emailDoctor.setEmail(updateDoctor.getEmail());
            authenticationService.registerVeterinary(emailDoctor);

            // Lấy tài khoản vừa tạo
            Account account = accountRepository.findAccountByEmail(updateDoctor.getEmail());

            // Kiểm tra số điện thoại đã tồn tại chưa
            if (doctorRepository.existsByPhone(updateDoctor.getPhone())) {
                throw new DuplicateEntity("Số điện thoại đã được sử dụng bởi cá nhân khác.");
            }

            // Tạo đối tượng Doctor mới
            Doctor newDoctor = new Doctor();
            newDoctor.setFullName(updateDoctor.getFullName());
            newDoctor.setPhone(updateDoctor.getPhone());
            newDoctor.setExperience(updateDoctor.getExperience());
            newDoctor.setAccount(account);

            // Lưu đối tượng Doctor vào cơ sở dữ liệu để lấy doctor_id
            Doctor savedDoctor = doctorRepository.save(newDoctor);

            // Tạo đối tượng DoctorInfo mới và gán doctor_id
            DoctorInfo newDoctorInfo = new DoctorInfo();
            newDoctorInfo.setDescription(updateDoctor.getDescription());
            newDoctorInfo.setQualification(updateDoctor.getQualification());
            newDoctorInfo.setSpecialty(updateDoctor.getSpecialty());
            newDoctorInfo.setDoctor(savedDoctor); // Gán đối tượng Doctor vào DoctorInfo

            // Lưu đối tượng DoctorInfo vào cơ sở dữ liệu
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

    public void updateWorkingStatus(long id) {

        Appointment appointment = appointmentRepository.findAppointmentById(id);
        AppointmentStatus appointmentStatus = new AppointmentStatus();

        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Đang cung cấp dịch vụ");
        appointmentStatus.setNotes("Bác sĩ đang thực hiện");

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


    @Autowired
    AppointmentInfoRepository appointmentInfoRepository;

    @Autowired
    ServiceTypeRepository serviceTypeRepository;

    public List<AppointmentStatusResponse> getListAppointmentDoctor() {
        List<AppointmentStatusResponse> appointmentResponses = new ArrayList<>();
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Doctor doctor = doctorRepository.findByAccountId(account.getId());


        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctor.getId());

        for (Appointment appointment : appointments) {
            AppointmentStatusResponse appointmentStatusResponse = new AppointmentStatusResponse();
            appointmentStatusResponse.setAppointmentId(appointment.getId());

            AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(appointment.getId());

            // Tách Date và Time từ CreatedDate (Timestamp)
            Timestamp createdDate = appointmentInfo.getCreatedDate();
            appointmentStatusResponse.setAppointmentDate(new Date(createdDate.getTime())); // Chuyển Timestamp thành Date
            appointmentStatusResponse.setAppointmentTime(new Time(createdDate.getTime())); // Chuyển Timestamp thành Time


            ServiceType serviceType = serviceTypeRepository.findByAppointmentId(appointment.getId());
            appointmentStatusResponse.setServiceType(serviceType.getName());

            // Lấy tất cả các trạng thái của appointment
            List<AppointmentStatus> statuses = appointmentStatusRepository.findByAppointment(appointment);

            // Tìm trạng thái có createDate lớn nhất (mới nhất)
            AppointmentStatus latestStatus = null;
            for (AppointmentStatus status : statuses) {
                if (latestStatus == null || status.getCreate_date().toLocalDateTime().isAfter(latestStatus.getCreate_date().toLocalDateTime())) {
                    latestStatus = status;
                }
            }
            // Set trạng thái mới nhất vào AppointmentResponse
            if (latestStatus != null) {
                if (latestStatus.getStatus().equals("Chờ bác sĩ xác nhận")) {
                    appointmentStatusResponse.setAppointmentStatus(latestStatus.getStatus());
                } else if (latestStatus.getStatus().equals("Đã xác nhận") ||
                        latestStatus.getStatus().equals("Chờ thanh toán tiền dịch vụ")) {
                    appointmentStatusResponse.setAppointmentStatus("Đã xác nhận");
                } else if (latestStatus.getStatus().equals("Thanh toán tiền dịch vụ thành công")) {
                    appointmentStatusResponse.setAppointmentStatus(latestStatus.getStatus());
                } else if (latestStatus.getStatus().equals("Đang cung cấp dịch vụ")) {
                    appointmentStatusResponse.setAppointmentStatus(latestStatus.getStatus());
                } else if (latestStatus.getStatus().equals("Thực hiện xong dịch vụ") ||
                        latestStatus.getStatus().equals("Chờ thanh toán tổng tiền")) {
                    appointmentStatusResponse.setAppointmentStatus("Thực hiện xong dịch vụ");
                } else if (latestStatus.getStatus().equals("Hoàn thành")) {
                    appointmentStatusResponse.setAppointmentStatus(latestStatus.getStatus());
                } else if (latestStatus.getStatus().equals("Đã hủy lịch")) {
                    appointmentStatusResponse.setAppointmentStatus(latestStatus.getStatus());
                } else if (latestStatus.getStatus().equals("Đã đánh giá")) {
                    appointmentStatusResponse.setAppointmentStatus(latestStatus.getStatus());
                }

            }
            appointmentResponses.add(appointmentStatusResponse);
        }
        return appointmentResponses;
    }

    @Autowired
    ZoneRepository zoneRepository;

    public DoctorAppointmentResponse getAppoinmentDoctor(long appointmentId) {
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        DoctorAppointmentResponse doctorAppointmentResponse = new DoctorAppointmentResponse();
        doctorAppointmentResponse.setId(appointmentId);

        Customers customers = appointment.getCustomers();
        if (customers != null) {
            doctorAppointmentResponse.setFullNameCustomer(customers.getFullName());
        }

        List<AppointmentStatus> statuses = appointmentStatusRepository.findByAppointment(appointment);
        // Tìm trạng thái có createDate lớn nhất (mới nhất)
        AppointmentStatus latestStatus = null;
        for (AppointmentStatus status : statuses) {
            if (latestStatus == null || status.getCreate_date().toLocalDateTime().isAfter(latestStatus.getCreate_date().toLocalDateTime())) {
                latestStatus = status;
            }
        }
        if (latestStatus != null) {
            doctorAppointmentResponse.setAppointmentStatus(latestStatus.getStatus());
        }

        ServiceType infoService = serviceTypeRepository.findByAppointmentId(appointment.getId());
        if (infoService != null) {
            doctorAppointmentResponse.setNameService(infoService.getName());
        }

        AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(appointment.getId());
        if (appointmentInfo != null) {
            doctorAppointmentResponse.setAppointmentBookingTime(appointmentInfo.getAppointmentBookingTime());
            doctorAppointmentResponse.setAppointmentBookingDate(appointmentInfo.getAppointmentBookingDate());
        }

        Zone infoZone = zoneRepository.findByAppointmentId(appointment.getId());
        if (infoZone != null) {
            doctorAppointmentResponse.setNameZone(infoZone.getName());
        }

        doctorAppointmentResponse.setDescription(appointmentInfo.getDescriptions());
        doctorAppointmentResponse.setCreatedDate(appointmentInfo.getCreatedDate());
        doctorAppointmentResponse.setAddressDetails(appointmentInfo.getAddress());
        doctorAppointmentResponse.setPhoneNumber(customers.getPhone());

        if (appointment.isDoctorAssigned()) {
            doctorAppointmentResponse.setIsSelectDoctor("Khách hàng chọn bác sĩ");
        } else {
            doctorAppointmentResponse.setIsSelectDoctor("Phân bổ bởi trung tâm");

        }

        return doctorAppointmentResponse;
    }

    public List<DoctorWorkResponse> getDoctorWork() {
        List<DoctorWorkResponse> doctorWorkResponses = new ArrayList<>();
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Doctor doctor = doctorRepository.findByAccountId(account.getId());
        System.out.println(doctor.getId());

        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctor.getId());

        for (Appointment appointment : appointments) {
            DoctorWorkResponse doctorWorkResponse = new DoctorWorkResponse();
            doctorWorkResponse.setAppointmentId(appointment.getId());

            AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(appointment.getId());


            // Lấy thời gian và ngày đặt hẹn
            Time bookingTime = appointmentInfo.getAppointmentBookingTime();
            Date bookingDate = appointmentInfo.getAppointmentBookingDate();

            // Lấy loại dịch vụ
            ServiceType serviceType = serviceTypeRepository.findByAppointmentId(appointment.getId());
            doctorWorkResponse.setServiceType(serviceType.getName());

            // Xác định thời gian kết thúc dựa trên loại dịch vụ
            if (serviceType.getId() == 1 || serviceType.getId() == 3) {
                doctorWorkResponse.setAppointmentDate(bookingDate);
                doctorWorkResponse.setAppointmentTimeStart(bookingTime);

                // Thời gian kết thúc sau 1 tiếng
                Time endTime = new Time(bookingTime.getTime() + 3600000); // 1 giờ = 3600000 ms
                doctorWorkResponse.setAppointmentTimeEnd(endTime);

            } else if (serviceType.getId() == 2 || serviceType.getId() == 4) {
                doctorWorkResponse.setAppointmentDate(bookingDate);
                doctorWorkResponse.setAppointmentTimeStart(bookingTime);

                // Thời gian kết thúc sau 4 tiếng
                Time endTime = new Time(bookingTime.getTime() + 4 * 3600000); // 4 giờ = 4 * 3600000 ms
                doctorWorkResponse.setAppointmentTimeEnd(endTime);
            }

            // Lấy tất cả các trạng thái của cuộc hẹn
            List<AppointmentStatus> statuses = appointmentStatusRepository.findByAppointment(appointment);

            // Tìm trạng thái có createDate lớn nhất (mới nhất)
            AppointmentStatus latestStatus = null;
            for (AppointmentStatus status : statuses) {
                if (latestStatus == null || status.getCreate_date().toLocalDateTime().isAfter(latestStatus.getCreate_date().toLocalDateTime())) {
                    latestStatus = status;
                }
            }

            // Set trạng thái mới nhất vào DoctorWorkResponse
            if (latestStatus != null) {
                String status = latestStatus.getStatus();
                if (status.equals("Chờ bác sĩ xác nhận")) {
                    doctorWorkResponse.setAppointmentStatus(status);
                } else if (status.equals("Đã xác nhận") || status.equals("Chờ thanh toán tiền dịch vụ") || status.equals("Thanh toán tiền dịch vụ thành công")) {
                    doctorWorkResponse.setAppointmentStatus("Đã xác nhận");
                } else if (status.equals("Đang cung cấp dịch vụ")) {
                    doctorWorkResponse.setAppointmentStatus(status);
                } else if (status.equals("Thực hiện xong dịch vụ") || status.equals("Chờ thanh toán tổng tiền")) {
                    doctorWorkResponse.setAppointmentStatus("Thực hiện xong dịch vụ");
                } else if (status.equals("Hoàn thành") || status.equals("Đã hủy lịch")) {
                    doctorWorkResponse.setAppointmentStatus(status);
                }
            }

            doctorWorkResponses.add(doctorWorkResponse);
        }
        return doctorWorkResponses;
    }

    public CountAppointmentDoctorRequest countStatusTotal() {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Doctor doctor = doctorRepository.findByAccountId(account.getId());
        CountAppointmentDoctorRequest response = new CountAppointmentDoctorRequest();

        long countTotal = appointmentRepository.countTotalAppointmentsByDoctor(doctor.getId());
        long countCancel = appointmentRepository.countCancelledAppointmentsByDoctor(doctor.getId());

        long countDone = 0;
        long countWait = 0;

        List<Appointment> appointments = appointmentRepository.findByDoctorId(doctor.getId());
        for (Appointment appointment : appointments) {
            List<AppointmentStatus> statuses = appointmentStatusRepository.findByAppointment(appointment);

            // Tìm trạng thái có createDate lớn nhất (mới nhất)
            AppointmentStatus latestStatus = null;
            for (AppointmentStatus status : statuses) {
                if (latestStatus == null || status.getCreate_date().toLocalDateTime().isAfter(latestStatus.getCreate_date().toLocalDateTime())) {
                    latestStatus = status;
                }
            }
            if ("Thực hiện xong dịch vụ".equals(latestStatus.getStatus())) {
                countDone++;
            } else if ("Chờ bác sĩ xác nhận".equals(latestStatus.getStatus())) {
                countWait++;
            }
        }

        response.setTotalAppointments(countTotal);
        response.setCancelledAppointments(countCancel);
        response.setDoneAppointments(countDone);
        response.setWaitAppointments(countWait);

        return response;
    }


}
