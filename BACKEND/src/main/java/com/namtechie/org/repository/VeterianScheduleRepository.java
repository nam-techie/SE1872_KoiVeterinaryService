package com.namtechie.org.repository;

import com.namtechie.org.entity.VeterianSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeterianScheduleRepository extends JpaRepository<VeterianSchedule, Long> {

    List<VeterianSchedule> findByVeterianId(long veterianId);

    List<VeterianSchedule> findVeterianScheduleByVeterianIdAndWorkDay(long veterianId, String workDay);



}
