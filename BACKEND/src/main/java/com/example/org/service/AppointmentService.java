package com.example.org.service;

import com.example.org.entity.*;
import com.example.org.model.AppointmentResponse;
import com.example.org.model.ScheduleRequest;
import com.example.org.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AppointmentService {


    @Autowired
    private ServiceTypeRepository serviceTypeRepository;

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private VeterianScheduleRepository veterianScheduleRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private AppointmentDetailRepository appointmentDetailRepository;

    @Autowired
    private AppointmentStatusRepository appointmentStatusRepository;

    @Autowired
    private VeterianRepository veterianRepository;
    @Autowired
    private ModelMapper modelMapper;

    public List<Veterian> findAllVeterian() {
        return veterianRepository.findAll();
    }

    private static final Time NOON = Time.valueOf("12:00:00");

    public List<ServiceType> findAllServiceType() {
        return serviceTypeRepository.findAll();
    }

    public List<Zone> findAllZone() {
        return zoneRepository.findAll();
    }

    public List<VeterianSchedule> findAllVeterianScheduleByVeterianId(Long veterianId) {
        return veterianScheduleRepository.findByVeterianId(veterianId);
    }

    public List<VeterianSchedule> findVeterianScheduleByVeterianIdAndWorkDay(Long veterianId, DayOfWeek dayOfWeek) {
        return veterianScheduleRepository.findVeterianScheduleByVeterianIdAndWorkDay(veterianId, dayOfWeek.name());
    }

    public List<Appointment> findAppointmentsByVeterianIdAndBookingDate(long veterianId, Date appointmentBookingDate) {
        return appointmentRepository.findAppointmentsByVeterianIdAndBookingDate(veterianId, appointmentBookingDate);
    }

    // Lấy lịch sáng chiều của 1 ngày
    public List<Appointment> findAllAppointmentOfSession(Long veterianId, Date appointmentBookingDate, boolean isMorning) {
        List<Appointment> appointmentList = findAppointmentsByVeterianIdAndBookingDate(veterianId, appointmentBookingDate);
        List<Appointment> newAppointmentList = new ArrayList<>();

        for (Appointment appointment : appointmentList) {
            Time appointmentTime = appointment.getAppointmentDetail().getAppointmentBookingTime();
            boolean isBeforeNoon = appointmentTime.before(NOON);
            if (isMorning && isBeforeNoon) {
                newAppointmentList.add(appointment);
            } else if (!isMorning && !isBeforeNoon) {
                newAppointmentList.add(appointment);
            }
        }
        return newAppointmentList;
    }

    // Lấy lịch làm việc trống trong 7 ngày tiếp theo của bác sĩ
    public Map<Date, List<ScheduleRequest>> findFreeScheduleByVeterianId(Long veterianId) {
        Map<Date, List<VeterianSchedule>> veterianSchedules = findNextSevenDayScheduleByVeterianId(veterianId);
        Map<Date, List<ScheduleRequest>> freeSchedules = new HashMap<>();

        for (Map.Entry<Date, List<VeterianSchedule>> entry : veterianSchedules.entrySet()) {
            Date date = entry.getKey();
            List<VeterianSchedule> schedules = entry.getValue();
            List<ScheduleRequest> scheduleRequests = new ArrayList<>();

            for (VeterianSchedule schedule : schedules) {
                boolean isMorning = schedule.getStartTime().before(NOON);
                List<Integer> timeSlots = isMorning ? Arrays.asList(7, 8, 9, 10) : Arrays.asList(13, 14, 15, 16);
                List<Appointment> appointments = findAllAppointmentOfSession(veterianId, date, isMorning);

                for (int hour : timeSlots) {
                    Time currentStart = Time.valueOf(hour + ":00:00");
                    Time currentEnd = Time.valueOf((hour + 1) + ":00:00");
                    boolean isOccupied = appointments.stream().anyMatch(appointment -> {
                        Time start = appointment.getAppointmentDetail().getAppointmentBookingTime();
                        Time end = new Time(start.getTime() + 3600000); // Cộng 1 giờ
                        return (currentStart.equals(start) || currentStart.after(start)) && currentStart.before(end);
                    });

                    if (isOccupied) {
                        scheduleRequests.add(new ScheduleRequest(date, currentStart, currentEnd, false));
                    } else {
                        scheduleRequests.add(new ScheduleRequest(date, currentStart, currentEnd, true));
                    }
                }
            }
            freeSchedules.put(date, scheduleRequests);
        }

        return freeSchedules;
    }

    // Lấy lịch bảy ngày tiếp theo của bác sĩ
    public Map<Date, List<VeterianSchedule>> findNextSevenDayScheduleByVeterianId(Long veterianId) {
        Map<Date, List<VeterianSchedule>> sevendayschedules = new HashMap<>();
        LocalDate today = LocalDate.now();
        int count = 0;

        while (count < 7) {
            today = today.plusDays(1);
            DayOfWeek dayOfWeek = today.getDayOfWeek();

            if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
                List<VeterianSchedule> schedules = findVeterianScheduleByVeterianIdAndWorkDay(veterianId, dayOfWeek);
                sevendayschedules.put(Date.valueOf(today), schedules);
                count++;
            }
        }
        return sevendayschedules;
    }

