package com.namtechie.org.repository;

import com.namtechie.org.entity.AppointmentInfo;
import com.namtechie.org.entity.AppointmentInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppointmentInfoRepository extends JpaRepository<AppointmentInfo, Long> {

    AppointmentInfo findByAppointmentId(Long appointmentId);


}
