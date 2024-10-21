package com.namtechie.org.repository;

import com.namtechie.org.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // Chưa hoàn thiện
    public List<Doctor> findAll();
    Doctor findById(long id);
}
