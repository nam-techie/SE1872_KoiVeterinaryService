package com.namtechie.org.repository;

import com.namtechie.org.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findAll();

    Doctor findByAccountId(Long accountId);

    boolean existsByAccountId(Long accountId);

    Doctor findDoctorById(Long id);

    Doctor findDoctorByPhone(String phone);

    boolean existsByPhone(String phone);

    Doctor findByAppointmentId(Long appointmentId);


}