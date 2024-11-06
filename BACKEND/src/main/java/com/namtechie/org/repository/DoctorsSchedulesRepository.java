package com.namtechie.org.repository;

import com.namtechie.org.entity.Doctor;
import com.namtechie.org.entity.DoctorsSchedules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;

@Repository
public interface DoctorsSchedulesRepository extends JpaRepository<DoctorsSchedules, Long> {

    DoctorsSchedulesRepository findDoctorsSchedulesByDoctorId(Long id);

    List<DoctorsSchedules> findDoctorsSchedulesByDoctorIdAndWorkDay(Long doctorId, String workDay);

    @Query(value = "SELECT CASE WHEN COUNT(ds) > 0 THEN TRUE ELSE FALSE END " +
            "FROM doctors_schedules ds " +
            "WHERE ds.doctor_id = :doctorId " +
            "AND ds.work_day = :workDay " +
            "AND CAST(ds.start_time AS time) = CAST(:startTime AS time) " +
            "AND CAST(ds.end_time AS time) = CAST(:endTime AS time)", nativeQuery = true)
    boolean existsSchedule(@Param("doctorId") long doctorId,
                           @Param("workDay") String workDay,
                           @Param("startTime") Time startTime,
                           @Param("endTime") Time endTime);

}

