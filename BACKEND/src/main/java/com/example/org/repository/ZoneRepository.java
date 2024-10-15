package com.example.org.repository;

import com.example.org.entity.Zone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {

    List<Zone> findAll();
    Zone findById(long id);
}
