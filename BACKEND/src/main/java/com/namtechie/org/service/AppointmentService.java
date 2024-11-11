package com.namtechie.org.service;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.exception.DoctorNotAvailableException;

import com.namtechie.org.exception.InvalidPhoneNumberException;
import com.namtechie.org.exception.NotFoundException;
import com.namtechie.org.model.*;
import com.namtechie.org.model.request.*;
import com.namtechie.org.model.response.*;
import com.namtechie.org.repository.AppointmentRepository;

import com.namtechie.org.entity.*;
import com.namtechie.org.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;

@Service
public class AppointmentService {


    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private ZoneRepository zoneRepository;


    @Autowired
    private AppointmentRepository appointmentRepository;


    @Autowired
    private AppointmentStatusRepository appointmentStatusRepository;

    @Autowired
    private DoctorRepository doctorRepository;


    @Autowired
    private CustomerRepository customersRepository;

    @Autowired
    ScheduleService scheduleService;


    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentDetailRepository paymentDetailRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private AccountRepository accountRepository;


    public List<Doctor> findAllDoctor() {
        return doctorRepository.findAll();
    }

    private static final Time NOON = Time.valueOf("12:00:00");

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> findAppointmentsByDoctorIdAndBookingDate(Long doctorId, Date bookingDate) {
        return appointmentRepository.findAppointmentsByDoctorIdAndBookingDateAndCancel(doctorId, bookingDate, false);
    }


    public Appointment findAppointmentByDoctorIdAndBookingDateAndBookingTime(Long doctorId, Date bookingDate, Time bookingTime) {
        return appointmentRepository.findAppointmentByDoctorIdAndBookingDateAndBookingTime(doctorId, bookingDate, bookingTime);
    }


    // Lấy lịch sáng chiều của 1 ngày
    public List<Appointment> findAllAppointmentOfSession(Long doctorId, Date appointmentBookingDate, boolean isMorning) {
        List<Appointment> appointmentList = findAppointmentsByDoctorIdAndBookingDate(doctorId, appointmentBookingDate);
        List<Appointment> newAppointmentList = new ArrayList<>();

        for (Appointment appointment : appointmentList) {
            Time appointmentTime = appointment.getAppointmentInfo().getAppointmentBookingTime();
            boolean isBeforeNoon = appointmentTime.before(NOON);
            if (isMorning && isBeforeNoon) {
                newAppointmentList.add(appointment);
            } else if (!isMorning && !isBeforeNoon) {
                newAppointmentList.add(appointment);
            }
        }
        return newAppointmentList;
    }

