package com.namtechie.org.repository;

import com.namtechie.org.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentStatusRepository extends JpaRepository<AppointmentStatus, Long> {
    AppointmentStatus findByAppointmentId(Long appointmentId);

}
