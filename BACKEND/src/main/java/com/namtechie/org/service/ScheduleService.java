package com.namtechie.org.service;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.Doctor;
import com.namtechie.org.model.Schedule;
import com.namtechie.org.entity.DoctorsSchedules;
import com.namtechie.org.repository.DoctorsSchedulesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.*;

@Service
public class ScheduleService {

    @Autowired
    private DoctorsSchedulesRepository doctorsSchedulesRepository;

    @Autowired
    DoctorService doctorService;

    @Autowired
    AppointmentService appointmentService;

    private static final Time NOON = Time.valueOf("12:00:00");

    public List<DoctorsSchedules> findDoctorsSchedulesByDoctorIdAndWorkDay(Long doctorId, String workDay) {
        return doctorsSchedulesRepository.findDoctorsSchedulesByDoctorIdAndWorkDay(doctorId, workDay);
    }

    //Lấy lịch làm việc theo buổi trống trong 7 ngày làm việc tiếp theo theo buổi và tại nhà
    public Map<String, List<Schedule>> findFreeScheduleOfSession() {
        Map<String, List<Schedule>> freeSchedules = new HashMap<>();
        List<Doctor> doctors = doctorService.getAllDoctors();
        LocalDate today = LocalDate.now();

        int workDaysCount = 0;
        while (workDaysCount < 7) {
            today = today.plusDays(1);
            DayOfWeek dayOfWeek = today.getDayOfWeek();

            if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
                List<Schedule> schedules = new ArrayList<>();
                boolean isFreeMorning = false;
                boolean isFreeAfternoon = false;

                for (Doctor doctor : doctors) {
                    // Nếu có ít nhất một bác sĩ trống lịch vào buổi sáng, đánh dấu buổi sáng là trống á
                    if (appointmentService.findAllAppointmentOfSession(doctor.getId(), Date.valueOf(today), true).isEmpty()) {
                        isFreeMorning = true;
                    }
                    // Cái này tương tự nhưng là buổi chiều
                    if (appointmentService.findAllAppointmentOfSession(doctor.getId(), Date.valueOf(today), false).isEmpty()) {
                        isFreeAfternoon = true;
                    }
                }

                schedules.add(new Schedule(Date.valueOf(today), Time.valueOf("7:00:00"), Time.valueOf("11:00:00"), isFreeMorning));
                schedules.add(new Schedule(Date.valueOf(today), Time.valueOf("13:00:00"), Time.valueOf("17:00:00"), isFreeAfternoon));

                freeSchedules.put(String.valueOf(today), schedules);
                workDaysCount++;
            }
        }