    // Lấy tất cả lich làm theo giờ của bác sĩ bao gồm cả lịch làm theo buổi
    public Appointment findAppointmentWithBookingTime(Long doctorId, Date appointmentBookingDate, Time appointmentBookingTime) {
        // Tìm cuộc hẹn chính xác theo thời gian
        Appointment appointment = findAppointmentByDoctorIdAndBookingDateAndBookingTime(doctorId, appointmentBookingDate, appointmentBookingTime);

        if (appointment != null) {
            return appointment;  // Trả về cuộc hẹn nếu tìm thấy
        }

        // Nếu không tìm thấy cuộc hẹn vào giờ đó, tìm cuộc hẹn của cả buổi (sáng hoặc chiều)
        boolean isMorning = appointmentBookingTime.before(NOON);  // Xác định ca (sáng hoặc chiều)
        Time sessionStartTime = isMorning ? Time.valueOf("07:00:00") : Time.valueOf("13:00:00");

        // Tìm lịch làm việc của cả buổi
        return findAppointmentByDoctorIdAndBookingDateAndBookingTime(doctorId, appointmentBookingDate, sessionStartTime);
    }


    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = new Appointment();
        try {
            Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            appointment.setCustomers(account.getCustomer());


            Customers customer = account.getCustomer();
//            if (appointmentRequest.getPhone() == null) {
//                throw new NotFoundException("Loi he thong");
//            }
//            customer.setPhone(appointmentRequest.getPhone()); // lưu số đth khách hàng

            if (appointmentRequest.getPhone() != null &&
                    !appointmentRequest.getPhone().matches("(0[3|5|7|8|9])+(\\d{8})")) {
                throw new InvalidPhoneNumberException("Số điện thoại không hợp lệ");
            }

            appointment.setPhone(appointmentRequest.getPhone());


            // Step 3: Tìm ServiceType từ serviceID trong AppointmentRequest
            ServiceType serviceType = serviceTypeRepository.findById(appointmentRequest.getServiceTypeId());
            appointment.setServiceType(serviceType);


            // Step 5: Tạo mới AppointmentDetail từ dữ liệu chi tiết
            AppointmentInfo appointmentInfo = new AppointmentInfo();
            appointmentInfo.setAppointment(appointment);
            appointmentInfo.setAddress(appointmentRequest.getAddress());
            customersRepository.save(customer);

            Zone zone = null;
            if (appointmentRequest.getZoneId() != 0) {
                zone = zoneRepository.findById(appointmentRequest.getZoneId());
            }

            Date date = Date.valueOf(appointmentRequest.getBookingDate());
            Time time = Time.valueOf(appointmentRequest.getBookingTime());

            LocalTime bookingTime = time.toLocalTime();


            Doctor doctor = null;
            if (appointmentRequest.getDoctorId() != 0) {
                doctor = doctorRepository.findDoctorById(appointmentRequest.getDoctorId());
                // **Kiểm tra xem bác sĩ có lịch vào thời gian đó hay không**
                Appointment existingAppointment = appointmentRepository.findAppointmentByDoctorIdAndBookingDateAndBookingTime(
                        doctor.getId(), date, time
                );

                // **Nếu đã có cuộc hẹn trong khung giờ đó, tìm bác sĩ khác hoặc thông báo lỗi**
                if (existingAppointment != null) {
                    throw new DoctorNotAvailableException("Khung giờ bác sĩ đã có lịch khám. Mời bạn chọn bác sĩ khác");
                }
            }

            //khám tại trung tam
            if (appointmentRequest.getServiceTypeId() == 3) {
                Zone centerZone = zoneRepository.findById(1);
                //khách hàng chọn bác sĩ
                if (doctor != null) {
                    appointment.setDoctorAssigned(true); // đánh dấu khách hàng có chọn bác sĩ
                    appointment.setDoctor(doctor);
                    appointmentInfo.setAppointmentBookingDate(date);
                    appointmentInfo.setAppointmentBookingTime(time);
                    appointment.setZone(centerZone);


                } else { //khách hàng ko chọn bác sĩ
                    appointmentInfo.setAppointmentBookingDate(date);
                    ScheduleForConsulting doctor1 = findAvailableDoctor(appointmentRequest.getBookingDate(), appointmentRequest.getBookingTime());
                    appointmentInfo.setAppointmentBookingTime(time);
                    appointment.setDoctorAssigned(false);
                    appointment.setDoctor(doctor1.getDoctor());
                    appointment.setZone(centerZone);

                }

            } else if (appointmentRequest.getServiceTypeId() == 2 || appointmentRequest.getServiceTypeId() == 4) { // khám tại nhà
                if (doctor == null) {
                    doctor = findAvailableDoctorForSession(String.valueOf(appointmentRequest.getBookingDate()), String.valueOf(appointmentRequest.getBookingTime()));
                    appointment.setDoctorAssigned(false);
                    appointment.setDoctor(doctor);
                    appointmentInfo.setAppointmentBookingDate(date);
                    appointmentInfo.setAppointmentBookingTime(time);
                    appointment.setZone(zone);
                }
            } else if (appointmentRequest.getServiceTypeId() == 1) { // dịch vụ tư vấn
                if (doctor == null) {
                    LocalDate bookingDate = date.toLocalDate();
                    DayOfWeek dayOfWeek = bookingDate.getDayOfWeek();
                    if (dayOfWeek == DayOfWeek.SATURDAY || dayOfWeek == DayOfWeek.SUNDAY) {
                        throw new DoctorNotAvailableException("Dịch vụ tư vấn chỉ hoạt động từ thứ Hai đến thứ Sáu.");
                    }
// Kiểm tra giờ làm việc

                    if ((bookingTime.isAfter(LocalTime.of(11, 0)) && bookingTime.isBefore(LocalTime.of(13, 0))) ||
                            (bookingTime.isAfter(LocalTime.of(17, 0)) || bookingTime.isBefore(LocalTime.of(7, 0)))) {
                        throw new NullPointerException("Đã hết giờ làm việc của bác sĩ");
                    }
                    Time timeLocate = Time.valueOf(appointmentRequest.getBookingTime());
                    System.out.println("das" + timeLocate);
                    appointmentInfo.setAppointmentBookingDate(date);
                    ScheduleForConsulting doctor1 = findAvailableDoctor(appointmentRequest.getBookingDate(), String.valueOf(timeLocate));
                    appointmentInfo.setAppointmentBookingTime(doctor1.getBookingTime());
                    appointment.setDoctorAssigned(false);
                    appointment.setDoctor(doctor1.getDoctor());
                    appointment.setZone(zoneRepository.findById(15));
                }
            }


            appointmentInfo.setDescriptions(appointmentRequest.getDescription());
            appointment.setAppointmentInfo(appointmentInfo);


            List<AppointmentStatus> list = new ArrayList<>();
            AppointmentStatus appointmentStatus = new AppointmentStatus();
            appointmentStatus.setAppointment(appointment);
            if (appointmentRequest.getServiceTypeId() == 1) {
                appointmentStatus.setStatus("Đã xác nhận");
            } else {
                appointmentStatus.setStatus("Chờ bác sĩ xác nhận");
            }
            appointmentStatus.setNotes("");
            list.add(appointmentStatus);


            appointment.setAppointmentStatus(list);
            appointmentRepository.save(appointment);
            // Step 6: Lưu Appointment vào cơ sở dữ liệu
            return appointment;
        } catch (DoctorNotAvailableException e) {
            throw new DoctorNotAvailableException(e.getMessage());
        } catch (NullPointerException e) {
            throw new NullPointerException("Lỗi hệ thống");
        } catch (InvalidPhoneNumberException e) {
            throw new InvalidPhoneNumberException(e.getMessage());
        } catch (Exception e) {
            throw new RuntimeException("Không thể đặt dịch vụ");
        }
    }


    public ScheduleForConsulting findAvailableDoctor(String bookingDate, String bookingTime) {
        try {
            ScheduleForConsulting scheduleForConsulting = new ScheduleForConsulting();


            // Chuyển đổi bookingDate từ chuỗi sang kiểu Date
            Date bookingDateSQL = Date.valueOf(bookingDate);

            // Tạo danh sách lưu các bác sĩ có lịch rảnh trùng với thời gian đặt
            List<Long> availableDoctorIds = new ArrayList<>();

            // Bước 1: Tìm tất cả các bác sĩ có lịch trống trùng với thời gian đặt
            List<Doctor> doctors = doctorRepository.findAll(); // Lấy tất cả bác sĩ
            for (Doctor doctor : doctors) {
                // Lấy danh sách lịch trống của bác sĩ
                Map<String, List<Schedule>> freeSchedules = scheduleService.findFreeScheduleByDoctorId(doctor.getId(), true);

                // Kiểm tra xem lịch trống cho ngày đó có tồn tại không
                if (freeSchedules == null || freeSchedules.get(bookingDate) == null) {
                    continue; // Nếu không có lịch trống, tiếp tục với bác sĩ tiếp theo
                }

                List<Schedule> schedulesForDay = freeSchedules.get(bookingDate);
                System.out.println("123" + schedulesForDay);

                LocalTime bookingLocalTime = LocalTime.parse(bookingTime);
                // Kiểm tra lịch trống trong ngày xem có trùng với thời gian đặt không
                for (Schedule schedule : schedulesForDay) {
                    System.out.println("Schedule start time: " + schedule.getStartTime());

                    LocalTime startTime = schedule.getStartTime().toLocalTime();
                    LocalTime halfHourMark = startTime.plusMinutes(30);
                    int hourTime = startTime.getHour();


                    if (schedule.isAvailable()) {
                        if (bookingLocalTime.isBefore(halfHourMark) && schedule.getStartTime().equals(Time.valueOf(hourTime + ":00:00"))) {
                            System.out.println("Adding doctor (before half-hour mark): " + doctor.getId());
                            availableDoctorIds.add(doctor.getId());
                            scheduleForConsulting.setBookingTime(Time.valueOf(hourTime + ":00:00"));
                            break;
                        } else if (bookingLocalTime.isAfter(halfHourMark) && schedule.getStartTime().equals(Time.valueOf(hourTime + 1 + ":00:00"))) {
                            System.out.println("Adding doctor (after half-hour mark): " + doctor.getId());
                            availableDoctorIds.add(doctor.getId());
                            scheduleForConsulting.setBookingTime(Time.valueOf(hourTime + 1 + ":00:00"));
                            break;
                        }
                    }
                }
            }

            // Bước 2: Gọi appointmentRepository.findDoctorAppointmentCounts() để lấy số lượng lịch hẹn của từng bác sĩ
            List<Object[]> doctorAppointmentCounts = appointmentRepository.findDoctorAppointmentCounts();

            // Bước 3: Tìm bác sĩ trong danh sách availableDoctorIds có ít lịch hẹn nhất
            Long selectedDoctorId = findDoctorWithFewestAppointments(availableDoctorIds, doctorAppointmentCounts);

            // Nếu tìm thấy bác sĩ phù hợp, trả về bác sĩ đó
            if (selectedDoctorId != null) {
                System.out.println("Tìm thấy bác sĩ ID: " + selectedDoctorId + " có lịch rảnh và ít lịch hẹn nhất.");
                scheduleForConsulting.setDoctor(doctorRepository.findDoctorById(selectedDoctorId));
            }
            return scheduleForConsulting;

        } catch (Exception e) {
            // Nếu không tìm thấy bác sĩ nào rảnh cho buổi này
            throw new DoctorNotAvailableException("Không tìm thấy bác sĩ rảnh cho khung giờ này.");
        }
    }


    /**
     * Hàm bổ trợ để chọn bác sĩ có ít lịch hẹn nhất từ danh sách bác sĩ rảnh.
     */
    private Long findDoctorWithFewestAppointments(List<Long> availableDoctorIds, List<Object[]> doctorAppointmentCounts) {
        Long selectedDoctorId = null;
        Long fewestAppointments = Long.MAX_VALUE;
        List<Long> doctorsWithFewestAppointments = new ArrayList<>();

        // Bước 1: Tìm bác sĩ có số lượng lịch hẹn ít nhất
        for (Object[] doctorCount : doctorAppointmentCounts) {
            Long doctorId = (Long) doctorCount[0];
            Long appointmentCount = (Long) doctorCount[1];

            if (availableDoctorIds.contains(doctorId)) {
                if (appointmentCount < fewestAppointments) {
                    fewestAppointments = appointmentCount;
                    doctorsWithFewestAppointments.clear();
                    doctorsWithFewestAppointments.add(doctorId);
                } else if (appointmentCount.equals(fewestAppointments)) {
                    doctorsWithFewestAppointments.add(doctorId);
                }
            }
        }

        // Bước 2: Chọn ngẫu nhiên một bác sĩ trong số các bác sĩ có ít lịch hẹn nhất
        if (!doctorsWithFewestAppointments.isEmpty()) {
            Collections.shuffle(doctorsWithFewestAppointments); // Xáo trộn danh sách
            selectedDoctorId = doctorsWithFewestAppointments.get(0); // Chọn ngẫu nhiên một bác sĩ
        }

        return selectedDoctorId;  // Trả về bác sĩ có ít lịch đặt nhất
    }


