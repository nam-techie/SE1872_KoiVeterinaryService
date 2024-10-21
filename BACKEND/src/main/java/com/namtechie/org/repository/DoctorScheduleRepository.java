package com.namtechie.org.repository;

import com.namtechie.org.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    List<DoctorSchedule> findByDoctorId(long doctorId);

    List<DoctorSchedule> findDoctorScheduleByDoctorIdAndWorkDay(long doctorId, String workDay);



}
