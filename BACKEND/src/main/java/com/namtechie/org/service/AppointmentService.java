package com.namtechie.org.service;

import com.namtechie.org.entity.Appointment;
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

import java.sql.Date;
import java.sql.Time;
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
    private CustomersRepository customersRepository;
    @Autowired
    ScheduleService scheduleService;


    public List<Doctor> findAllDoctor() {
        return doctorRepository.findAll();
    }

    private static final Time NOON = Time.valueOf("12:00:00");

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> findAppointmentsByDoctorIdAndBookingDate(Long doctorId, Date bookingDate) {
        return appointmentRepository.findAppointmentsByDoctorIdAndBookingDate(doctorId, bookingDate);
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
        Appointment appointment = findAppointmentByDoctorIdAndBookingDateAndBookingTime(doctorId, appointmentBookingDate, appointmentBookingTime);
        String time = "13:00:00";
        if (appointmentBookingTime.before(NOON)) {
            time = "7:00:00";
        }
        Appointment appointmentsOfSession = findAppointmentByDoctorIdAndBookingDateAndBookingTime(doctorId, appointmentBookingDate, Time.valueOf(time));
        if (appointment != null) {
            return appointment;
        } else return appointmentsOfSession;
    }



    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
        Appointment appointment = new Appointment();
        try {
            Account account = (Account) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            appointment.setCustomers(account.getCustomer());

            Customers customer = account.getCustomer();
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
            if(appointmentRequest.getZoneId() != 0){
                zone = zoneRepository.findById(appointmentRequest.getZoneId());
            }


            Doctor doctor = null;
            if(appointmentRequest.getDoctorId() != 0) {
                doctor = doctorRepository.findDoctorById(appointmentRequest.getDoctorId());
            }

            //khám tại trung tam
            if(appointmentRequest.getServiceTypeId() == 3) {
                Zone centerZone = zoneRepository.findById(1);
                //khách hàng chọn bác sĩ
                if(doctor != null) {
                    appointment.setDoctorAssigned(true); // đánh dấu khách hàng có chọn bác sĩ
                    appointment.setDoctor(doctor);
                    appointmentInfo.setAppointmentBookingDate(appointmentRequest.getBookingDate());
                    appointmentInfo.setAppointmentBookingTime(appointmentRequest.getBookingTime());
                    appointment.setZone(centerZone);


                }else { //khách hàng ko chọn bác sĩ
                    appointmentInfo.setAppointmentBookingDate(appointmentRequest.getBookingDate());
                    appointmentInfo.setAppointmentBookingTime(appointmentRequest.getBookingTime());
                    doctor = findAvailableDoctor(String.valueOf(appointmentRequest.getBookingDate()), String.valueOf(appointmentRequest.getBookingTime()));
                    appointment.setDoctorAssigned(false);
                    appointment.setDoctor(doctor);
                    appointment.setZone(centerZone);


                }

            }else if(appointmentRequest.getServiceTypeId() == 2 || appointmentRequest.getServiceTypeId() == 4) { // khám tại nhà
                if(doctor == null) {
                    doctor = findAvailableDoctor(String.valueOf(appointmentRequest.getBookingDate()), String.valueOf(appointmentRequest.getBookingTime()));
                    appointment.setDoctorAssigned(false);
                    appointment.setDoctor(doctor);
                    appointmentInfo.setAppointmentBookingDate(appointmentRequest.getBookingDate());
                    appointmentInfo.setAppointmentBookingTime(appointmentRequest.getBookingTime());
                    appointment.setZone(zone);
                }
            }else if(appointmentRequest.getServiceTypeId() == 1) { // dịch vụ tư vấn
                if(doctor == null) {
                    Time appointmentTime = appointmentRequest.getBookingTime();
                    Time updateAppointmentTime = new Time(appointmentTime.getTime() + 15 * 60 * 1000); // 15 phút sau
                    System.out.println("15Minutes: " + updateAppointmentTime);
                    doctor = findAvailableDoctor(String.valueOf(appointmentRequest.getBookingDate()), String.valueOf(updateAppointmentTime));
                    appointment.setDoctorAssigned(false);
                    appointment.setDoctor(doctor);
                    Zone onlineZone = zoneRepository.findById(15);
                    appointment.setZone(onlineZone);
                    appointmentInfo.setAppointmentBookingDate(appointmentRequest.getBookingDate());
                    appointmentInfo.setAppointmentBookingTime(updateAppointmentTime);
                }
            }

            appointmentInfo.setDescriptions(appointmentRequest.getDescription());
            appointment.setAppointmentInfo(appointmentInfo);


            List<AppointmentStatus> list = new ArrayList<>();
            AppointmentStatus appointmentStatus = new AppointmentStatus();
            appointmentStatus.setAppointment(appointment);
            appointmentStatus.setStatus("Waiting veterian confirm");
            appointmentStatus.setNotes("");
            list.add(appointmentStatus);


            appointment.setAppointmentStatus(list);

            // Step 6: Lưu Appointment vào cơ sở dữ liệu
            return appointmentRepository.save(appointment);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    public Doctor findAvailableDoctor(String bookingDate, String bookingTime) {

        // Lấy danh sách tất cả các bác sĩ
        List<Doctor> allDoctors = doctorRepository.findAll();

        for (Doctor doctor : allDoctors) {
            Map<String, List<Schedule>> freeSchedules = scheduleService.findFreeScheduleByDoctorId(doctor.getId());

            Date bookingDateSQL = Date.valueOf(bookingDate);
            System.out.println("freeSchedules: " + freeSchedules);
            System.out.println("bookingDate: " + bookingDateSQL);

            List<Schedule> schedulesForDay = freeSchedules.get(bookingDate);
            System.out.println("12345" + schedulesForDay);
            for(Schedule schedule : schedulesForDay) {
                if((schedule.getDate().equals(bookingDateSQL) && schedule.getStartTime().equals(Time.valueOf(bookingTime)) && schedule.isAvailable()) ||
                        (schedule.getDate().equals(bookingDateSQL) && Time.valueOf(bookingTime).after(schedule.getStartTime()) && Time.valueOf(bookingTime).before(schedule.getEndTime()) && schedule.isAvailable())) {
                    return doctor;
                }
            }
        }
        return null;
    }


    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public AppointmentStatus confirmDoctorAppointment(long appointmentId, DoctorConfirmRequest doctorConfirmRequest) {
        try {
            AppointmentStatus updateAppointmentStatus = appointmentStatusRepository.findByAppointmentId(appointmentId);

            AppointmentStatus status = new AppointmentStatus();
            status.setAppointment(updateAppointmentStatus.getAppointment());
            if (doctorConfirmRequest.isConfirmed() == true) {
                status.setNotes(doctorConfirmRequest.getNote());
                status.setStatus("Confirmed");
            } else {
                status.setNotes(doctorConfirmRequest.getNote());
                status.setStatus("Canceled");
            }
            return appointmentStatusRepository.save(status);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }

    }
}