//    private Long getRandomDoctorId(List<Long> doctorIds) {
//        if (doctorIds == null || doctorIds.isEmpty()) {
//            return null; // Trả về null nếu danh sách rỗng
//        }
//        Collections.shuffle(doctorIds); // Xáo trộn danh sách
//        return doctorIds.get(0); // Lấy doctorId ngẫu nhiên từ danh sách đã xáo trộn
//    }


    public Doctor findAvailableDoctorForSession(String bookingDate, String bookingTime) {
        try {
// Chuyển đổi bookingDate từ chuỗi sang LocalDate
            LocalDate bookingLocalDate = LocalDate.parse(bookingDate);

            boolean isMorningSession = bookingTime.equals("07:00:00");
            boolean isAfternoonSession = bookingTime.equals("13:00:00");

            // Kiểm tra thời gian buổi hợp lệ
            if (!isMorningSession && !isAfternoonSession) {
                throw new IllegalArgumentException("Invalid booking time, must be 07:00:00 or 13:00:00.");
            }

            // Bước 1: Tìm tất cả các bác sĩ có khung giờ rảnh vào buổi sáng hoặc buổi chiều.
            List<Long> availableDoctorIds = new ArrayList<>();
            List<Doctor> doctors = doctorRepository.findAll();

            for (Doctor doctor : doctors) {
                // Lấy lịch trống của bác sĩ đó
                Map<String, List<Schedule>> freeSchedules = scheduleService.findFreeScheduleByDoctorId(doctor.getId(), false);

                // Kiểm tra xem lịch trống cho ngày đó có tồn tại không
                List<Schedule> schedulesForDay = freeSchedules.get(String.valueOf(bookingLocalDate));

                if (schedulesForDay == null || schedulesForDay.isEmpty()) {
                    // Nếu không có lịch trống, tiếp tục với bác sĩ tiếp theo
                    continue;
                }

                // Kiểm tra lịch trống của cả buổi sáng hoặc buổi chiều
                boolean isSessionFree = true;
                if (isMorningSession) {
                    // Kiểm tra buổi sáng (từ 07:00 đến 11:00)
                    for (int hour = 7; hour < 11; hour++) {
                        Time startTime = Time.valueOf(hour + ":00:00");
                        boolean isSlotFree = schedulesForDay.stream()
                                .anyMatch(schedule -> schedule.getStartTime().equals(startTime) && schedule.isAvailable());

                        if (!isSlotFree) {
                            isSessionFree = false;  // Nếu bất kỳ slot nào trong buổi sáng không trống, đánh dấu buổi sáng là bận
                            break;
                        }
                    }
                } else if (isAfternoonSession) {
                    // Kiểm tra buổi chiều (từ 13:00 đến 17:00)
                    for (int hour = 13; hour < 17; hour++) {
                        Time startTime = Time.valueOf(hour + ":00:00");
                        boolean isSlotFree = schedulesForDay.stream()
                                .anyMatch(schedule -> schedule.getStartTime().equals(startTime) && schedule.isAvailable());

                        if (!isSlotFree) {
                            isSessionFree = false;  // Nếu bất kỳ slot nào trong buổi chiều không trống, đánh dấu buổi chiều là bận
                            break;
                        }
                    }
                }

                // Nếu cả buổi sáng hoặc buổi chiều trống, thêm bác sĩ vào danh sách availableDoctorIds
                if (isSessionFree) {
                    availableDoctorIds.add(doctor.getId());
                }
            }

            // Bước 2: Gọi appointmentRepository.findDoctorAppointmentCounts() để lấy số lượng lịch hẹn của từng bác sĩ
            List<Object[]> doctorAppointmentCounts = appointmentRepository.findDoctorAppointmentCounts();

            // Bước 3: Tìm bác sĩ trong danh sách availableDoctorIds có ít lịch hẹn nhất
            Long selectedDoctorId = findDoctorWithFewestAppointments(availableDoctorIds, doctorAppointmentCounts);

            // Nếu tìm thấy bác sĩ phù hợp, trả về bác sĩ đó
            if (selectedDoctorId != null) {
                System.out.println("Tìm thấy bác sĩ ID: " + selectedDoctorId + " có lịch rảnh và ít lịch hẹn nhất.");

                return doctorRepository.findDoctorById(selectedDoctorId);
            }
        } catch (Exception e) {
            // Nếu không tìm thấy bác sĩ nào phù hợp
            throw new DoctorNotAvailableException("Không tìm thấy bác sĩ rảnh cho khung giờ này.");
        }
        return null;
    }


    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }


    public List<Appointment> findAppointmentByAccountId(long accountId) {

        Doctor doctor = doctorRepository.findByAccountId(accountId);

        List<Appointment> list = appointmentRepository.findAppointmentByDoctorId(doctor.getId());

        return list;
    }

    //    public long getAppointmentIdForUser(long accountId) {
