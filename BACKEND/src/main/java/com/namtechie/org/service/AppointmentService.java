package com.namtechie.org.service;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.exception.DoctorNotAvailableException;
import com.namtechie.org.exception.NotFoundException;
import com.namtechie.org.model.request.ServiceTypeRequestAll;
import com.namtechie.org.model.response.AppointmentResponse;
import com.namtechie.org.model.response.AppointmentStatusResponse;
import com.namtechie.org.model.response.ServiceDetailResponse;
import com.namtechie.org.repository.AppointmentRepository;

import com.namtechie.org.entity.*;
import com.namtechie.org.model.request.AppointmentRequest;
import com.namtechie.org.model.Schedule;
import com.namtechie.org.model.request.DoctorConfirmRequest;
import com.namtechie.org.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.*;

@Service
public class AppointmentService {


    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private DoctorsSchedulesRepository doctorSchedulesRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentInfoRepository appointmentDetailRepository;

    @Autowired
    private AppointmentStatusRepository appointmentStatusRepository;

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CustomerRepository customersRepository;
    @Autowired
    ScheduleService scheduleService;
    @Autowired
    private ServiceTypesService serviceTypesService;
    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentDetailRepository paymentDetailRepository;


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
            if(appointmentRequest.getPhone() == null){
                throw new NotFoundException("Loi he thong");
            }
            customer.setPhone(appointmentRequest.getPhone()); // lưu số đth khách hàng


            // Step 3: Tìm ServiceType từ serviceID trong AppointmentRequest
            ServiceType serviceType = serviceTypeRepository.findById(appointmentRequest.getServiceTypeId());
            appointment.setServiceType(serviceType);


            // Step 5: Tạo mới AppointmentDetail từ dữ liệu chi tiết
            AppointmentInfo appointmentInfo = new AppointmentInfo();
            appointmentInfo.setAppointment(appointment);
            appointmentInfo.setAddress(appointmentRequest.getAddress());
            customer.setAddress(appointmentRequest.getAddress());
            customersRepository.save(customer);

            Zone zone = null;
            if (appointmentRequest.getZoneId() != 0) {
                zone = zoneRepository.findById(appointmentRequest.getZoneId());
            }

            Date date = Date.valueOf(appointmentRequest.getBookingDate());
            Time time = Time.valueOf(appointmentRequest.getBookingTime());


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
                    appointmentInfo.setAppointmentBookingTime(time);
                    doctor = findAvailableDoctor(appointmentRequest.getBookingDate(), appointmentRequest.getBookingTime());
                    appointment.setDoctorAssigned(false);
                    appointment.setDoctor(doctor);
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
                    int hour = time.toLocalTime().getHour();

                    Time roundedTime = Time.valueOf(hour + ":00:00");

