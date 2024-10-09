package com.example.org.repository;

import com.example.org.entity.VeterianSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeterianScheduleRepository extends JpaRepository<VeterianSchedule, Long> {

    List<VeterianSchedule> findByVeterianId(long veterianId);

    List<VeterianSchedule> findVeterianScheduleByVeterianIdAndWorkDay(long veterianId, String workDay);
}
