package com.example.org.repository;

import com.example.org.entity.Veterian;
import com.example.org.entity.VeterianSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

@Repository
public interface VeterianScheduleRepository extends JpaRepository<VeterianSchedule, Long> {

    List<VeterianSchedule> findByVeterianId(long veterianId);

    List<VeterianSchedule> findVeterianScheduleByVeterianIdAndWorkDay(long veterianId, String workDay);



}