                    System.out.println("Giờ làm tròn: " + roundedTime);
                    //doctor = findAvailableDoctor1(String.valueOf(appointmentRequest.getBookingDate()), String.valueOf(roundedTime));
                    appointmentInfo.setAppointmentBookingTime(roundedTime);
                    appointmentInfo.setAppointmentBookingDate(date);
                    doctor = findAvailableDoctor1(appointmentRequest.getBookingDate(), String.valueOf(roundedTime));
                    appointment.setDoctorAssigned(false);
                    appointment.setDoctor(doctor);
                    appointment.setZone(zoneRepository.findById(15));

//                    appointmentInfo.setAppointmentBookingDate(date);
//                    appointmentInfo.setAppointmentBookingTime(time);
//                    doctor = findAvailableDoctor(appointmentRequest.getBookingDate(), appointmentRequest.getBookingTime());
//                    appointment.setDoctorAssigned(false);
//                    appointment.setDoctor(doctor);
//                    appointment.setZone(centerZone);
                }
            }

            if (doctor == null) {
                throw new DoctorNotAvailableException("Không có bác sĩ nào rảnh trong khung giờ bạn chọn");
            }

            appointmentInfo.setDescriptions(appointmentRequest.getDescription());
            appointment.setAppointmentInfo(appointmentInfo);


            List<AppointmentStatus> list = new ArrayList<>();
            AppointmentStatus appointmentStatus = new AppointmentStatus();
            appointmentStatus.setAppointment(appointment);
            appointmentStatus.setStatus("Chờ bác sĩ xác nhận");
            appointmentStatus.setNotes("");
            list.add(appointmentStatus);


            appointment.setAppointmentStatus(list);

            // Step 6: Lưu Appointment vào cơ sở dữ liệu
            return appointmentRepository.save(appointment);
        } catch (DoctorNotAvailableException e) {
            throw new DoctorNotAvailableException(e.getMessage());
        } catch(NullPointerException e){
            e.printStackTrace();
            throw new NullPointerException("Lỗi hệ thống");
        }catch (Exception e) {
            throw new RuntimeException("Không thể đặt dịch vụ");
        }
    }


    public Doctor findAvailableDoctor(String bookingDate, String bookingTime) {

        // Chuyển đổi bookingDate từ chuỗi sang kiểu Date
        Date bookingDateSQL = Date.valueOf(bookingDate);

        // Tạo danh sách lưu các bác sĩ có lịch rảnh trùng với thời gian đặt
        List<Long> availableDoctorIds = new ArrayList<>();

        // Bước 1: Tìm tất cả các bác sĩ có lịch trống trùng với thời gian đặt
        List<Doctor> doctors = doctorRepository.findAll(); // Lấy tất cả bác sĩ
        for (Doctor doctor : doctors) {
            // Lấy danh sách lịch trống của bác sĩ
            Map<String, List<Schedule>> freeSchedules = scheduleService.findFreeScheduleByDoctorId(doctor.getId());

            // Kiểm tra xem lịch trống cho ngày đó có tồn tại không
            if (freeSchedules == null || freeSchedules.get(bookingDate) == null) {
                continue; // Nếu không có lịch trống, tiếp tục với bác sĩ tiếp theo
            }

            List<Schedule> schedulesForDay = freeSchedules.get(bookingDate);
            System.out.println("123" + schedulesForDay);
            // Kiểm tra lịch trống trong ngày xem có trùng với thời gian đặt không
            for (Schedule schedule : schedulesForDay) {
                if ((schedule.getDate().equals(bookingDateSQL) && schedule.getStartTime().equals(Time.valueOf(bookingTime)) && schedule.isAvailable()) ||
                        (schedule.getDate().equals(bookingDateSQL) && Time.valueOf(bookingTime).after(schedule.getStartTime()) && Time.valueOf(bookingTime).before(schedule.getEndTime()) && schedule.isAvailable())) {

                    // Nếu tìm thấy lịch trống cho bác sĩ đó, thêm doctorId vào danh sách
                    availableDoctorIds.add(doctor.getId());
                    break; // Bác sĩ này có lịch trống, không cần kiểm tra thêm trong ngày đó
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
            return doctorRepository.findDoctorById(selectedDoctorId);
        }

        // Nếu không tìm thấy bác sĩ nào rảnh cho buổi này
        System.out.println("Không tìm thấy bác sĩ rảnh cho khung giờ này.");
        return null;
    }

    public Doctor findAvailableDoctor1(String bookingDate, String bookingTime) {

        // Chuyển đổi bookingDate từ chuỗi sang kiểu Date
        Date bookingDateSQL = Date.valueOf(bookingDate);

        // Tạo danh sách lưu các bác sĩ có lịch rảnh trùng với thời gian đặt
        List<Long> availableDoctorIds = new ArrayList<>();

        // Bước 1: Tìm tất cả các bác sĩ có lịch trống trùng với thời gian đặt
        List<Doctor> doctors = doctorRepository.findAll(); // Lấy tất cả bác sĩ
        for (Doctor doctor : doctors) {
            // Lấy danh sách lịch trống của bác sĩ
            Map<String, List<Schedule>> freeSchedules = scheduleService.findFreeScheduleByDoctorId1(doctor.getId());

            // Kiểm tra xem lịch trống cho ngày đó có tồn tại không
            if (freeSchedules == null || freeSchedules.get(bookingDate) == null) {
                continue; // Nếu không có lịch trống, tiếp tục với bác sĩ tiếp theo
            }

            List<Schedule> schedulesForDay = freeSchedules.get(bookingDate);
            System.out.println("123" + schedulesForDay);
            // Kiểm tra lịch trống trong ngày xem có trùng với thời gian đặt không
            for (Schedule schedule : schedulesForDay) {
                if ((schedule.getDate().equals(bookingDateSQL) && schedule.getStartTime().equals(Time.valueOf(bookingTime)) && schedule.isAvailable()) ||
                        (schedule.getDate().equals(bookingDateSQL) && Time.valueOf(bookingTime).after(schedule.getStartTime()) && Time.valueOf(bookingTime).before(schedule.getEndTime()) && schedule.isAvailable())) {

                    // Nếu tìm thấy lịch trống cho bác sĩ đó, thêm doctorId vào danh sách
                    availableDoctorIds.add(doctor.getId());
                    break; // Bác sĩ này có lịch trống, không cần kiểm tra thêm trong ngày đó
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
            return doctorRepository.findDoctorById(selectedDoctorId);
        }

        // Nếu không tìm thấy bác sĩ nào rảnh cho buổi này
        System.out.println("Không tìm thấy bác sĩ rảnh cho khung giờ này.");
        return null;
    }

    /**
     * Hàm bổ trợ để chọn bác sĩ có ít lịch hẹn nhất từ danh sách bác sĩ rảnh.
     */
    private Long findDoctorWithFewestAppointments(List<Long> availableDoctorIds, List<Object[]> doctorAppointmentCounts) {
        Long selectedDoctorId = null;
        Long fewestAppointments = Long.MAX_VALUE;  // Đặt một giá trị lớn để so sánh

        for (Object[] doctorCount : doctorAppointmentCounts) {
            Long doctorId = (Long) doctorCount[0];
            Long appointmentCount = (Long) doctorCount[1];

            if (availableDoctorIds.contains(doctorId) && appointmentCount < fewestAppointments) {
                selectedDoctorId = doctorId;
                fewestAppointments = appointmentCount;
            }
        }

        // Nếu có nhiều bác sĩ có số lượng lịch hẹn bằng nhau, chọn ngẫu nhiên một bác sĩ
        List<Long> doctorsWithFewestAppointments = new ArrayList<>();
        for (Object[] doctorCount : doctorAppointmentCounts) {
            Long doctorId = (Long) doctorCount[0];
            Long appointmentCount = (Long) doctorCount[1];

            if (availableDoctorIds.contains(doctorId) && appointmentCount.equals(fewestAppointments)) {
                doctorsWithFewestAppointments.add(doctorId);
            }
        }

        if (!doctorsWithFewestAppointments.isEmpty()) {
            Collections.shuffle(doctorsWithFewestAppointments); // Xáo trộn danh sách
            selectedDoctorId = doctorsWithFewestAppointments.get(0); // Lấy ngẫu nhiên 1 bác sĩ
        }

        return selectedDoctorId;  // Trả về bác sĩ có ít lịch đặt nhất
    }


    private Long getRandomDoctorId(List<Long> doctorIds) {
        if (doctorIds == null || doctorIds.isEmpty()) {
            return null; // Trả về null nếu danh sách rỗng
        }
        Collections.shuffle(doctorIds); // Xáo trộn danh sách
        return doctorIds.get(0); // Lấy doctorId ngẫu nhiên từ danh sách đã xáo trộn
    }


    public Doctor findAvailableDoctorForSession(String bookingDate, String bookingTime) {
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
            Map<String, List<Schedule>> freeSchedules = scheduleService.findFreeScheduleByDoctorId(doctor.getId());

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

        // Nếu không tìm thấy bác sĩ nào phù hợp
        System.out.println("Không tìm thấy bác sĩ rảnh cho buổi này.");
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

        for(Appointment appointment : list) {
            List<AppointmentStatus> appointmentStatus = appointment.getAppointmentStatus();
            for(AppointmentStatus status : appointmentStatus) {
                if(status.getStatus().equals("Chờ bác sĩ xác nhận")){
                    return appointment.getId();
                }
            }
        }
        return 0;
    }


    public AppointmentStatus confirmDoctorAppointment(long appointmentId, DoctorConfirmRequest doctorConfirmRequest) {
        try {
            AppointmentStatus updateAppointmentStatus = appointmentStatusRepository.findByAppointmentId(appointmentId);
            Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);


            AppointmentStatus status = new AppointmentStatus();
            status.setAppointment(updateAppointmentStatus.getAppointment());
            if (doctorConfirmRequest.isConfirmed() == true) {
                status.setNotes(doctorConfirmRequest.getNote());
                status.setStatus("Đã xác nhận");
            } else {
                appointment.setCancel(true);
                appointmentRepository.save(appointment);
                status.setNotes(doctorConfirmRequest.getNote());
                status.setStatus("Từ chối");
            }
            return appointmentStatusRepository.save(status);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    public void cancelAppointmentByCustomer(long appointmentId, String role) {
        Appointment appointment = appointmentRepository.findAppointmentById(appointmentId);
        appointment.setCancel(true);
        appointmentRepository.save(appointment);

        AppointmentStatus status = new AppointmentStatus();
         status.setAppointment(appointment);
         status.setStatus("Đã hủy lịch");
         status.setNotes(role + " hủy");
         appointmentStatusRepository.save(status);
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

        return appointmentResponses;
    }

    public List<AppointmentStatusResponse> getListAppointmentCustomer(){
        List<AppointmentStatusResponse> appointmentResponses = new ArrayList<>();
        Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Customers customerId = customersRepository.findByAccountId(account.getId());

        List<Appointment> appointments = appointmentRepository.findByCustomersId(customerId.getId());

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
                appointmentStatusResponse.setAppointmentStatus(latestStatus.getStatus());
            }
            appointmentResponses.add(appointmentStatusResponse);
        }
        return appointmentResponses;
    }



    public AppointmentResponse getListAppoint(long appointmentId) {
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


}
