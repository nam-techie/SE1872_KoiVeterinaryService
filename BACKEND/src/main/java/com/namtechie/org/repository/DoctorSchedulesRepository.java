package com.namtechie.org.repository;

import com.namtechie.org.entity.DoctorSchedules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorSchedulesRepository extends JpaRepository<DoctorSchedules, Long> {

    DoctorSchedulesRepository findDoctorsSchedulesByDoctorId(Long id);

    List<DoctorSchedules> findDoctorsSchedulesByDoctorIdAndWorkDay(Long doctorId, String workDay);
}