        return freeSchedules;
    }

    //Lấy lịch làm việc trống trong 7 ngày tiếp theo của bác sĩ theo giờ

    public Map<String, List<Schedule>> findFreeSchedule() {
        Map<String, List<Schedule>> freeSchedules = new HashMap<>();
        List<Doctor> doctors = doctorService.getAllDoctors();
        LocalDate today = LocalDate.now();
// Nooo
        int workDaysCount = 0;
        while (workDaysCount < 7) {
            today = today.plusDays(1);
            DayOfWeek dayOfWeek = today.getDayOfWeek();

            if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
                List<Schedule> schedules = new ArrayList<>();

                List<Integer> timeSlots = Arrays.asList(7, 8, 9, 10, 13, 14, 15, 16);

                for (Integer timeSlot : timeSlots) {
                    boolean isFreeThisTime = false;
                    for (Doctor doctor : doctors) {
                        // Nếu có ít nhất một bác sĩ trống lịch vào thời gian này, đánh dấu nó là trống á
                        if (appointmentService.findAppointmentWithBookingTime(doctor.getId(), Date.valueOf(today), Time.valueOf(timeSlot + ":00:00")) == null) {
                            schedules.add(new Schedule(Date.valueOf(today), Time.valueOf(timeSlot + ":00:00"), Time.valueOf((timeSlot + 1) + ":00:00"), true));
                            isFreeThisTime = true;
                            break;
                        }
                    }
                    if (!isFreeThisTime) { // Nếu đéo có lịch trống thì cho bận luôn
                        schedules.add(new Schedule(Date.valueOf(today), Time.valueOf(timeSlot + ":00:00"), Time.valueOf((timeSlot + 1) + ":00:00"), false));
                    }
                }

                freeSchedules.put(String.valueOf(today), schedules);
                workDaysCount++;
            }
        }

        return freeSchedules;
    }

    // Lấy lịch làm việc trống trong 7 ngày tiếp theo của bác sĩ theo giờ và id bác sĩ
    public Map<String, List<Schedule>> findFreeScheduleByDoctorId(Long doctorId) {
        Map<Date, List<DoctorsSchedules>> doctorSchedules = findNextSevenDayScheduleByVeterianId(doctorId);
        Map<String, List<Schedule>> freeSchedules = new HashMap<>();

        for (Map.Entry<Date, List<DoctorsSchedules>> entry : doctorSchedules.entrySet()) {
            Date date = entry.getKey();
            List<DoctorsSchedules> schedules = entry.getValue();
            List<Schedule> scheduleRequests = new ArrayList<>(); // Cái này là lịch theo ngày nà

            for (DoctorsSchedules schedule : schedules) {
                boolean isMorning = schedule.getStartTime().before(NOON);
                List<Integer> timeSlots = isMorning ? Arrays.asList(7, 8, 9, 10) : Arrays.asList(13, 14, 15, 16);
                List<Appointment> appointments = appointmentService.findAllAppointmentOfSession(doctorId, date, isMorning);

                if (appointments.size() == 1 && appointments.get(0).getServiceType().getId() != 3) {
                    for (int hour : timeSlots) {
                        Time currentStart = Time.valueOf(hour + ":00:00");
                        Time currentEnd = Time.valueOf((hour + 1) + ":00:00");
                        scheduleRequests.add(new Schedule(date, currentStart, currentEnd, false));
                    }
                    continue; // Nhảy qua vòng lặp tiếp tục cái khác.
                }

                for (int hour : timeSlots) {
                    Time currentStart = Time.valueOf(hour + ":00:00");
                    Time currentEnd = Time.valueOf((hour + 1) + ":00:00");
                    boolean isOccupied = appointments.stream().anyMatch(appointment -> {
                        Time start = appointment.getAppointmentInfo().getAppointmentBookingTime();
                        Time end = new Time(start.getTime() + 3600000); // Cộng 1 giờ
                        return (currentStart.equals(start) || currentStart.after(start)) && currentStart.before(end);
                    });

                    scheduleRequests.add(new Schedule(date, currentStart, currentEnd, !isOccupied));
                }
            }
            freeSchedules.put(String.valueOf(date), scheduleRequests);
        }

        return freeSchedules;
    }

    public Map<String, List<Schedule>> findFreeScheduleByDoctorIdAtHome(Long doctorId) {
        Map<Date, List<DoctorsSchedules>> doctorSchedules = findNextSevenDayScheduleByVeterianId(doctorId);
        Map<String, List<Schedule>> freeSchedules = new HashMap<>();

        for (Map.Entry<Date, List<DoctorsSchedules>> entry : doctorSchedules.entrySet()) {
            Date date = entry.getKey();
            List<DoctorsSchedules> schedules = entry.getValue();
            List<Schedule> scheduleRequests = new ArrayList<>(); // Cái này là lịch theo ngày nà

            for (DoctorsSchedules schedule : schedules) {
                boolean isMorning = schedule.getStartTime().before(NOON);
                List<Integer> timeSlots = isMorning ? Arrays.asList(7, 8, 9, 10) : Arrays.asList(13, 14, 15, 16);
                List<Appointment> appointments = appointmentService.findAllAppointmentOfSession(doctorId, date, isMorning);

                if (appointments.size() == 1 && appointments.get(0).getServiceType().getId() != 1) {
                    for (int hour : timeSlots) {
                        Time currentStart = Time.valueOf(hour + ":00:00");
                        Time currentEnd = Time.valueOf((hour + 1) + ":00:00");
                        scheduleRequests.add(new Schedule(date, currentStart, currentEnd, false));
                    }
                    continue; // Nhảy qua vòng lặp tiếp tục cái khác.
                }

                for (int hour : timeSlots) {
                    Time currentStart = Time.valueOf(hour + ":00:00");
                    Time currentEnd = Time.valueOf((hour + 1) + ":00:00");
                    boolean isOccupied = appointments.stream().anyMatch(appointment -> {
                        Time start = appointment.getAppointmentInfo().getAppointmentBookingTime();
                        Time end = new Time(start.getTime() + 3600000); // Cộng 1 giờ
                        return (currentStart.equals(start) || currentStart.after(start)) && currentStart.before(end);
                    });

                    scheduleRequests.add(new Schedule(date, currentStart, currentEnd, !isOccupied));
                }
            }
            freeSchedules.put(String.valueOf(date), scheduleRequests);
        }

        return freeSchedules;
    }

    // Lấy lịch bảy ngày tiếp theo của bác sĩ
//    public Map<Date, List<DoctorsSchedules>> findNextSevenDayScheduleByVeterianId(Long veterianId) {
//        Map<Date, List<DoctorsSchedules>> sevendayschedules = new HashMap<>();
//        LocalDate today = LocalDate.now();
//
//        int count = 0;
//
//        while (count < 7) {
//            today = today.plusDays(1);
//            System.out.print("Looc 1: " + String.valueOf(today) + " | ");
//            DayOfWeek dayOfWeek = today.getDayOfWeek();
//            System.out.print("Looc 2: " + String.valueOf(dayOfWeek) + " | ");
//
//            if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
//                List<DoctorsSchedules> schedules =  findDoctorsSchedulesByDoctorIdAndWorkDay(veterianId, String.valueOf(dayOfWeek));
//                sevendayschedules.put(Date.valueOf(today), schedules);
//                count++;
//            }
//        }
//        return sevendayschedules;
//    }


    public Map<Date, List<DoctorsSchedules>> findNextSevenDayScheduleByVeterianId(Long veterianId) {
        Map<Date, List<DoctorsSchedules>> sevendayschedules = new HashMap<>();
        LocalDate today = LocalDate.now();

        int count = 0;

        while (count < 7) {
            DayOfWeek dayOfWeek = today.getDayOfWeek();

            if (dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
                List<DoctorsSchedules> schedules = findDoctorsSchedulesByDoctorIdAndWorkDay(veterianId, String.valueOf(dayOfWeek));
                sevendayschedules.put(Date.valueOf(today), schedules);
                count++;
            }
            today = today.plusDays(1); // Cộng ngày sau khi đã xử lý
        }
        return sevendayschedules;
    }


}
