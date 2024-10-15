package com.example.org.repository;

import com.example.org.entity.AppointmentDetail;
import com.example.org.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentStatusRepository extends JpaRepository<AppointmentStatus, Long> {
    AppointmentStatus findByAppointmentId(Long appointmentId);

}
