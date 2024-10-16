package com.namtechie.org.repository;

import com.namtechie.org.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findAll();

    Doctor findByAccountId(Long accountId);

    boolean existsByAccountId(Long accountId);

    Doctor findDoctorById(Long id);


}