//        long  customerId = customersRepository.findCustomersIdByAccountId(accountId);
//
//        List<Appointment> list = appointmentRepository.findAppointmentByCustomersId(customerId);
//
//        for(Appointment appointment : list) {
//            List<AppointmentStatus> appointmentStatus = appointment.getAppointmentStatus();
//            for(AppointmentStatus status : appointmentStatus) {
//
//                if(status.getStatus().equals("Waiting veterian confirm")){
//                    return appointment.getId();
//                }
//            }
//        }
//        return 0;
//    }
//
//
//
//
//    public long findAppointmentIdStep(long accountId) {
//        Doctor doctor = doctorRepository.findByAccountId(accountId);
//
//        List<Appointment> list = appointmentRepository.findAppointmentByDoctorId(doctor.getId());
//
//        for(Appointment appointment : list) {
//            List<AppointmentStatus> appointmentStatus = appointment.getAppointmentStatus();
//            for(AppointmentStatus status : appointmentStatus) {
//                if(status.getStatus().equals("Waiting veterian confirm")){
//                    return appointment.getId();
//                }
//            }
//        }
//        return 0;
//    }
//
//
//
//
    public long findAppointmentIdStep(long accountId) {
        Doctor doctor = doctorRepository.findByAccountId(accountId);

        List<Appointment> list = appointmentRepository.findAppointmentByDoctorId(doctor.getId());

        for (Appointment appointment : list) {
            List<AppointmentStatus> appointmentStatus = appointment.getAppointmentStatus();
            for (AppointmentStatus status : appointmentStatus) {
                if (status.getStatus().equals("Chờ bác sĩ xác nhận")) {
                    return appointment.getId();
                }
            }
        }
        return 0;
    }

    @Autowired
    PaymentService paymentService;

    @Autowired
    EmailService emailService;

    public AppointmentStatus confirmDoctorAppointment(long appointmentId) {
        try {
            Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);




            AppointmentStatus status = new AppointmentStatus();
            status.setAppointment(appointment);
            status.setNotes("Bác sĩ chấp nhận");
            status.setStatus("Đã xác nhận");


            ServiceType serviceType = appointment.getServiceType();
            if (serviceType == null) {
                throw new IllegalArgumentException("Không tìm thấy loại dịch vụ cho cuộc hẹn với ID: " + appointmentId);
            }


            // Lấy giá tiền đặt cọc từ loại dịch vụ
            long depositPrice = serviceType.getBase_price();
            PaymentDepositResponse paymentDepositResponse = new PaymentDepositResponse();
            paymentDepositResponse.setAppointmentId(appointmentId);
            paymentDepositResponse.setDepositPrice(depositPrice);


            // Gửi email thông báo đăng kí thành công
            EmailDetail emailDetail = new EmailDetail();
            Customers customers = appointment.getCustomers();
            Account account = customers.getAccount();
            emailDetail.setReceiver(account);
            emailDetail.setSubject("Welcome to KoiKung Center!");
            emailDetail.setLink("https://se-1872-koi-veterinary-service.vercel.app/customer/manage-appointment");
            emailService.sendAppointmentConfirmationEmail(emailDetail);


            // Nếu chưa có, tạo bản ghi mới
            Payment paymentTotal = new Payment();
            paymentTotal.setAppointment(appointment);
            paymentTotal.setTotalFee(serviceType.getBase_price());
            paymentRepository.save(paymentTotal);  // Lưu Payment mới


            paymentService.generateTransactionRecords(appointmentId, paymentTotal, depositPrice, serviceType.getName());


            return appointmentStatusRepository.save(status);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }


    public void cancelAppointmentByCustomer(CancelRequest cancelRequest) {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Appointment appointment = appointmentRepository.findAppointmentById(cancelRequest.getAppointmentId());
        appointment.setCancel(true);
        appointmentRepository.save(appointment);

        AppointmentStatus status = new AppointmentStatus();
        status.setAppointment(appointment);
        status.setStatus("Đã hủy lịch");
        status.setNotes(cancelRequest.getNotes());
        appointmentStatusRepository.save(status);
    }

    public void cancelAppointmentByDoctor(boolean status, CancelReasonRequest cancelReasonRequest) {
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Doctor doctor = doctorRepository.findByAccountId(account.getId());
        Appointment appointment = appointmentRepository.findAppointmentById(cancelReasonRequest.getAppointmentId());
        appointment.setCancel(status);
        appointmentRepository.save(appointment);

        AppointmentStatus appointmentStatus = new AppointmentStatus();
        appointmentStatus.setAppointment(appointment);
        appointmentStatus.setStatus("Đã hủy lịch");
        appointmentStatus.setNotes("Bác sĩ " + doctor.getFullName() + " hủy vì lí do: " + cancelReasonRequest.getCancelReason());
        appointmentStatusRepository.save(appointmentStatus);
    }

    @Autowired
    private AppointmentInfoRepository appointmentInfoRepository;


    public List<AppointmentResponse> getListAppoint() {
        List<AppointmentResponse> appointmentResponses = new ArrayList<>();

        List<Appointment> appointments = appointmentRepository.findAll();

        for (Appointment appointment : appointments) {
            AppointmentResponse appointmentResponse = new AppointmentResponse();
            appointmentResponse.setId(appointment.getId());

            // Lấy thông tin khách hàng
            Customers infoCus = appointment.getCustomers();

            if (infoCus != null) {
                appointmentResponse.setFullNameCustomer(infoCus.getFullName());
            }

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
                appointmentResponse.setAppointmentStatus(latestStatus.getStatus());
            }

            // Lấy thông tin loại dịch vụ
            ServiceType infoService = serviceTypeRepository.findByAppointmentId(appointment.getId());
            if (infoService != null) {
                appointmentResponse.setNameService(infoService.getName());
            }

            // Lấy thông tin thời gian đặt hẹn
            AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(appointment.getId());
            if (appointmentInfo != null) {
                appointmentResponse.setAppointmentBookingTime(appointmentInfo.getAppointmentBookingTime());
                appointmentResponse.setAppointmentBookingDate(appointmentInfo.getAppointmentBookingDate());
            }

            // Lấy thông tin khu vực
            Zone infoZone = zoneRepository.findByAppointmentId(appointment.getId());
            if (infoZone != null) {
                appointmentResponse.setNameZone(infoZone.getName());
            }

            // Thêm vào danh sách kết quả
            appointmentResponses.add(appointmentResponse);
        }

        // Đảo ngược danh sách appointmentResponses
        Collections.reverse(appointmentResponses);

        return appointmentResponses;
    }

    public List<AppointmentStatusResponse> getListAppointmentCustomer() {
        List<AppointmentStatusResponse> appointmentResponses = new ArrayList<>();
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Customers customerId = customersRepository.findByAccountId(account.getId());

        List<Appointment> appointments = appointmentRepository.findByCustomersId(customerId.getId());

        for (Appointment appointment : appointments) {
            AppointmentStatusResponse appointmentStatusResponse = new AppointmentStatusResponse();
            appointmentStatusResponse.setAppointmentId(appointment.getId());

            AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(appointment.getId());

            // Tách Date và Time từ CreatedDate (Timestamp)
            appointmentStatusResponse.setAppointmentDate(new Date(appointmentInfo.getCreatedDate().getTime()));
            appointmentStatusResponse.setAppointmentTime(new Time(appointmentInfo.getCreatedDate().getTime()));


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
                appointmentStatusResponse.setAppointmentStatus(latestStatus.getStatus());
            }
            appointmentResponses.add(appointmentStatusResponse);
        }
        // Đảo ngược danh sách appointmentResponses
        Collections.reverse(appointmentResponses);
        return appointmentResponses;
    }


    public AppointmentResponse getAppointmentDetail(long appointmentId) {
//        List<AppointmentResponse> appointmentResponses = new ArrayList<>();

//        List<Appointment> appointments = appointmentRepository.findAll();
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);

        Payment payment = paymentRepository.findByAppointmentId(appointmentId);
