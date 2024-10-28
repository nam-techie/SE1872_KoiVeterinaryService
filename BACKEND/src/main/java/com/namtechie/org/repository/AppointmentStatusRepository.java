package com.namtechie.org.repository;

import com.namtechie.org.entity.Appointment;
import com.namtechie.org.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AppointmentStatusRepository extends JpaRepository<AppointmentStatus, Long> {
    AppointmentStatus findByAppointmentId(Long appointmentId);

    List<AppointmentStatus> findByAppointment(Appointment appointment);


}
