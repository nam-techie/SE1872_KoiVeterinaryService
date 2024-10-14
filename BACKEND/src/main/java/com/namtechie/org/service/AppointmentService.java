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

    // Lấy lịch sáng chiều của 1 ngày
    public List<Appointment> findAllAppointmentOfSession(Long veterianId, Date appointmentBookingDate, boolean isMorning) {
        List<Appointment> appointmentList = findAppointmentsByDoctorIdAndBookingDate(veterianId, appointmentBookingDate);
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



}