//        for (Appointment appointment : appointments) {
        AppointmentResponse appointmentResponse = new AppointmentResponse();
        appointmentResponse.setId(appointment.getId());

        Doctor doctor = appointment.getDoctor();
        if (doctor != null) {
            appointmentResponse.setFullNameDoctor(doctor.getFullName());
        }


        // Lấy thông tin khách hàng
        Customers infoCus = appointment.getCustomers();

        if (infoCus != null) {
            appointmentResponse.setFullNameCustomer(infoCus.getFullName());
        }

        // Lấy tất cả các trạng thái của appointment
        List<AppointmentStatus> statuses = appointmentStatusRepository.findByAppointment(appointment);

        // Tìm trạng thái có createDate lớn nhất (mới nhất)
        AppointmentStatus latestStatus = null;
        for (AppointmentStatus status : statuses) {
            if (latestStatus == null || status.getCreate_date().toLocalDateTime().isAfter(latestStatus.getCreate_date().toLocalDateTime())) {
                latestStatus = status;
            }
        }


        long totalPrice = 0;

        if (latestStatus.getStatus().equals("Chờ thanh toán tiền dịch vụ")) {
            PaymentDetail paymentDetails = paymentDetailRepository.findByPaymentIdAndStatus(payment.getId(), false);
            List<ServiceDetailResponse> serviceDetailResponses = new ArrayList<>();

            serviceDetailResponses.add(new ServiceDetailResponse(paymentDetails.getNotes(), paymentDetails.getPrice()));
            System.out.println(serviceDetailResponses);
            appointmentResponse.setTotalPrice(payment.getTotalFee());
            appointmentResponse.setServiceDetails(serviceDetailResponses);


        } else if (latestStatus.getStatus().equals("Chờ thanh toán tổng tiền")) {

            // Lấy danh sách PaymentDetail có paymentId và status = false
            List<PaymentDetail> paymentDetails = paymentDetailRepository.findListByPaymentIdAndStatus(payment.getId(), false);
            List<ServiceDetailResponse> paymentInfoList = new ArrayList<>(); // Tạo danh sách để lưu các PaymentInfo

            for (PaymentDetail paymentDetail : paymentDetails) {
                totalPrice += paymentDetail.getPrice(); // Tính tổng giá tiền
                // Thêm đối tượng PaymentInfo vào danh sách
                paymentInfoList.add(new ServiceDetailResponse(paymentDetail.getNotes(), paymentDetail.getPrice()));
            }

            // Set giá trị tổng tiền và danh sách PaymentInfo vào response
            appointmentResponse.setTotalPrice(totalPrice);
            appointmentResponse.setServiceDetails(paymentInfoList); // Nếu bạn có phương thức setPaymentInfoList trong AppointmentResponse
        } else if (latestStatus.getStatus().equals("Hoàn thành")) {
            List<PaymentDetail> paymentDetails = paymentDetailRepository.findListByPaymentIdAndStatus(payment.getId(), true);
            List<ServiceDetailResponse> paymentInfoList = new ArrayList<>(); // Tạo danh sách để lưu các PaymentInfo

            for (PaymentDetail paymentDetail : paymentDetails) {
                totalPrice += paymentDetail.getPrice(); // Tính tổng giá tiền
                // Thêm đối tượng PaymentInfo vào danh sách
                paymentInfoList.add(new ServiceDetailResponse(paymentDetail.getNotes(), paymentDetail.getPrice()));
            }

            // Set giá trị tổng tiền và danh sách PaymentInfo vào response
            appointmentResponse.setTotalPrice(totalPrice);
            appointmentResponse.setServiceDetails(paymentInfoList);
        }


        // Set trạng thái mới nhất vào AppointmentResponse
        if (latestStatus != null) {
            appointmentResponse.setAppointmentStatus(latestStatus.getStatus());
        }


        // Lấy thông tin loại dịch vụ
        ServiceType infoService = serviceTypeRepository.findByAppointmentId(appointment.getId());
        if (infoService != null) {
            appointmentResponse.setNameService(infoService.getName());
        }

        // Lấy thông tin thời gian đặt hẹn
        AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(appointment.getId());
        if (appointmentInfo != null) {
            appointmentResponse.setAppointmentBookingTime(appointmentInfo.getAppointmentBookingTime());
            appointmentResponse.setAppointmentBookingDate(appointmentInfo.getAppointmentBookingDate());
        }

        // Lấy thông tin khu vực
        Zone infoZone = zoneRepository.findByAppointmentId(appointment.getId());
        if (infoZone != null) {
            appointmentResponse.setNameZone(infoZone.getName());
        }

        // miêu tả vấn đề
        appointmentResponse.setDescription(appointmentInfo.getDescriptions());


        //ngày, thời gian đặt
        appointmentResponse.setCreatedDate(appointmentInfo.getCreatedDate());


        // lấy thông tin địa chỉ chi tiết
        appointmentResponse.setAddressDetails(appointmentInfo.getAddress());

        // Thêm vào danh sách kết quả
        appointmentResponse.setPhoneNumber(infoCus.getPhone());


        return appointmentResponse;
    }

    public AppointmentStatus getNewStatus(Appointment appointment) {
        // Lấy tất cả các trạng thái của appointment
        List<AppointmentStatus> statuses = appointmentStatusRepository.findByAppointment(appointment);

        // Tìm trạng thái có createDate lớn nhất (mới nhất)
        AppointmentStatus latestStatus = null;
        for (AppointmentStatus status : statuses) {
            if (latestStatus == null || status.getCreate_date().toLocalDateTime().isAfter(latestStatus.getCreate_date().toLocalDateTime())) {
                latestStatus = status;
            }
        }
        if (latestStatus != null &&
                (latestStatus.getStatus().equals("Đã xác nhận") ||
                        (latestStatus.getStatus().equals("Chờ thanh toán tiền dịch vụ")))) {

            LocalDateTime createDatePlusOneMinutes = latestStatus.getCreate_date().toLocalDateTime().plusMinutes(15);
            LocalDateTime currentDateTime = LocalDateTime.now();

            // So sánh thời gian hiện tại với createDate + 15p
            if (currentDateTime.isAfter(createDatePlusOneMinutes)) {
                // Tạo và lưu trạng thái mới "Đã hủy lịch"
                AppointmentStatus status = new AppointmentStatus();
                status.setAppointment(appointment);
                status.setStatus("Đã hủy lịch");
                status.setNotes("Lịch đặt bị hủy vì quá thời hạn thanh toán tiền cho trung tâm!");
                appointmentStatusRepository.save(status);

                appointment.setCancel(true);
                appointmentRepository.save(appointment);
            }
        } else if (latestStatus != null &&
                (latestStatus.getStatus().equals("Chờ bác sĩ xác nhận"))) {
            LocalDateTime createDatePlusOneMinutes = latestStatus.getCreate_date().toLocalDateTime().plusHours(12);
            LocalDateTime currentDateTime = LocalDateTime.now();

            // So sánh thời gian hiện tại với createDate + 12 hours
            if (currentDateTime.isAfter(createDatePlusOneMinutes)) {
                // Tạo và lưu trạng thái mới "Đã hủy lịch"
                AppointmentStatus status = new AppointmentStatus();
                status.setAppointment(appointment);
                status.setStatus("Đã hủy lịch");
                status.setNotes("Lịch đặt bị hủy vì bác sĩ xác nhận quá thời gian cho phép!");
                appointmentStatusRepository.save(status);
                appointment.setCancel(true);
                appointmentRepository.save(appointment);

            }

        }
        return latestStatus;
    }


    public InfoResponse getFullInfoAppointment(long appointmentId) {
        InfoResponse infoResponse = new InfoResponse();

        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);

        AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(appointmentId);
        // Set Info appointmentId
        infoResponse.setAppointmentId(appointmentId);

        // Set Info Customer Response
        InfoCusResponse infoCusResponse = new InfoCusResponse();
        Customers infoCus = appointment.getCustomers();
        if (infoCus != null) {
            infoCusResponse.setFullName(infoCus.getFullName());
            infoCusResponse.setAddress(appointmentInfo.getAddress());
            infoCusResponse.setPhone(appointment.getPhone());
        } else {
            infoCusResponse.setFullName(null);
        }

        infoResponse.setInfoCusResponse(infoCusResponse);

        // Set Info Koi Response
        InfoKoiResponse infoKoiResponse = new InfoKoiResponse();
        MedicalRecorded infoKoi = appointment.getMedicalRecorded();
        if (infoKoi != null) {
            infoKoiResponse.setName(infoKoi.getName());
            infoKoiResponse.setBreed(infoKoi.getBreed());
            infoKoiResponse.setAge(infoKoi.getAge());
            infoKoiResponse.setColor(infoKoi.getColor());
            infoKoiResponse.setWeight(infoKoi.getWeight());
            infoKoiResponse.setHealthStatus(infoKoi.getHealthStatus());
        } else {
            infoKoiResponse.setName(null);
        }

        infoResponse.setInfoKoiResponse(infoKoiResponse);

        // Set Info Appointment Response
        InfoAppointmentResponse infoAppointmentResponse = new InfoAppointmentResponse();
        if (appointmentInfo != null) {
            infoAppointmentResponse.setAppointmentTime(appointmentInfo.getCreatedDate());
            infoAppointmentResponse.setAppointmentDate(appointmentInfo.getAppointmentBookingDate());

            ServiceType serviceType = serviceTypeRepository.findByAppointmentId(appointmentId);
            infoAppointmentResponse.setServiceType(serviceType.getName());
            infoAppointmentResponse.setTime(appointmentInfo.getAppointmentBookingTime());
            infoAppointmentResponse.setAddress(appointmentInfo.getAddress());

            // Lấy tất cả các trạng thái của appointment
            AppointmentStatus latestStatus = getNewStatus(appointment);
            if (latestStatus.getStatus().equals("Đã hủy lịch")) {
                infoResponse.setCancelNotes(latestStatus.getNotes());
            } else {
                infoResponse.setCancelNotes(null);
            }

            // Set Info Status
            infoResponse.setStatus(latestStatus.getStatus());

            Doctor doctor = appointment.getDoctor();

            infoAppointmentResponse.setStatus(latestStatus.getStatus());
            infoAppointmentResponse.setDoctorName(doctor.getFullName());
            infoAppointmentResponse.setDoctorAssigned(appointment.isDoctorAssigned());
        } else {
            infoAppointmentResponse.setStatus(null);
        }

        infoResponse.setInfoAppointmentResponse(infoAppointmentResponse);

        List<InfoServiceTypeResponse> infoServiceTypeResponses = new ArrayList<>();
        Payment payment = paymentRepository.findByAppointmentId(appointmentId);
        if (payment != null) {
            List<PaymentDetail> paymentDetail = paymentDetailRepository.findByPaymentId(payment.getId());
            long serviceId = 0;
            long donePayment = 0;
            long notDonePayment = 0;
            long totalPayment = payment.getTotalFee();

            for (PaymentDetail detail : paymentDetail) {
                InfoServiceTypeResponse infoServiceTypeResponse = new InfoServiceTypeResponse();

                infoServiceTypeResponse.setServiceTypeId(serviceId);
                infoServiceTypeResponse.setServiceTypeName(detail.getNotes());
                infoServiceTypeResponse.setServiceTypePrice(detail.getPrice());
                infoServiceTypeResponse.setStatusPayment(detail.isStatus());

                // Cộng dồn donePayment hoặc notDonePayment dựa trên statusPayment
                if (!detail.isStatus()) {
                    notDonePayment += detail.getPrice();
                } else {
                    donePayment += detail.getPrice();
                }

                serviceId++;
                infoServiceTypeResponses.add(infoServiceTypeResponse);
            }


            infoResponse.setTransactionMethod("VNPAY");
            infoResponse.setDonePayment(donePayment);
            infoResponse.setNotDonePayment(notDonePayment);
            infoResponse.setTotalPayment(totalPayment);
        } else {
            infoAppointmentResponse.setStatus(null);
        }

        infoResponse.setInfoServiceTypeResponse(infoServiceTypeResponses);

        // notes
        ServiceType serviceType = appointment.getServiceType();
        List<AppointmentStatus> statuses = appointmentStatusRepository.findByAppointment(appointment);
        for (AppointmentStatus status : statuses) {
            if (serviceType.getId() == 1) {
                if (status.getStatus().equals("Hoàn thành")) {
                    infoResponse.setNotes(status.getNotes());
                }
            } else if (serviceType.getId() == 2 || serviceType.getId() == 3 || serviceType.getId() == 4) {
                if (status.getStatus().equals("Thực hiện xong dịch vụ")) {
                    infoResponse.setNotes(status.getNotes());
                }
            }
        }


        // Set Info Feedback Response
        InfoFeedbackResponse infoFeedbackResponse = new InfoFeedbackResponse();
        FeedBack feedBack = feedbackRepository.findByAppointmentId(appointmentId);
        if (feedBack != null) {
            infoFeedbackResponse.setRate(feedBack.getRating());
            infoFeedbackResponse.setFeedback(feedBack.getComment());
        } else {
            infoFeedbackResponse.setFeedback(null);
        }
        infoResponse.setInfoFeedbackResponse(infoFeedbackResponse);

        return infoResponse;
    }

    public DashboardTotalRequest listDashboardTotalRequest() {
        DashboardTotalRequest dashboardTotalRequest = new DashboardTotalRequest();
        List<AppointmentDetail> appointmentDetails = new ArrayList<>();
        List<Appointment> appointment = appointmentRepository.findAll();
        for (Appointment app : appointment) {
            AppointmentDetail appointmentDetail = new AppointmentDetail();

            AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(app.getId());
            Payment payment = paymentRepository.findByAppointmentId(app.getId());
            Doctor doctor = app.getDoctor();
            ServiceType service = app.getServiceType();
            Zone zone = app.getZone();
            Customers customers = app.getCustomers();

            appointmentDetail.setAppointmentId(app.getId());
            appointmentDetail.setOrderTime(appointmentInfo.getCreatedDate());
            appointmentDetail.setCustomerId(customers.getId());

            if (payment != null) {
                List<PaymentDetail> paymentDetail = paymentDetailRepository.findByPaymentId(payment.getId());
                long total = 0;
                for (PaymentDetail detail : paymentDetail) {
                    if (detail.isStatus()) {
                        total += detail.getPrice();
                    }
                }
                appointmentDetail.setTotalAmount(total);
            } else {
                appointmentDetail.setTotalAmount(0);
            }
            appointmentDetail.setDoctorId(doctor.getId());
            appointmentDetail.setServiceId(service.getId());
            appointmentDetail.setZoneId(zone.getId());
            appointmentDetail.setCancel(app.isCancel());
            appointmentDetails.add(appointmentDetail);
        }
        long countCustomer = 0;
        List<Account> account = accountRepository.findAll();
        for (Account acc : account) {
            if (acc.getRole().equals("CUSTOMER")) {
                countCustomer++;
            }
        }

        long countAppointment = appointmentRepository.count();

        dashboardTotalRequest.setAppointments(appointmentDetails);
        dashboardTotalRequest.setTotalCustomers(countCustomer);
        dashboardTotalRequest.setTotalAppointments(countAppointment);
        return dashboardTotalRequest;
    }


    public List<DashboardDetailAppointmentResponse> dashboardDetailAppointmentResponses() {
        List<DashboardDetailAppointmentResponse> responses = new ArrayList<>();
        Pageable pageable = PageRequest.of(0, 9); // Bắt đầu từ trang 0 và giới hạn 7 bản ghi
        List<Appointment> upcomingAppointments = appointmentRepository.findTop9RecentAppointments(pageable);

        for (Appointment app : upcomingAppointments) {
            DashboardDetailAppointmentResponse response = new DashboardDetailAppointmentResponse(); // Tạo mới cho mỗi Appointment

            AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(app.getId());
            ServiceType serviceType = app.getServiceType();
            Doctor doctor = app.getDoctor();
            Customers customers = app.getCustomers();
            Zone zone = app.getZone();


            List<AppointmentStatus> statuses = appointmentStatusRepository.findByAppointment(app);

            // Tìm trạng thái có createDate lớn nhất (mới nhất)
            AppointmentStatus latestStatus = null;
            for (AppointmentStatus status : statuses) {
                if (latestStatus == null || status.getCreate_date().toLocalDateTime().isAfter(latestStatus.getCreate_date().toLocalDateTime())) {
                    latestStatus = status;
                }
            }

            response.setAppointmentId(app.getId());
            response.setAppointmentName(serviceType.getName());
            response.setBookingDate(appointmentInfo.getAppointmentBookingDate());
            response.setBookingTime(appointmentInfo.getAppointmentBookingTime());
            response.setAppointmentTime(appointmentInfo.getCreatedDate());
            response.setAppointmentStatus(latestStatus != null ? latestStatus.getStatus() : ""); // Kiểm tra nếu latestStatus không null
            response.setDoctorName(doctor.getFullName());
            response.setCustomerName(customers.getFullName());
            response.setAddress((appointmentInfo.getAddress() != null ? appointmentInfo.getAddress() : "null") + ", " + (zone != null ? zone.getName() : "null"));

            responses.add(response); // Thêm vào danh sách
        }
        return responses;
    }


    public DetailTopAppointment findTop3Variable() {
        DetailTopAppointment detail = new DetailTopAppointment();
        Pageable pageable = PageRequest.of(0, 3);
        Pageable pageableService = PageRequest.of(0, 1);

        // Lấy top khách hàng
        List<CustomerInfo> topCustomerInfos = new ArrayList<>();
        List<Object[]> topCustomers = appointmentRepository.findTopCustomersWithMostAppointments(pageable);
        for (Object[] customer : topCustomers) {
            long customerId = (Long) customer[0];
            long appointmentCount = (Long) customer[1];

            // Lấy tên khách hàng từ id
            Customers customerName = customerRepository.findById(customerId);
            if (customerName != null) {
                String name = customerName.getFullName();
                topCustomerInfos.add(new CustomerInfo(customerId, name, appointmentCount));
            } else {
                topCustomerInfos.add(new CustomerInfo(customerId, "Unknown", appointmentCount));
            }
        }

        // Lấy top bác sĩ
        List<DoctorInfoTop3> topDoctorInfos = new ArrayList<>();
        List<Object[]> topDoctors = appointmentRepository.findTopDoctorsWithMostAppointments(pageable);
        for (Object[] doctor : topDoctors) {
            long doctorId = (Long) doctor[0];
            long appointmentCount = (Long) doctor[1];

            // Lấy tên bác sĩ từ id
            Doctor doc = doctorRepository.findDoctorById(doctorId);
            if (doc != null) {
                String name = doc.getFullName();
                topDoctorInfos.add(new DoctorInfoTop3(doctorId, name, appointmentCount));
            } else {
                topDoctorInfos.add(new DoctorInfoTop3(doctorId, "Unknown", appointmentCount));
            }
        }

        // Lấy top dịch vụ
        List<ServiceInfo> topServiceInfos = new ArrayList<>();
        List<Object[]> topServiceTypes = appointmentRepository.findTopServiceTypesWithMostAppointments(pageableService);
        for (Object[] service : topServiceTypes) {
            long serviceTypeId = (Long) service[0];
            long appointmentCount = (Long) service[1];

            // Lấy tên dịch vụ từ id
            ServiceType ser = serviceTypeRepository.findById(serviceTypeId);
            if (ser != null) {
                String name = ser.getName();
                topServiceInfos.add(new ServiceInfo(serviceTypeId, name, appointmentCount));
            } else {
                topServiceInfos.add(new ServiceInfo(serviceTypeId, "Unknown", appointmentCount));
            }
        }

        detail.setTopCustomers(topCustomerInfos);
        detail.setTopDoctors(topDoctorInfos);
        detail.setTopServices(topServiceInfos);
        return detail;
    }

    public List<DoctorWorkAllResponse> getDoctorWorkAll() {
        List<DoctorWorkAllResponse> responses = new ArrayList<>();
        List<Appointment> appointments = appointmentRepository.findAll();

        for (Appointment appointment : appointments) {
            DoctorWorkAllResponse response = new DoctorWorkAllResponse();
            Doctor doctor = appointment.getDoctor();
            response.setDoctorWorkName(doctor.getFullName());

            AppointmentInfo appointmentInfo = appointmentInfoRepository.findByAppointmentId(appointment.getId());


            // Lấy thời gian và ngày đặt hẹn
            Time bookingTime = appointmentInfo.getAppointmentBookingTime();
            Date bookingDate = appointmentInfo.getAppointmentBookingDate();

            // Lấy loại dịch vụ
            ServiceType serviceType = serviceTypeRepository.findByAppointmentId(appointment.getId());
            response.setServiceType(serviceType.getName());

            // Xác định thời gian kết thúc dựa trên loại dịch vụ
            if (serviceType.getId() == 1 || serviceType.getId() == 3) {
                response.setAppointmentDate(bookingDate);
                response.setAppointmentTimeStart(bookingTime);

                // Thời gian kết thúc sau 1 tiếng
                Time endTime = new Time(bookingTime.getTime() + 3600000); // 1 giờ = 3600000 ms
                response.setAppointmentTimeEnd(endTime);

            } else if (serviceType.getId() == 2 || serviceType.getId() == 4) {
                response.setAppointmentDate(bookingDate);
                response.setAppointmentTimeStart(bookingTime);

                // Thời gian kết thúc sau 4 tiếng
                Time endTime = new Time(bookingTime.getTime() + 4 * 3600000); // 4 giờ = 4 * 3600000 ms
                response.setAppointmentTimeEnd(endTime);
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
            response.setAppointmentStatus(latestStatus.getStatus());
            responses.add(response);
        }
        return responses;

    }


}




