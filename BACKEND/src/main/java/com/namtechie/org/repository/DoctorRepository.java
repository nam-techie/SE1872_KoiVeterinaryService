package com.namtechie.org.repository;

import com.namtechie.org.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    Doctor findByAccountId(Long accountId);

    boolean existsByAccountId(Long accountId);

}