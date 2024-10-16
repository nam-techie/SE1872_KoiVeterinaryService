package com.namtechie.org.repository;

import com.namtechie.org.entity.AppointmentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentDetailRepository extends JpaRepository<AppointmentDetail, Long> {

    AppointmentDetail findByAppointmentId(Long appointmentId);

}
