package com.example.org.repository;

import com.example.org.entity.AppointmentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentDetailRepository extends JpaRepository<AppointmentDetail, Long> {

    AppointmentDetail findByAppointmentId(Long appointmentId);

}