//    public List<AppointmentResponse> getAllAppointments() {
//        List<Appointment> appointments = appointmentRepository.findAll();
//
//        // Map danh sách từ Appointment sang AppointmentResponse
//        List<AppointmentResponse> appointmentResponses = appointments.stream()
//                .map(appointment -> {
//                    AppointmentResponse response = modelMapper.map(appointment, AppointmentResponse.class);
//
//                    // Map các trường bổ sung nếu cần
//                    response.setId(appointment.getId());
//                    response.setCustomerName(appointment.getCustomer().getFullname());
//                    response.setVeterianName(appointment.getVeterian().getFullname());
//                    response.setServiceName(appointment.getServiceType().getName());
//                    AppointmentDetail detail = appointmentDetailRepository.findByAppointmentId(appointment.getId());
//                    AppointmentStatus status = appointmentStatusRepository.findByAppointmentId(appointment.getId());
//                    response.setAppointmentDate(detail.getAppointmentBookingDate());
//                    response.setAppointmentTime(detail.getAppointmentBookingTime());
//                    response.setCreateDate(status.getCreate_date());
//                    response.setStatus(status.getStatus());
//
//                    return response;
//                })
//                .collect(Collectors.toList());
//
//        return appointmentResponses;
//
//    }


    public AppointmentResponse convertEntityToDTO(Appointment appointment) {
        AppointmentResponse appointmentResponse = new AppointmentResponse();
        appointmentResponse.setId(appointment.getId());
        appointmentResponse.setCustomerID(appointment.getCustomer().getId());
        appointmentResponse.setVeterianID(appointment.getVeterian().getId());
        appointmentResponse.setServiceID(appointment.getServiceType().getId());
        appointmentResponse.setAppointmentDetailID(appointment.getAppointmentDetail().getId());
        AppointmentStatus status = appointmentStatusRepository.findByAppointmentId(appointment.getId());
        appointmentResponse.setAppointmentStatusID(status.getId());
        appointmentResponse.setZoneID(appointment.getZone().getId());
        appointmentResponse.setCancel(appointment.isCancel());
        appointmentResponse.setDoctorAssigned(appointment.isVeterianAssigned());
        return appointmentResponse;
    }

    public List<AppointmentResponse> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll(); // Lấy danh sách tất cả các Appointment
        List<AppointmentResponse> appointmentResponseList = appointments.stream()
                .map(this::convertEntityToDTO) // Chuyển đổi từng Appointment sang AppointmentResponse
                .collect(Collectors.toList()); // Thu thập tất cả các đối tượng vào danh sách

        return appointmentResponseList;
    }

}
