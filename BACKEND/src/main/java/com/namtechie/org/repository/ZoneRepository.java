package com.namtechie.org.repository;

import com.namtechie.org.entity.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {
    Zone findByName(String name);

    boolean existsByName(String name);

    List<Zone> findAll();
    Zone findById(long id);

    Zone findByAppointmentId(long id);
}
