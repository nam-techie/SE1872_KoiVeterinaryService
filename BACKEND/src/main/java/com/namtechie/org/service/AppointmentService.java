package com.namtechie.org.service;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    private static final Time NOON = Time.valueOf("12:00:00");

    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> findAppointmentsByDoctorIdAndBookingDate(Long doctorId, Date bookingDate) {
        return appointmentRepository.findAppointmentsByDoctorIdAndBookingDate(doctorId, bookingDate);
    }

    public Appointment findAppointmentByDoctorIdAndBookingDateAndBookingTime(Long doctorId, Date bookingDate, Time bookingTime) {

        System.out.println("Dit Con Me: " + bookingTime.getClass());
//        return null;
        return appointmentRepository.findAppointmentByDoctorIdAndBookingDateAndBookingTime(doctorId, bookingDate, bookingTime);
    }

    // Lấy lịch sáng chiều của 1 ngày
    public List<Appointment> findAllAppointmentOfSession(Long doctorId, Date appointmentBookingDate, boolean isMorning) {
        List<Appointment> appointmentList = findAppointmentsByDoctorIdAndBookingDate(doctorId, appointmentBookingDate);
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
        }else return appointmentsOfSession;
    }

}
