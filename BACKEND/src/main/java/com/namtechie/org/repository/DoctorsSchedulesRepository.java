package com.namtechie.org.repository;

import com.namtechie.org.entity.Doctor;
import com.namtechie.org.entity.DoctorsSchedules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorsSchedulesRepository extends JpaRepository<DoctorsSchedules, Long> {

    DoctorsSchedulesRepository findDoctorsSchedulesByDoctorId(Long id);

    List<DoctorsSchedules> findDoctorsSchedulesByDoctorIdAndWorkDay(Long doctorId, String workDay);
}
